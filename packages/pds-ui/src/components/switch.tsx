"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const switchStyles = tv({
  slots: {
    root: [
      "relative inline-flex shrink-0 cursor-pointer items-center",
      "rounded-full border border-transparent",
      "bg-[var(--pds-interaction-inactive)]",
      "transition-colors duration-[var(--pds-duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "data-[state=checked]:bg-[var(--pds-primary-normal)]",
      "disabled:cursor-default disabled:opacity-60 disabled:pointer-events-none",
    ],
    thumb: [
      "pointer-events-none block rounded-full",
      "bg-[var(--pds-background-elevated-normal)]",
      "shadow-[var(--pds-shadow-md)]",
      "transition-transform duration-[var(--pds-duration-fast)]",
      "translate-x-[var(--pds-switch-offset,2px)]",
      "data-[state=checked]:translate-x-[var(--pds-switch-thumb-on)]",
    ],
  },
  variants: {
    size: {
      sm: {
        root: "h-[18px] w-[30px] p-[1px]",
        thumb: "w-[14px] h-[14px]",
      },
      md: {
        root: "h-[22px] w-[38px] p-[2px]",
        thumb: "w-[18px] h-[18px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SwitchVariants = VariantProps<typeof switchStyles>;

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  size?: SwitchVariants["size"];
};

const SWITCH_OFFSETS: Record<NonNullable<SwitchVariants["size"]>, { on: string }> = {
  sm: { on: "14px" },
  md: { on: "18px" },
};

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  function Switch({ className, size = "md", style, ...props }, ref) {
    const styles = switchStyles({ size });
    const offset = SWITCH_OFFSETS[size ?? "md"];
    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(styles.root(), className)}
        style={
          {
            ["--pds-switch-thumb-on" as string]: offset.on,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <SwitchPrimitive.Thumb className={styles.thumb()} />
      </SwitchPrimitive.Root>
    );
  },
);

export type { SwitchProps };
export { Switch, switchStyles };
