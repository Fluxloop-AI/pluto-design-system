"use client";

import * as React from "react";
import type { ChatStatusPhase } from "../types/chat";
import { formatReasoningContent } from "../utils/reasoning";
import { ChatBlock } from "./chat-block";

export const REDACTED_THINKING_MESSAGE = "추론 내용이 안전 필터에 의해 숨겨졌습니다";

function toThinkingPhase(statusPhase?: ChatStatusPhase): ChatStatusPhase {
  switch (statusPhase) {
    case "pending":
    case "running":
    case "complete":
    case "error":
    case "requires-action":
      return statusPhase;
    default:
      return "complete";
  }
}

function getDurationLabel(seconds: number): string {
  if (seconds <= 0) return "잠시 생각함";
  return `${seconds}초 생각함`;
}

type ThinkingBlockProps = {
  thinking: string;
  duration?: number;
  redacted?: boolean;
  statusPhase?: ChatStatusPhase;
  renderMarkdown?: (text: string) => React.ReactNode;
  className?: string;
};

function ThinkingBlock({
  thinking,
  duration: persistedDuration,
  redacted = false,
  statusPhase,
  renderMarkdown,
  className,
}: ThinkingBlockProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const phase = toThinkingPhase(statusPhase);
  const isRunning = phase === "running";

  const startedAtRef = React.useRef<number | null>(null);
  const [duration, setDuration] = React.useState<number | null>(null);

  const autoClosedRef = React.useRef(false);
  const autoCloseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (isRunning) {
      startedAtRef.current = Date.now();
      setDuration(null);
      autoClosedRef.current = false;
      setIsOpen(true);
    } else if (startedAtRef.current !== null) {
      const elapsed = Math.ceil((Date.now() - startedAtRef.current) / 1000);
      setDuration(elapsed);
      startedAtRef.current = null;

      if (!autoClosedRef.current) {
        autoCloseTimerRef.current = setTimeout(() => {
          autoClosedRef.current = true;
          setIsOpen(false);
        }, 1000);
      }
    }

    return () => {
      if (autoCloseTimerRef.current !== null) {
        clearTimeout(autoCloseTimerRef.current);
        autoCloseTimerRef.current = null;
      }
    };
  }, [isRunning]);

  const handleToggle = React.useCallback(() => {
    if (autoCloseTimerRef.current !== null) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    autoClosedRef.current = true;
    setIsOpen((prev) => !prev);
  }, []);

  let label: string;
  if (isRunning) {
    label = "생각중...";
  } else if (persistedDuration !== undefined) {
    label = getDurationLabel(persistedDuration);
  } else if (duration !== null) {
    label = getDurationLabel(duration);
  } else {
    label = "추론 과정 보기";
  }

  const body = redacted ? (
    <span className="text-[13px] text-[color:var(--pds-label-assistive)] leading-[20px]">
      {REDACTED_THINKING_MESSAGE}
    </span>
  ) : renderMarkdown ? (
    renderMarkdown(formatReasoningContent(thinking))
  ) : (
    <pre className="whitespace-pre-wrap text-[13px] text-[color:var(--pds-label-neutral)] leading-[20px]">
      {formatReasoningContent(thinking)}
    </pre>
  );

  return (
    <ChatBlock
      open={isOpen}
      onToggle={handleToggle}
      phase={phase}
      animationClass="pds-animate-step-in"
      showChevron={!isRunning}
      testId="thinking-block"
      triggerTestId="thinking-block-summary"
      className={className}
      headerContent={
        <span
          data-testid="thinking-block-label"
          className={`min-w-0 flex-1 font-medium text-[13px] text-[color:var(--pds-label-alternative)] leading-[18px] ${
            isRunning ? "pds-animate-glow" : ""
          }`}
        >
          {label}
        </span>
      }
    >
      <div
        data-testid="thinking-block-content"
        className="break-words pt-[4px] pr-[16px] pb-[12px] pl-[20px]"
      >
        {body}
      </div>
    </ChatBlock>
  );
}

export type { ThinkingBlockProps };
export { ThinkingBlock };
