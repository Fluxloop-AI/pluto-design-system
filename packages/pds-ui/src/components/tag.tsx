"use client";

import { X } from "@fluxloop-ai/pds-icons/icons";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const tag = tv({
  slots: {
    root: [
      "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
      "font-medium leading-none select-none cursor-pointer",
      "transition-[background-color,color,box-shadow] duration-[var(--pds-duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "disabled:cursor-default disabled:pointer-events-none",
      "disabled:text-[color:var(--pds-label-disable)] disabled:bg-[var(--pds-interaction-disable)]",
    ],
    // Non-interactive wrapper variant (used when onRemove is set so the remove X can be a sibling button)
    group: [
      "inline-flex items-center shrink-0 whitespace-nowrap gap-[4px]",
      "font-medium leading-none select-none",
    ],
    label: [
      "inline-flex items-center justify-center cursor-pointer",
      "transition-[background-color,color,box-shadow] duration-[var(--pds-duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "disabled:cursor-default disabled:pointer-events-none",
      "disabled:text-[color:var(--pds-label-disable)] disabled:bg-[var(--pds-interaction-disable)]",
    ],
    leading: "inline-flex shrink-0 items-center",
    trailing: "inline-flex shrink-0 items-center",
    remove: [
      "inline-flex items-center justify-center shrink-0 rounded-full",
      "text-current opacity-60 hover:opacity-100 cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
    ],
  },
  variants: {
    size: {
      xs: {
        root: "h-[20px] px-[6px] rounded-[6px] text-[11px] gap-[3px]",
        label: "h-[20px] px-[6px] rounded-[6px] text-[11px] gap-[3px]",
        leading: "[&_svg]:w-[12px] [&_svg]:h-[12px]",
        trailing: "[&_svg]:w-[12px] [&_svg]:h-[12px]",
        remove: "w-[14px] h-[14px] [&_svg]:w-[10px] [&_svg]:h-[10px]",
      },
      sm: {
        root: "h-[24px] px-[8px] rounded-[8px] text-[12px] gap-[4px]",
        label: "h-[24px] px-[8px] rounded-[8px] text-[12px] gap-[4px]",
        leading: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
        trailing: "[&_svg]:w-[14px] [&_svg]:h-[14px]",
        remove: "w-[16px] h-[16px] [&_svg]:w-[12px] [&_svg]:h-[12px]",
      },
      md: {
        root: "h-[28px] px-[10px] rounded-[8px] text-[13px] gap-[6px]",
        label: "h-[28px] px-[10px] rounded-[8px] text-[13px] gap-[6px]",
        leading: "[&_svg]:w-[16px] [&_svg]:h-[16px]",
        trailing: "[&_svg]:w-[16px] [&_svg]:h-[16px]",
        remove: "w-[18px] h-[18px] [&_svg]:w-[12px] [&_svg]:h-[12px]",
      },
      lg: {
        root: "h-[32px] px-[12px] rounded-[10px] text-[13px] gap-[6px]",
        label: "h-[32px] px-[12px] rounded-[10px] text-[13px] gap-[6px]",
        leading: "[&_svg]:w-[16px] [&_svg]:h-[16px]",
        trailing: "[&_svg]:w-[16px] [&_svg]:h-[16px]",
        remove: "w-[20px] h-[20px] [&_svg]:w-[14px] [&_svg]:h-[14px]",
      },
    },
    variant: {
      solid: {
        root: [
          "bg-[var(--pds-fill-normal)] text-[color:var(--pds-label-neutral)]",
          "hover:bg-[var(--pds-fill-alternative)]",
          "data-[pressed=true]:bg-[var(--pds-primary-normal)]",
          "data-[pressed=true]:text-[color:var(--pds-inverse-label)]",
        ],
        label: [
          "bg-[var(--pds-fill-normal)] text-[color:var(--pds-label-neutral)]",
          "hover:bg-[var(--pds-fill-alternative)]",
          "data-[pressed=true]:bg-[var(--pds-primary-normal)]",
          "data-[pressed=true]:text-[color:var(--pds-inverse-label)]",
        ],
      },
      outlined: {
        root: [
          "bg-transparent text-[color:var(--pds-label-neutral)]",
          "shadow-[inset_0_0_0_1px_var(--pds-line-normal-neutral)]",
          "hover:bg-[var(--pds-fill-normal)]",
          "data-[pressed=true]:bg-[var(--pds-primary-normal)]",
          "data-[pressed=true]:text-[color:var(--pds-inverse-label)]",
          "data-[pressed=true]:shadow-none",
        ],
        label: [
          "bg-transparent text-[color:var(--pds-label-neutral)]",
          "shadow-[inset_0_0_0_1px_var(--pds-line-normal-neutral)]",
          "hover:bg-[var(--pds-fill-normal)]",
          "data-[pressed=true]:bg-[var(--pds-primary-normal)]",
          "data-[pressed=true]:text-[color:var(--pds-inverse-label)]",
          "data-[pressed=true]:shadow-none",
        ],
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "solid",
  },
});

type TagVariants = VariantProps<typeof tag>;

type TagProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  size?: TagVariants["size"];
  variant?: TagVariants["variant"];
  pressed?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  onRemove?: () => void;
  asChild?: boolean;
};

const Tag = React.forwardRef<HTMLButtonElement, TagProps>(function Tag(
  {
    className,
    size = "md",
    variant = "solid",
    pressed,
    disabled,
    leadingContent,
    trailingContent,
    onRemove,
    asChild,
    children,
    type = "button",
    ...props
  },
  ref,
) {
  const styles = tag({ size, variant });
  const hasRemove = typeof onRemove === "function";

  const body = (
    <>
      {leadingContent ? <span className={styles.leading()}>{leadingContent}</span> : null}
      {children}
      {!hasRemove && trailingContent ? (
        <span className={styles.trailing()}>{trailingContent}</span>
      ) : null}
    </>
  );

  if (hasRemove) {
    // Root as non-interactive wrapper so remove X can be a sibling <button>.
    return (
      <span className={cn(styles.group(), className)}>
        <button
          ref={ref}
          type={type}
          disabled={disabled}
          aria-pressed={typeof pressed === "boolean" ? pressed : undefined}
          data-pressed={pressed || undefined}
          className={styles.label()}
          {...props}
        >
          {body}
        </button>
        <button
          type="button"
          aria-label="제거"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={styles.remove()}
        >
          <X />
        </button>
      </span>
    );
  }

  const Component: React.ElementType = asChild ? Slot : "button";
  return (
    <Component
      ref={ref}
      type={asChild ? undefined : type}
      disabled={asChild ? undefined : disabled}
      aria-pressed={typeof pressed === "boolean" ? pressed : undefined}
      data-pressed={pressed || undefined}
      className={cn(styles.root(), className)}
      {...props}
    >
      {body}
    </Component>
  );
});

export type { TagProps };
export { Tag, tag };
