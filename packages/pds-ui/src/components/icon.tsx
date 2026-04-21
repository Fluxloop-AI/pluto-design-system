"use client";

import type { PhosphorIcon } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const icon = tv({
  base: "inline-block shrink-0",
  variants: {
    size: {
      xs: "w-[12px] h-[12px]",
      sm: "w-[16px] h-[16px]",
      md: "w-[20px] h-[20px]",
      lg: "w-[24px] h-[24px]",
      xl: "w-[28px] h-[28px]",
    },
    color: {
      inherit: "text-[color:inherit]",
      "label-normal": "text-[color:var(--pds-label-normal)]",
      "label-strong": "text-[color:var(--pds-label-strong)]",
      "label-neutral": "text-[color:var(--pds-label-neutral)]",
      "label-alternative": "text-[color:var(--pds-label-alternative)]",
      "label-assistive": "text-[color:var(--pds-label-assistive)]",
      "label-disable": "text-[color:var(--pds-label-disable)]",
      primary: "text-[color:var(--pds-primary-normal)]",
      positive: "text-[color:var(--pds-status-positive)]",
      cautionary: "text-[color:var(--pds-status-cautionary)]",
      negative: "text-[color:var(--pds-status-negative)]",
    },
  },
  defaultVariants: {
    size: "md",
    color: "inherit",
  },
});

type IconVariants = VariantProps<typeof icon>;

type IconProps = Omit<React.SVGAttributes<SVGSVGElement>, "color"> & {
  icon: PhosphorIcon | React.ComponentType<React.SVGAttributes<SVGSVGElement>>;
  size?: IconVariants["size"];
  color?: IconVariants["color"];
  label?: string;
};

const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { icon: Component, size = "md", color = "inherit", label, className, ...props },
  ref,
) {
  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const };
  return (
    <Component
      ref={ref as never}
      className={cn(icon({ size, color }), className)}
      {...a11y}
      {...props}
    />
  );
});

export type { IconProps };
export { Icon, icon };
