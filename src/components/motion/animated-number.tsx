"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  /** Fixed decimal places, e.g. 1 for a "4,9" rating. Defaults to 0. */
  decimals?: number;
  className?: string;
}

const DURATION_MS = 1200;

// Count-up for stats (DESIGN.md §11). Server-renders the final value so the
// number is correct without JavaScript; the count-up only runs client-side
// once the element enters the viewport. Skipped under reduced motion.
// Plain requestAnimationFrame keeps motion's animation runtime out of the
// bundle — the in-view detection is the only motion dependency here.
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  locale = "de-DE",
  decimals = 0,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  const format = useCallback(
    (n: number) =>
      n.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [locale, decimals],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !isInView || reduceMotion) return;

    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${prefix}${format(eased * value)}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduceMotion, value, prefix, suffix, format]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${prefix}${format(value)}${suffix}`}
    </span>
  );
}
