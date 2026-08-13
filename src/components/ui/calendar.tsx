"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  /** A date is unselectable when this returns true (e.g. in the past). */
  disabled?: (date: Date) => boolean;
  className?: string;
}

const WEEKDAY_LABELS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Monday-first offset: JS getDay() is 0=Sunday, so shift by one and wrap.
function mondayFirstIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

// Small, dependency-free month grid — no calendar library needed for a
// single date picker, keeps the booking flow's bundle light (CLAUDE.md §3).
export function Calendar({
  selected,
  onSelect,
  disabled,
  className,
}: CalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(selected ?? new Date()),
  );

  const firstDay = startOfMonth(visibleMonth);
  const leadingBlanks = mondayFirstIndex(firstDay);
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();

  const cells: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) =>
        new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), i + 1),
    ),
  ];

  const monthLabel = visibleMonth.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between pb-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Vorheriger Monat"
          onClick={() =>
            setVisibleMonth(
              new Date(
                visibleMonth.getFullYear(),
                visibleMonth.getMonth() - 1,
                1,
              ),
            )
          }
        >
          <ChevronLeft className="size-4" />
        </Button>
        <p className="text-sm font-medium capitalize">{monthLabel}</p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Nächster Monat"
          onClick={() =>
            setVisibleMonth(
              new Date(
                visibleMonth.getFullYear(),
                visibleMonth.getMonth() + 1,
                1,
              ),
            )
          }
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="py-2">
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`blank-${i}`} />;
          const isDisabled = disabled?.(date) ?? false;
          const isSelected = selected ? isSameDay(date, selected) : false;
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(date)}
              aria-pressed={isSelected}
              className={cn(
                "aspect-square rounded-lg text-sm transition-colors",
                isDisabled
                  ? "cursor-not-allowed text-muted-foreground/30"
                  : "hover:bg-muted",
                isSelected &&
                  "bg-primary text-primary-foreground hover:bg-primary",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
