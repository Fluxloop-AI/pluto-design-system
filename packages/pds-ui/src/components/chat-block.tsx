"use client";

import { CaretRight } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import { tv } from "tailwind-variants";
import type { ChatStatusPhase } from "../types/chat";
import { cn } from "../utils/cn";
import { ChatStepDot } from "./chat-step-dot";

const chatBlock = tv({
  slots: {
    root: "m-0",
    trigger: [
      "w-full flex items-center gap-[8px] py-[8px] pr-[8px] pl-0",
      "border-0 bg-transparent text-inherit text-left cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] rounded-[6px]",
    ],
    chevron: [
      "inline-flex items-center justify-center w-[16px] h-[16px] text-[12px]",
      "text-[color:var(--pds-label-assistive)]",
      "transition-transform duration-200 ease-[var(--pds-chat-easing)]",
    ],
    region: "pds-chat-collapsible",
    regionInner: "",
  },
});

function Chevron({ open }: { open: boolean }) {
  const styles = chatBlock();
  return (
    <span
      aria-hidden="true"
      className={styles.chevron()}
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      <CaretRight />
    </span>
  );
}

type ChatBlockProps = {
  open: boolean;
  onToggle: () => void;
  phase: ChatStatusPhase;
  headerContent: React.ReactNode;
  children: React.ReactNode;
  animationClass?: string;
  showChevron?: boolean;
  className?: string;
  testId?: string;
  triggerTestId?: string;
};

const ChatBlock = React.forwardRef<HTMLDivElement, ChatBlockProps>(function ChatBlock(
  {
    open,
    onToggle,
    phase,
    headerContent,
    children,
    animationClass,
    showChevron = true,
    className,
    testId,
    triggerTestId,
  },
  ref,
) {
  const labelId = React.useId();
  const regionId = React.useId();
  const styles = chatBlock();

  return (
    <div
      ref={ref}
      data-slot="chat-block"
      data-testid={testId}
      className={cn(styles.root(), animationClass, className)}
    >
      <button
        type="button"
        id={labelId}
        aria-expanded={open}
        aria-controls={regionId}
        data-testid={triggerTestId}
        onClick={onToggle}
        className={styles.trigger()}
      >
        <ChatStepDot phase={phase} />
        {headerContent}
        {showChevron ? <Chevron open={open} /> : null}
      </button>
      <section
        id={regionId}
        aria-labelledby={labelId}
        data-expanded={open}
        className={styles.region()}
      >
        <div>{children}</div>
      </section>
    </div>
  );
});

export type { ChatBlockProps };
export { ChatBlock, chatBlock };
