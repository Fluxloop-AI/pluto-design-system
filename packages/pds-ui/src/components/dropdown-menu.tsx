"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "@fluxloop-ai/pds-icons/lucide";
import * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "../utils/cn";

const menu = tv({
  slots: {
    content: [
      "z-[var(--pds-z-dropdown)] min-w-[180px] overflow-hidden",
      "rounded-[10px] p-[4px]",
      "bg-[var(--pds-background-elevated-normal)]",
      "shadow-[var(--pds-shadow-lg)]",
      "border border-[var(--pds-line-normal-neutral)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
    ],
    item: [
      "relative flex cursor-pointer select-none items-center gap-[8px]",
      "rounded-[6px] px-[8px] py-[6px] text-[13px] outline-none",
      "text-[color:var(--pds-label-normal)]",
      "data-[highlighted]:bg-[var(--pds-fill-normal)]",
      "data-[disabled]:pointer-events-none data-[disabled]:text-[color:var(--pds-label-disable)]",
    ],
    checkItem: [
      "relative flex cursor-pointer select-none items-center gap-[8px]",
      "rounded-[6px] pl-[28px] pr-[8px] py-[6px] text-[13px] outline-none",
      "text-[color:var(--pds-label-normal)]",
      "data-[highlighted]:bg-[var(--pds-fill-normal)]",
      "data-[disabled]:pointer-events-none data-[disabled]:text-[color:var(--pds-label-disable)]",
    ],
    indicator: "absolute left-[6px] inline-flex w-[16px] h-[16px] items-center justify-center",
    label: "px-[8px] py-[4px] text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pds-label-alternative)]",
    separator: "-mx-[4px] my-[4px] h-px bg-[var(--pds-line-normal-neutral)]",
    shortcut: "ml-auto text-[11px] tracking-wide text-[color:var(--pds-label-assistive)] font-[var(--pds-font-mono)]",
    subTrigger: [
      "relative flex cursor-pointer select-none items-center gap-[8px]",
      "rounded-[6px] px-[8px] py-[6px] text-[13px] outline-none",
      "text-[color:var(--pds-label-normal)]",
      "data-[highlighted]:bg-[var(--pds-fill-normal)]",
      "data-[state=open]:bg-[var(--pds-fill-normal)]",
    ],
  },
});

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(function DropdownMenuContent({ className, sideOffset = 4, ...props }, ref) {
  const styles = menu();
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(styles.content(), className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(function DropdownMenuItem({ className, ...props }, ref) {
  const styles = menu();
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(styles.item(), className)}
      {...props}
    />
  );
});

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, checked, ...props }, ref) {
  const styles = menu();
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(styles.checkItem(), className)}
      checked={checked}
      {...props}
    >
      <span className={styles.indicator()}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="w-[14px] h-[14px]" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  const styles = menu();
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(styles.checkItem(), className)}
      {...props}
    >
      <span className={styles.indicator()}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="w-[8px] h-[8px] fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(function DropdownMenuLabel({ className, ...props }, ref) {
  const styles = menu();
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(styles.label(), className)}
      {...props}
    />
  );
});

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  const styles = menu();
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(styles.separator(), className)}
      {...props}
    />
  );
});

function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const styles = menu();
  return <span className={cn(styles.shortcut(), className)} {...props} />;
}

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(function DropdownMenuSubTrigger({ className, children, ...props }, ref) {
  const styles = menu();
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(styles.subTrigger(), className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto w-[14px] h-[14px]" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(function DropdownMenuSubContent({ className, ...props }, ref) {
  const styles = menu();
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(styles.content(), className)}
      {...props}
    />
  );
});

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  menu,
};
