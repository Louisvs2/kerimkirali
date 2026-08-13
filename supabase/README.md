# Buchungssystem — Supabase-Setup

Das Terminbuchungssystem (Kalender, Zeitfenster, Admin-Bereich) braucht ein
eigenes, kostenloses Supabase-Projekt. Ohne diesen einmaligen Schritt läuft
die Website weiterhin, aber die Terminbuchung schlägt fehl.

## 1. Projekt erstellen

1. [supabase.com](https://supabase.com) → kostenlosen Account erstellen (falls noch nicht vorhanden).
2. „New Project" → Namen vergeben (z. B. `kerem-kirali`), Region **Frankfurt (eu-central-1)** wählen (liegt am nächsten zu Kassel), Datenbank-Passwort setzen und merken.
3. Warten, bis das Projekt bereit ist (~2 Minuten).

## 2. Schema einspielen

1. Im Supabase-Dashboard: **SQL Editor** → **New query**.
2. Inhalt von [`supabase/migrations/0001_booking_schema.sql`](./migrations/0001_booking_schema.sql) hineinkopieren und ausführen (**Run**).
3. Das legt alle Tabellen, Sicherheitsregeln und drei Mitarbeiter (Kerem, Hossein, Steven) mit den aktuellen Öffnungszeiten als Arbeitszeiten an.

## 3. Admin-Zugang für Kerem anlegen

1. Im Dashboard: **Authentication** → **Users** → **Add user** → **Create new user**.
2. E-Mail und Passwort für Kerem vergeben (das ist der Login für `/admin`).
3. „Auto Confirm User" aktivieren, damit kein Bestätigungslink nötig ist.

## 4. Umgebungsvariablen eintragen

Im Dashboard unter **Project Settings → API** finden sich:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** Key (⚠️ geheim halten, nie im Frontend verwenden) → `SUPABASE_SERVICE_ROLE_KEY`

Lokal in `.env.local` eintragen (siehe `.env.example`), in Produktion in den
Vercel-Projekteinstellungen unter **Environment Variables**.

Danach ist die Buchung unter `/kontakt#termin` und der Admin-Bereich unter
`/admin` einsatzbereit.
