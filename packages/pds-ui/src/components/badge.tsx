"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const badge = tv({
  slots: {
    root: [
      "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
      "font-medium leading-none select-none",
    ],
    leading: "inline-flex shrink-0 items-center",
    trailing: "inline-flex shrink-0 items-center",
  },
  variants: {
    size: {
      xs: {
        root: "h-[16px] px-[4px] rounded-[4px] text-[10px] gap-[2px]",
        leading: "[&_svg]:w-[10px] [&_svg]:h-[10px]",
        trailing: "[&_svg]:w-[10px] [&_svg]:h-[10px]",
      },
      sm: {
        root: "h-[18px] px-[6px] rounded-[6px] text-[11px] gap-[3px]",
        leading: "[&_svg]:w-[12px] [&_svg]:h-[12px]",
        trailing: "[&_svg]:w-[12px] [&_svg]:h-[12px]",
      },
      md: {
        root: "h-[22px] px-[8px] rounded-[6px] text-[12px] gap-[4px]",
        leading: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
        trailing: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
      },
    },
    variant: {
      solid: {},
      outlined: {
        root: "bg-transparent",
      },
    },
    color: {
      neutral: {},
      accent: {},
      positive: {},
      cautionary: {},
      negative: {},
    },
  },
  compoundVariants: [
    // solid
    {
      variant: "solid",
      color: "neutral",
      class: {
        root: "bg-[var(--pds-fill-normal)] text-[color:var(--pds-label-neutral)]",
      },
    },
    {
      variant: "solid",
      color: "accent",
      class: {
        root: "bg-[var(--pds-primary-normal)] text-[color:var(--pds-inverse-label)]",
      },
    },
    {
      variant: "solid",
      color: "positive",
      class: {
        root: "bg-[var(--pds-status-positive)] text-[color:var(--pds-inverse-label)]",
      },
    },
    {
      variant: "solid",
      color: "cautionary",
      class: {
        root: "bg-[var(--pds-status-cautionary)] text-[color:var(--pds-inverse-label)]",
      },
    },
    {
      variant: "solid",
      color: "negative",
      class: {
        root: "bg-[var(--pds-status-negative)] text-[color:var(--pds-inverse-label)]",
      },
    },
    // outlined
    {
      variant: "outlined",
      color: "neutral",
      class: {
        root: "text-[color:var(--pds-label-neutral)] shadow-[inset_0_0_0_1px_var(--pds-line-normal-neutral)]",
      },
    },
    {
      variant: "outlined",
      color: "accent",
      class: {
        root: "text-[color:var(--pds-primary-normal)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--pds-primary-normal)_35%,transparent)]",
      },
    },
    {
      variant: "outlined",
      color: "positive",
      class: {
        root: "text-[color:var(--pds-status-positive)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--pds-status-positive)_35%,transparent)]",
      },
    },
    {
      variant: "outlined",
      color: "cautionary",
      class: {
        root: "text-[color:var(--pds-status-cautionary)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--pds-status-cautionary)_35%,transparent)]",
      },
    },
    {
      variant: "outlined",
      color: "negative",
      class: {
        root: "text-[color:var(--pds-status-negative)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--pds-status-negative)_35%,transparent)]",
      },
    },
  ],
  defaultVariants: {
    size: "xs",
    variant: "solid",
    color: "neutral",
  },
});

type BadgeVariants = VariantProps<typeof badge>;

type BadgeProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> & {
  size?: BadgeVariants["size"];
  variant?: BadgeVariants["variant"];
  color?: BadgeVariants["color"];
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    className,
    size = "xs",
    variant = "solid",
    color = "neutral",
    leadingContent,
    trailingContent,
    children,
    ...props
  },
  ref,
) {
  const styles = badge({ size, variant, color });
  return (
    <span ref={ref} className={cn(styles.root(), className)} {...props}>
      {leadingContent ? <span className={styles.leading()}>{leadingContent}</span> : null}
      {children}
      {trailingContent ? <span className={styles.trailing()}>{trailingContent}</span> : null}
    </span>
  );
});

export type { BadgeProps };
export { Badge, badge };
