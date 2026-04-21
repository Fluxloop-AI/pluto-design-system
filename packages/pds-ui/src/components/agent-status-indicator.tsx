"use client";

import * as React from "react";
import type { ChatAgentStatus } from "../types/chat";
import { cn } from "../utils/cn";

const STATUS_LABELS: Record<ChatAgentStatus, string> = {
  speculating: "고민 중",
  thinking: "추론 중",
  tool_executing: "도구 실행 중",
  generating: "작성 중",
  compacting: "대화 정리 중",
};

const SPINNER_FRAMES = ["|", "/", "-", "\\"] as const;
const DOT_FRAMES = ["", ".", "..", "..."] as const;

function useAnimatedFrames(frames: readonly string[], delay: number) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, delay);
    return () => {
      window.clearInterval(timer);
    };
  }, [delay, frames]);

  return frames[index] ?? "";
}

type AgentStatusIndicatorProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  status: ChatAgentStatus | null;
  labels?: Partial<Record<ChatAgentStatus, string>>;
};

const AgentStatusIndicator = React.forwardRef<HTMLDivElement, AgentStatusIndicatorProps>(
  function AgentStatusIndicator({ status, labels, className, ...props }, ref) {
    const spinnerFrame = useAnimatedFrames(SPINNER_FRAMES, 120);
    const dotsFrame = useAnimatedFrames(DOT_FRAMES, 320);

    if (!status) return null;

    const label = labels?.[status] ?? STATUS_LABELS[status];
    const isSpinner = status === "tool_executing" || status === "compacting";

    return (
      <div
        ref={ref}
        data-slot="agent-status-indicator"
        data-status={status}
        className={cn(
          "mt-[8px] inline-flex items-center gap-[8px] rounded-full px-[12px] py-[8px]",
          "bg-[var(--pds-fill-normal)] text-[color:var(--pds-label-assistive)]",
          "text-[12px] leading-[16px]",
          className,
        )}
        {...props}
      >
        <span aria-hidden="true" className="inline-flex w-[12px] justify-center font-mono">
          {isSpinner ? spinnerFrame : "•"}
        </span>
        <span>{`${label}${isSpinner ? "" : dotsFrame}`}</span>
      </div>
    );
  },
);

export type { AgentStatusIndicatorProps };
export { AgentStatusIndicator };
