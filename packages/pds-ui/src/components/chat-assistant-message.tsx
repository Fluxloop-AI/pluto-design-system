"use client";

import * as React from "react";
import { tv } from "tailwind-variants";
import type {
  ChatStatusPhase,
  ContentBlock,
  TextBlock,
  ThinkingBlock as ThinkingBlockType,
  ToolResultBlock,
  ToolUseBlock,
} from "../types/chat";
import { cn } from "../utils/cn";
import { ChatCopyButton, extractCopyText } from "./internal/chat-copy-button";
import { ThinkingBlock } from "./thinking-block";
import { ToolCallCard } from "./tool-call-card";
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
  content: string | ContentBlock[];
  toolResults?: Map<string, ToolResultBlock>;
  renderMarkdown?: (text: string) => React.ReactNode;
  renderToolCall?: (toolUse: ToolUseBlock, toolResult?: ToolResultBlock) => React.ReactNode;
  renderThinking?: (block: ThinkingBlockType, phase?: ChatStatusPhase) => React.ReactNode;
  /** 메시지 아래 추가 액션. `showCopy` 가 true 면 기본 복사 버튼 옆에 함께 노출. */
  actions?: React.ReactNode;
  /** 기본 복사 버튼 노출 여부. 텍스트 컨텐츠가 있을 때만 실제로 그려짐. 기본 true. */
  showCopy?: boolean;
  className?: string;
};

function toBlocks(content: string | ContentBlock[]): ContentBlock[] {
  if (typeof content === "string") {
    const textBlock: TextBlock = { type: "text", text: content };
    return [textBlock];
  }
  return content;
}

const ChatAssistantMessage = React.forwardRef<HTMLDivElement, ChatAssistantMessageProps>(
  function ChatAssistantMessage(
    {
      content,
      toolResults,
      renderMarkdown,
      renderToolCall,
      renderThinking,
      actions,
      showCopy = true,
      className,
      ...props
    },
    ref,
  ) {
    const styles = chatAssistantMessage();
    const blocks = toBlocks(content);

    const copyText = showCopy ? extractCopyText(blocks) : "";
    const hasCopy = copyText.length > 0;
    const hasActionBar = hasCopy || Boolean(actions);

    return (
      <div
        ref={ref}
        data-slot="chat-assistant-message"
        data-role="assistant"
        className={cn(styles.root(), className)}
        {...props}
      >
        {blocks.map((block, blockIndex) => {
          const blockKey = `${blockIndex}-${block.type}`;
          if (block.type === "text") {
            return (
              <div key={blockKey} className={styles.text()}>
                {renderMarkdown ? (
                  renderMarkdown(block.text)
                ) : (
                  <span className="whitespace-pre-wrap">{block.text}</span>
                )}
              </div>
            );
          }
          if (block.type === "thinking") {
            if (renderThinking) {
              return <React.Fragment key={blockKey}>{renderThinking(block)}</React.Fragment>;
            }
            return (
              <ThinkingBlock
                key={blockKey}
                thinking={block.thinking}
                renderMarkdown={renderMarkdown}
              />
            );
          }
          if (block.type === "tool_use") {
            const toolResult = toolResults?.get(block.id);
            if (renderToolCall) {
              return (
                <React.Fragment key={blockKey}>
                  {renderToolCall(block, toolResult)}
                </React.Fragment>
              );
            }
            return (
              <ToolCallCard
                key={blockKey}
                toolCallId={block.id}
                toolName={block.name}
                args={block.input as Record<string, unknown>}
                result={toolResult?.content}
                isError={toolResult?.is_error}
              />
            );
          }
          return null;
        })}
        {hasActionBar ? (
          <TooltipProvider>
            <div className={styles.actions()}>
              {hasCopy ? <ChatCopyButton text={copyText} /> : null}
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
