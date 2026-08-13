import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// The single source of vertical rhythm between sections (DESIGN.md §4, §8).
// Background variants alternate base and subtly tinted surfaces to
// structure long pages — never introduce ad-hoc section padding.
// "default" stays transparent so body's own bg-background shows through —
// painting it here would sit in normal flow above body::before's ambient
// glow (which has a negative z-index) and block it on every section.
const sectionVariants = cva("py-20 sm:py-28 lg:py-32", {
  variants: {
    background: {
      default: "",
      muted: "bg-muted",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

export type SectionBackground = VariantProps<
  typeof sectionVariants
>["background"];

export function Section({
  className,
  background,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section
      className={cn(sectionVariants({ background }), className)}
      {...props}
    />
  );
}
