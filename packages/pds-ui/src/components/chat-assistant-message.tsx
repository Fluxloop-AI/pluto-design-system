"use client";

import * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "../utils/cn";
import { ChatCopyButton } from "./internal/chat-copy-button";
import { TooltipProvider } from "./tooltip";

const chatAssistantMessage = tv({
  slots: {
    root: "group/msg flex w-full min-w-0 flex-col items-start pl-[4px]",
    text: [
      "w-full min-w-0 max-w-full break-words",
      "text-[14px] leading-[22px] text-[color:var(--pds-label-normal)]",
    ],
    actions: [
      "flex gap-[2px] mt-[4px]",
      "opacity-0 group-hover/msg:opacity-100 group-focus-within/msg:opacity-100",
      "transition-opacity duration-[var(--pds-motion-duration-fast)]",
    ],
  },
});

type ChatAssistantMessageProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "content"
> & {
  content: string;
  renderMarkdown?: (text: string) => React.ReactNode;
  /** 메시지 아래 추가 액션. `showCopy` 가 true 면 기본 복사 버튼 옆에 함께 노출. */
  actions?: React.ReactNode;
  /** 기본 복사 버튼 노출 여부. 텍스트 컨텐츠가 있을 때만 실제로 그려짐. 기본 true. */
  showCopy?: boolean;
  className?: string;
};

const ChatAssistantMessage = React.forwardRef<HTMLDivElement, ChatAssistantMessageProps>(
  function ChatAssistantMessage(
    { content, renderMarkdown, actions, showCopy = true, className, ...props },
    ref,
  ) {
    const styles = chatAssistantMessage();

    const hasCopy = showCopy && content.length > 0;
    const hasActionBar = hasCopy || Boolean(actions);

    return (
      <div
        ref={ref}
        data-slot="chat-assistant-message"
        data-role="assistant"
        className={cn(styles.root(), className)}
        {...props}
      >
        <div className={styles.text()}>
          {renderMarkdown ? (
            renderMarkdown(content)
          ) : (
            <span className="whitespace-pre-wrap">{content}</span>
          )}
        </div>
        {hasActionBar ? (
          <TooltipProvider>
            <div className={styles.actions()}>
              {hasCopy ? <ChatCopyButton text={content} /> : null}
              {actions}
            </div>
          </TooltipProvider>
        ) : null}
      </div>
    );
  },
);

export type { ChatAssistantMessageProps };
export { ChatAssistantMessage, chatAssistantMessage };
