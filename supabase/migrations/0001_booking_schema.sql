-- Booking system schema for Kerem Kirali — Hairstylist & Barber.
-- Run via the Supabase SQL editor or `supabase db push`. See
-- supabase/README.md for the one-time project setup steps.

create extension if not exists pgcrypto;   -- gen_random_uuid()
create extension if not exists btree_gist; -- exclusion constraint below

-- ── staff ────────────────────────────────────────────────────────────────
create table staff (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  role text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── availability_rules ──────────────────────────────────────────────────
-- Recurring weekly working hours per staff member. weekday follows
-- JavaScript's Date.getDay() (0 = Sunday … 6 = Saturday) so the app layer
-- never has to translate day numbering.
create table availability_rules (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references staff (id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  constraint availability_rules_valid_range check (start_time < end_time)
);
create index availability_rules_staff_idx on availability_rules (staff_id, weekday);

-- ── time_off ─────────────────────────────────────────────────────────────
-- One-off blocked periods (Urlaub, Krankheit) per staff member.
create table time_off (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references staff (id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  created_at timestamptz not null default now(),
  constraint time_off_valid_range check (starts_at < ends_at)
);
create index time_off_staff_idx on time_off (staff_id, starts_at, ends_at);

-- ── appointments ─────────────────────────────────────────────────────────
-- service_slug/name/duration are copied from content/services.ts at
-- booking time (not foreign-keyed to a services table) — the bookable
-- service list lives in code, per PLAN.md's "config over hardcoding" rule;
-- this table only needs to remember what was actually booked.
create table appointments (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references staff (id),
  service_slug text not null,
  service_name text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  constraint appointments_valid_range check (starts_at < ends_at)
);
create index appointments_staff_time_idx on appointments (staff_id, starts_at, ends_at);

-- The actual double-booking guard: two CONFIRMED appointments for the same
-- staff member can never have overlapping time ranges, enforced by Postgres
-- itself — not just checked in application code, so it also holds under
-- concurrent booking attempts for the same slot.
alter table appointments
  add constraint appointments_no_overlap
  exclude using gist (
    staff_id with =,
    tstzrange(starts_at, ends_at) with &&
  )
  where (status = 'confirmed');

-- ── Row Level Security ──────────────────────────────────────────────────
-- No table grants direct public access. The public booking flow only ever
-- calls the two SECURITY DEFINER functions below, which never expose other
-- customers' names/emails. The admin dashboard (Kerem's single account)
-- reads/writes the tables directly as an authenticated Supabase user.
alter table staff enable row level security;
alter table availability_rules enable row level security;
alter table time_off enable row level security;
alter table appointments enable row level security;

-- Staff names/roles are already public on the /ueber-uns team page, so a
-- public SELECT here (needed for the stylist picker in the booking flow)
-- exposes nothing new.
create policy "Public can view active staff" on staff
  for select to anon, authenticated using (active = true);
create policy "Admin full access to staff" on staff
  for all to authenticated using (true) with check (true);
create policy "Admin full access to availability_rules" on availability_rules
  for all to authenticated using (true) with check (true);
create policy "Admin full access to time_off" on time_off
  for all to authenticated using (true) with check (true);
create policy "Admin full access to appointments" on appointments
  for all to authenticated using (true) with check (true);

-- ── get_available_slots ─────────────────────────────────────────────────
-- Returns free slot start times for one staff member/date/service duration,
-- in 15-minute increments, excluding time already covered by time_off or a
-- confirmed appointment. SECURITY DEFINER so anonymous visitors can call it
-- without any table-level SELECT grant (it never returns customer data).
create or replace function get_available_slots(
  p_staff_id uuid,
  p_date date,
  p_duration_minutes integer
)
returns table (slot_start timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_weekday smallint := extract(dow from p_date);
  v_rule record;
  v_slot timestamptz;
  v_slot_end timestamptz;
begin
  for v_rule in
    select start_time, end_time
    from availability_rules
    where staff_id = p_staff_id and weekday = v_weekday
  loop
    v_slot := (p_date + v_rule.start_time);
    while v_slot + make_interval(mins => p_duration_minutes) <= (p_date + v_rule.end_time) loop
      v_slot_end := v_slot + make_interval(mins => p_duration_minutes);

      if v_slot > now()
        and not exists (
          select 1 from time_off t
          where t.staff_id = p_staff_id
            and tstzrange(t.starts_at, t.ends_at) && tstzrange(v_slot, v_slot_end)
        )
        and not exists (
          select 1 from appointments a
          where a.staff_id = p_staff_id
            and a.status = 'confirmed'
            and tstzrange(a.starts_at, a.ends_at) && tstzrange(v_slot, v_slot_end)
        )
      then
        slot_start := v_slot;
        return next;
      end if;

      v_slot := v_slot + interval '15 minutes';
    end loop;
  end loop;
end;
$$;

grant execute on function get_available_slots(uuid, date, integer) to anon, authenticated;

-- ── book_appointment ─────────────────────────────────────────────────────
-- Re-validates the slot is still free and inserts the appointment in one
-- transaction. The exclusion constraint above is the final safety net for
-- a race between two simultaneous bookings; this explicit check gives a
-- clean, human-readable error instead of a raw constraint-violation.
create or replace function book_appointment(
  p_staff_id uuid,
  p_service_slug text,
  p_service_name text,
  p_duration_minutes integer,
  p_starts_at timestamptz,
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text
)
returns appointments
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ends_at timestamptz := p_starts_at + make_interval(mins => p_duration_minutes);
  v_appointment appointments;
begin
  if p_starts_at <= now() then
    raise exception 'SLOT_IN_PAST';
  end if;

  if exists (
    select 1 from time_off t
    where t.staff_id = p_staff_id
      and tstzrange(t.starts_at, t.ends_at) && tstzrange(p_starts_at, v_ends_at)
  ) then
    raise exception 'SLOT_UNAVAILABLE';
  end if;

  if exists (
    select 1 from appointments a
    where a.staff_id = p_staff_id
      and a.status = 'confirmed'
      and tstzrange(a.starts_at, a.ends_at) && tstzrange(p_starts_at, v_ends_at)
  ) then
    raise exception 'SLOT_UNAVAILABLE';
  end if;

  insert into appointments (
    staff_id, service_slug, service_name, duration_minutes,
    starts_at, ends_at, customer_name, customer_email, customer_phone
  ) values (
    p_staff_id, p_service_slug, p_service_name, p_duration_minutes,
    p_starts_at, v_ends_at, p_customer_name, p_customer_email, p_customer_phone
  )
  returning * into v_appointment;

  return v_appointment;
end;
$$;

grant execute on function book_appointment(uuid, text, text, integer, timestamptz, text, text, text) to anon, authenticated;

-- ── Seed: staff + working hours from the current opening hours ─────────
-- Matches src/config/site.ts (Di–Do 9–18, Fr 10–19, Sa 10–17). Editable
-- afterwards from the admin dashboard.
insert into staff (slug, name, role) values
  ('kerem-kirali', 'Kerem Kirali', 'Inhaber · Hairstylist · Barber'),
  ('hossein-khalili', 'Hossein Khalili', 'Master Barbier'),
  ('steven-blank', 'Steven Blank', 'Junior Stylist');

insert into availability_rules (staff_id, weekday, start_time, end_time)
select s.id, d.weekday, d.start_time, d.end_time
from staff s
cross join (
  values
    (2, time '09:00', time '18:00'), -- Dienstag
    (3, time '09:00', time '18:00'), -- Mittwoch
    (4, time '09:00', time '18:00'), -- Donnerstag
    (5, time '10:00', time '19:00'), -- Freitag
    (6, time '10:00', time '17:00')  -- Samstag
) as d(weekday, start_time, end_time);
