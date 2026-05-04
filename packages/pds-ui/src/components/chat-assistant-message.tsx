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
import { ThinkingBlock } from "./thinking-block";
import { ToolCallCard } from "./tool-call-card";

const chatAssistantMessage = tv({
  slots: {
    root: "flex flex-col items-start pl-[4px]",
    text: [
      "max-w-[100%] break-words",
      "text-[14px] leading-[22px] text-[color:var(--pds-label-normal)]",
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
  actions?: React.ReactNode;
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
      className,
      ...props
    },
    ref,
  ) {
    const styles = chatAssistantMessage();
    const blocks = toBlocks(content);

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
        {actions}
      </div>
    );
  },
);

export type { ChatAssistantMessageProps };
export { ChatAssistantMessage, chatAssistantMessage };
