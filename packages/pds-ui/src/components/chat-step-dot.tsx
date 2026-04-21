"use client";

import * as React from "react";
import type { ChatStatusPhase } from "../types/chat";
import { cn } from "../utils/cn";

const PHASE_COLOR_VARS: Record<ChatStatusPhase, string> = {
  pending: "var(--pds-chat-dot-idle)",
  running: "var(--pds-primary-normal)",
  complete: "var(--pds-chat-dot-done)",
  error: "var(--pds-chat-dot-error)",
  "requires-action": "var(--pds-chat-dot-action)",
};

type ChatStepDotProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  phase: ChatStatusPhase;
  size?: number;
};

const ChatStepDot = React.forwardRef<HTMLSpanElement, ChatStepDotProps>(function ChatStepDot(
  { phase, size = 6, className, style, ...props },
  ref,
) {
  const color = PHASE_COLOR_VARS[phase];
  const isRunning = phase === "running";

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-slot="chat-step-dot"
      data-phase={phase}
      className={cn(
        "inline-flex shrink-0 rounded-full",
        "transition-[background-color,box-shadow] duration-500 ease-out",
        isRunning && "pds-animate-dot-ripple",
        className,
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        color,
        ...style,
      }}
      {...props}
    />
  );
});

export type { ChatStepDotProps };
export { ChatStepDot };
