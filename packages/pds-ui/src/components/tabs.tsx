"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "../utils/cn";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const tabs = tv({
  slots: {
    root: [
      "flex",
      "data-[orientation=horizontal]:flex-col",
      "data-[orientation=vertical]:flex-row",
    ],
    list: [
      "inline-flex items-center gap-[2px]",
      "data-[orientation=vertical]:flex-col",
    ],
    trigger: [
      "inline-flex items-center justify-center shrink-0 cursor-pointer",
      "w-[24px] h-[24px] rounded-[var(--pds-radius-6)]",
      "[&>svg]:!w-[18px] [&>svg]:!h-[18px]",
      "text-[color:var(--pds-label-alternative)]",
      "transition-colors duration-[var(--pds-duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-1",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "hover:bg-[var(--pds-fill-normal)] hover:text-[color:var(--pds-label-neutral)]",
      "aria-selected:bg-[var(--pds-fill-strong)]",
      "aria-selected:text-[color:var(--pds-label-normal)]",
      "disabled:pointer-events-none disabled:text-[color:var(--pds-label-disable)]",
    ],
    content: "focus-visible:outline-none",
  },
});

type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(function Tabs(
  { className, ...props },
  ref,
) {
  const styles = tabs();
  return (
    <TooltipProvider>
      <TabsPrimitive.Root ref={ref} className={cn(styles.root(), className)} {...props} />
    </TooltipProvider>
  );
});

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  const styles = tabs();
  return <TabsPrimitive.List ref={ref} className={cn(styles.list(), className)} {...props} />;
});

type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  /** 툴팁 텍스트 + 스크린리더 라벨 (icon-only 트리거에 필수) */
  "aria-label": string;
  /** 툴팁 노출 위치 */
  tooltipSide?: "top" | "bottom" | "left" | "right";
};

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, tooltipSide = "bottom", ...props }, ref) {
  const styles = tabs();
  const label = props["aria-label"];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <TabsPrimitive.Trigger
          ref={ref}
          className={cn(styles.trigger(), className)}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent side={tooltipSide} size="sm">
        {label}
      </TooltipContent>
    </Tooltip>
  );
});

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  const styles = tabs();
  return <TabsPrimitive.Content ref={ref} className={cn(styles.content(), className)} {...props} />;
});

export type { TabsProps, TabsTriggerProps };
export { Tabs, TabsContent, TabsList, TabsTrigger, tabs };
