"use client";

import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "@fluxloop-ai/pds-icons/lucide";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const button = tv({
  slots: {
    root: [
      "relative inline-flex items-center justify-center align-middle box-border",
      "whitespace-nowrap leading-none cursor-pointer select-none",
      "transition-[background-color,color,box-shadow] duration-[var(--pds-motion-duration-fast)]",
      "ease-[cubic-bezier(0.4,0,0.2,1)]",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-primary-normal)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "disabled:pointer-events-none aria-disabled:pointer-events-none",
      "data-[loading=true]:cursor-wait",
    ],
    loading: "absolute inset-0 m-auto flex items-center justify-center",
    content: "inline-flex items-center justify-center",
  },
  variants: {
    variant: {
      primary: {
        root: [
          "text-[color:var(--pds-static-white,_#fff)] bg-[var(--pds-primary-normal)]",
          "hover:bg-[var(--pds-primary-strong)] active:bg-[var(--pds-primary-heavy)]",
          "disabled:text-[color:var(--pds-label-assistive)] disabled:bg-[var(--pds-interaction-disable)]",
          "aria-disabled:text-[color:var(--pds-label-assistive)] aria-disabled:bg-[var(--pds-interaction-disable)]",
        ],
      },
      secondary: {
        root: [
          "text-[color:var(--pds-label-normal)] bg-transparent",
          "shadow-[inset_0_0_0_1px_var(--pds-line-normal-neutral)]",
          "hover:bg-[var(--pds-fill-normal)]",
          "disabled:text-[color:var(--pds-label-disable)] disabled:bg-transparent",
          "aria-disabled:text-[color:var(--pds-label-disable)] aria-disabled:bg-transparent",
        ],
      },
      ghost: {
        root: [
          "text-[color:var(--pds-label-neutral)] bg-[var(--pds-fill-normal)]",
          "[backdrop-filter:blur(32px)] [will-change:backdrop-filter]",
          "hover:bg-[var(--pds-fill-strong)]",
          "disabled:text-[color:var(--pds-label-assistive)] disabled:bg-[var(--pds-interaction-disable)]",
          "disabled:[backdrop-filter:none]",
          "aria-disabled:text-[color:var(--pds-label-assistive)] aria-disabled:bg-[var(--pds-interaction-disable)]",
        ],
      },
      danger: {
        root: [
          "text-[color:var(--pds-static-white,_#fff)] bg-[var(--pds-status-negative)]",
          "hover:brightness-110 active:brightness-95",
          "disabled:text-[color:var(--pds-label-assistive)] disabled:bg-[var(--pds-interaction-disable)]",
          "aria-disabled:text-[color:var(--pds-label-assistive)] aria-disabled:bg-[var(--pds-interaction-disable)]",
        ],
      },
    },
    size: {
      sm: {
        root: "h-[32px] px-[14px] rounded-[8px] gap-[4px] text-[13px] font-semibold",
        loading: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
      },
      md: {
        root: "h-[40px] px-[20px] rounded-[10px] gap-[6px] text-[14px] font-semibold",
        loading: "[&_svg]:w-[16px] [&_svg]:h-[16px]",
      },
      lg: {
        root: "h-[48px] px-[28px] rounded-[12px] gap-[6px] text-[16px] font-semibold",
        loading: "[&_svg]:w-[18px] [&_svg]:h-[18px]",
      },
    },
    iconOnly: {
      true: { root: "px-0 aspect-square" },
      false: {},
    },
    fullWidth: {
      true: { root: "w-full" },
      false: { root: "w-fit" },
    },
    loading: {
      true: { content: "invisible" },
      false: {},
    },
  },
  compoundVariants: [
    { variant: "ghost", class: { root: "font-medium" } },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    iconOnly: false,
    fullWidth: false,
    loading: false,
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  iconOnly?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  asChild?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    iconOnly = false,
    fullWidth = false,
    loading = false,
    disabled,
    leadingContent,
    trailingContent,
    asChild,
    children,
    ...props
  },
  ref,
) {
  const styles = button({ variant, size, iconOnly, fullWidth, loading });
  const Component: React.ElementType = asChild ? Slot : "button";
  return (
    <Component
      ref={ref}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(styles.root(), className)}
      {...props}
    >
      <span className={styles.content()}>
        {leadingContent}
        {children}
        {trailingContent}
      </span>
      {loading ? (
        <span className={styles.loading()} aria-hidden="true">
          <Loader2 className="animate-spin" />
        </span>
      ) : null}
    </Component>
  );
});

export { Button, button };
export type { ButtonProps };
