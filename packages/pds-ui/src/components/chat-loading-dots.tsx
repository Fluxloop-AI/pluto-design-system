"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const chatLoadingDots = tv({
  slots: {
    root: ["inline-flex items-center", "text-[color:var(--pds-label-assistive)]"],
    dots: "pds-animate-dot-wave",
  },
  variants: {
    size: {
      sm: {
        root: "min-h-[24px] px-[4px] pt-[2px] pb-[6px]",
        dots: "[&>span]:w-[4px] [&>span]:h-[4px] gap-[3px]",
      },
      md: {
        root: "min-h-[32px] px-[4px] pt-[2px] pb-[10px]",
        dots: "[&>span]:w-[6px] [&>span]:h-[6px] gap-[4px]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ChatLoadingDotsVariants = VariantProps<typeof chatLoadingDots>;

type ChatLoadingDotsProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  size?: ChatLoadingDotsVariants["size"];
};

const ChatLoadingDots = React.forwardRef<HTMLDivElement, ChatLoadingDotsProps>(
  function ChatLoadingDots({ className, size = "md", ...props }, ref) {
    const styles = chatLoadingDots({ size });
    return (
      <div
        ref={ref}
        data-slot="chat-loading-dots"
        className={cn(styles.root(), className)}
        {...props}
      >
        <span aria-hidden="true" className={styles.dots()}>
          <span />
          <span />
          <span />
        </span>
      </div>
    );
  },
);

export type { ChatLoadingDotsProps };
export { ChatLoadingDots, chatLoadingDots };
