"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "@fluxloop-ai/pds-icons/lucide";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const dialog = tv({
  slots: {
    overlay: [
      "fixed inset-0 z-[var(--pds-z-overlay)]",
      "bg-[var(--pds-material-dimmer)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    ],
    content: [
      "fixed z-[var(--pds-z-modal)]",
      "bg-[var(--pds-background-elevated-normal)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "shadow-[var(--pds-shadow-xl)]",
      "flex flex-col outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    ],
    navigation: [
      "flex items-center justify-between gap-[8px] shrink-0",
      "px-[20px] py-[12px] border-b border-[var(--pds-line-normal-neutral)]",
    ],
    title: "text-[15px] font-semibold text-[color:var(--pds-label-normal)] m-0",
    description: "text-[13px] text-[color:var(--pds-label-alternative)] m-0",
    body: "flex-1 min-h-0 overflow-auto px-[20px] py-[16px]",
    actionArea: [
      "flex items-center justify-end gap-[8px] shrink-0",
      "px-[20px] py-[12px] border-t border-[var(--pds-line-normal-neutral)]",
    ],
    close: [
      "inline-flex w-[32px] h-[32px] items-center justify-center rounded-[8px]",
      "text-[color:var(--pds-label-alternative)] hover:bg-[var(--pds-fill-normal)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)]",
    ],
  },
  variants: {
    variant: {
      popup: {
        content: [
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "rounded-[16px]",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        ],
      },
      full: {
        content: [
          "inset-[24px] rounded-[20px]",
          "data-[state=open]:slide-in-from-bottom-4",
        ],
      },
    },
    size: {
      sm: { content: "w-[360px] max-w-[calc(100vw-32px)]" },
      md: { content: "w-[480px] max-w-[calc(100vw-32px)]" },
      lg: { content: "w-[640px] max-w-[calc(100vw-32px)]" },
      xl: { content: "w-[800px] max-w-[calc(100vw-32px)]" },
    },
    resize: {
      fixed: { content: "max-h-[min(680px,calc(100vh-48px))]" },
      free: { content: "max-h-[calc(100vh-48px)]" },
    },
  },
  compoundVariants: [
    { variant: "full", class: { content: "w-auto max-w-none" } },
  ],
  defaultVariants: {
    variant: "popup",
    size: "md",
    resize: "fixed",
  },
});

type DialogVariants = VariantProps<typeof dialog>;

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  const styles = dialog();
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(styles.overlay(), className)}
      {...props}
    />
  );
});

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  variant?: DialogVariants["variant"];
  size?: DialogVariants["size"];
  resize?: DialogVariants["resize"];
  overlayClassName?: string;
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  { className, variant = "popup", size = "md", resize = "fixed", overlayClassName, children, ...props },
  ref,
) {
  const styles = dialog({ variant, size, resize });
  return (
    <DialogPortal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(styles.content(), className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

const DialogNavigation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DialogNavigation({ className, ...props }, ref) {
  const styles = dialog();
  return <div ref={ref} className={cn(styles.navigation(), className)} {...props} />;
});

const DialogBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DialogBody({ className, ...props }, ref) {
  const styles = dialog();
  return <div ref={ref} className={cn(styles.body(), className)} {...props} />;
});

const DialogActionArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DialogActionArea({ className, ...props }, ref) {
  const styles = dialog();
  return <div ref={ref} className={cn(styles.actionArea(), className)} {...props} />;
});

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  const styles = dialog();
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(styles.title(), className)}
      {...props}
    />
  );
});

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  const styles = dialog();
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(styles.description(), className)}
      {...props}
    />
  );
});

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & { withIcon?: boolean }
>(function DialogClose({ className, withIcon = true, children, ...props }, ref) {
  const styles = dialog();
  return (
    <DialogPrimitive.Close
      ref={ref}
      className={cn(styles.close(), className)}
      aria-label={typeof children === "string" ? undefined : "닫기"}
      {...props}
    >
      {children ?? (withIcon ? <X className="w-[16px] h-[16px]" /> : null)}
    </DialogPrimitive.Close>
  );
});

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogNavigation,
  DialogBody,
  DialogActionArea,
  DialogTitle,
  DialogDescription,
  DialogClose,
  dialog,
};
export type { DialogContentProps };
