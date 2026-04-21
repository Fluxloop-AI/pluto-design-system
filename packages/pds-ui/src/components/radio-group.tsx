"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const radio = tv({
  slots: {
    group:
      "flex gap-[12px] data-[orientation=vertical]:flex-col data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap",
    item: [
      "peer inline-flex shrink-0 items-center justify-center",
      "rounded-full border",
      "border-[var(--pds-line-normal-neutral)]",
      "bg-[var(--pds-background-elevated-normal)]",
      "transition-[background-color,border-color,color]",
      "duration-[var(--pds-duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
      "data-[state=checked]:border-[var(--pds-primary-normal)]",
      "disabled:cursor-default disabled:pointer-events-none",
      "disabled:bg-[var(--pds-interaction-disable)]",
      "disabled:border-[var(--pds-line-normal-alternative)]",
      "aria-invalid:border-[var(--pds-status-negative)]",
    ],
    indicator: [
      "flex items-center justify-center",
      "after:block after:rounded-full after:bg-[var(--pds-primary-normal)]",
    ],
  },
  variants: {
    size: {
      sm: {
        item: "w-[16px] h-[16px]",
        indicator: "after:w-[8px] after:h-[8px]",
      },
      md: {
        item: "w-[20px] h-[20px]",
        indicator: "after:w-[10px] after:h-[10px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type RadioVariants = VariantProps<typeof radio>;
type RadioSize = NonNullable<RadioVariants["size"]>;

const SizeContext = React.createContext<RadioSize>("md");
const useRadioSize = () => React.useContext(SizeContext);

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
  size?: RadioSize;
};

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(function RadioGroup({ className, size = "md", orientation = "vertical", ...props }, ref) {
  const styles = radio();
  return (
    <SizeContext.Provider value={size}>
      <RadioGroupPrimitive.Root
        ref={ref}
        orientation={orientation}
        className={cn(styles.group(), className)}
        {...props}
      />
    </SizeContext.Provider>
  );
});

type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  size?: RadioSize;
};

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(function RadioGroupItem({ className, size: sizeProp, ...props }, ref) {
  const ctxSize = useRadioSize();
  const size = sizeProp ?? ctxSize;
  const styles = radio({ size });
  return (
    <RadioGroupPrimitive.Item ref={ref} className={cn(styles.item(), className)} {...props}>
      <RadioGroupPrimitive.Indicator className={styles.indicator()} />
    </RadioGroupPrimitive.Item>
  );
});

export type { RadioGroupItemProps, RadioGroupProps };
export { RadioGroup, RadioGroupItem, radio };
