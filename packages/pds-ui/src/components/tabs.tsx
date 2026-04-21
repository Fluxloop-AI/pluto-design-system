"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const tabs = tv({
  slots: {
    root: [
      "flex",
      "data-[orientation=horizontal]:flex-col",
      "data-[orientation=vertical]:flex-row",
    ],
    list: [
      "inline-flex items-center",
      "border-[var(--pds-line-normal-neutral)]",
      "data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:border-b",
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r",
    ],
    trigger: [
      "relative inline-flex items-center justify-center whitespace-nowrap cursor-pointer",
      "text-[color:var(--pds-label-alternative)]",
      "transition-colors duration-[var(--pds-duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "hover:text-[color:var(--pds-label-neutral)]",
      "data-[state=active]:text-[color:var(--pds-label-normal)]",
      "data-[state=active]:after:content-['']",
      "data-[state=active]:after:absolute",
      "data-[state=active]:after:bg-[var(--pds-primary-normal)]",
      "data-[disabled]:pointer-events-none data-[disabled]:text-[color:var(--pds-label-disable)]",
    ],
    content: "focus-visible:outline-none",
  },
  variants: {
    size: {
      sm: {
        trigger: [
          "h-[32px] px-[10px] text-[12px]",
          "data-[state=active]:after:h-[2px]",
          "data-[state=active]:after:bottom-[-1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0",
          "group-data-[orientation=vertical]/tabs:data-[state=active]:after:top-0 group-data-[orientation=vertical]/tabs:data-[state=active]:after:bottom-0",
        ],
      },
      md: {
        trigger: [
          "h-[36px] px-[12px] text-[13px]",
          "data-[state=active]:after:h-[2px]",
          "data-[state=active]:after:bottom-[-1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0",
        ],
      },
      lg: {
        trigger: [
          "h-[44px] px-[14px] text-[14px]",
          "data-[state=active]:after:h-[2px]",
          "data-[state=active]:after:bottom-[-1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0",
        ],
      },
    },
    resize: {
      hug: { list: "" },
      fill: { list: "w-full", trigger: "flex-1" },
    },
  },
  defaultVariants: {
    size: "md",
    resize: "hug",
  },
});

type TabsVariants = VariantProps<typeof tabs>;
type TabsSize = NonNullable<TabsVariants["size"]>;
type TabsResize = NonNullable<TabsVariants["resize"]>;

const TabsContext = React.createContext<{ size: TabsSize; resize: TabsResize }>({
  size: "md",
  resize: "hug",
});
const useTabsContext = () => React.useContext(TabsContext);

type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  size?: TabsSize;
  resize?: TabsResize;
};

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(function Tabs(
  { className, size = "md", resize = "hug", ...props },
  ref,
) {
  const styles = tabs();
  const ctx = React.useMemo(() => ({ size, resize }), [size, resize]);
  return (
    <TabsContext.Provider value={ctx}>
      <TabsPrimitive.Root ref={ref} className={cn(styles.root(), className)} {...props} />
    </TabsContext.Provider>
  );
});

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  const { size, resize } = useTabsContext();
  const styles = tabs({ size, resize });
  return <TabsPrimitive.List ref={ref} className={cn(styles.list(), className)} {...props} />;
});

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  const { size, resize } = useTabsContext();
  const styles = tabs({ size, resize });
  return <TabsPrimitive.Trigger ref={ref} className={cn(styles.trigger(), className)} {...props} />;
});

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  const styles = tabs();
  return <TabsPrimitive.Content ref={ref} className={cn(styles.content(), className)} {...props} />;
});

export type { TabsProps };
export { Tabs, TabsContent, TabsList, TabsTrigger, tabs };
