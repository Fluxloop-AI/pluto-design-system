"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
  X,
} from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const toast = tv({
  slots: {
    viewport: [
      "fixed z-[var(--pds-z-toast)] top-[16px] right-[16px] flex flex-col gap-[8px]",
      "w-[380px] max-w-[calc(100vw-32px)] m-0 p-0 list-none outline-none",
    ],
    root: [
      "relative flex items-start gap-[12px] p-[12px] pr-[40px] rounded-[12px]",
      "bg-[var(--pds-background-elevated-normal)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "shadow-[var(--pds-shadow-lg)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-2",
      "data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full",
    ],
    icon: "mt-[2px] shrink-0 w-[16px] h-[16px]",
    body: "flex-1 min-w-0 flex flex-col gap-[2px]",
    title: "text-[13px] font-semibold text-[color:var(--pds-label-normal)] m-0",
    description: "text-[12px] text-[color:var(--pds-label-alternative)] m-0",
    close: [
      "absolute right-[8px] top-[8px] inline-flex w-[28px] h-[28px] items-center justify-center",
      "rounded-[6px] text-[color:var(--pds-label-alternative)]",
      "hover:bg-[var(--pds-fill-normal)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)]",
    ],
  },
  variants: {
    variant: {
      info: { icon: "text-[color:var(--pds-label-alternative)]" },
      success: { icon: "text-[color:var(--pds-status-positive)]" },
      warning: { icon: "text-[color:var(--pds-status-cautionary)]" },
      error: { icon: "text-[color:var(--pds-status-negative)]" },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

type ToastVariants = VariantProps<typeof toast>;

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  const styles = toast();
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(styles.viewport(), className)}
      {...props}
    />
  );
});

const VARIANT_ICON: Record<NonNullable<ToastVariants["variant"]>, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle,
  warning: Warning,
  error: WarningCircle,
};

type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
  variant?: ToastVariants["variant"];
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastRootProps
>(function Toast(
  { className, variant = "info", title, description, action, children, ...props },
  ref,
) {
  const styles = toast({ variant });
  const VariantIcon = VARIANT_ICON[variant ?? "info"];
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(styles.root(), className)}
      {...props}
    >
      <VariantIcon className={styles.icon()} />
      <div className={styles.body()}>
        {title ? <ToastPrimitive.Title className={styles.title()}>{title}</ToastPrimitive.Title> : null}
        {description ? (
          <ToastPrimitive.Description className={styles.description()}>
            {description}
          </ToastPrimitive.Description>
        ) : null}
        {children}
      </div>
      {action}
      <ToastPrimitive.Close className={styles.close()} aria-label="닫기">
        <X className="w-[14px] h-[14px]" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
});

const ToastAction = ToastPrimitive.Action;

export {
  Toast,
  ToastAction,
  ToastProvider,
  ToastViewport,
  toast,
};
export type { ToastRootProps };
