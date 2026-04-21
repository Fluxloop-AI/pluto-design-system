"use client";

import * as React from "react";
import { tv } from "tailwind-variants";
import type {
  ChatMessage,
  ChatStatusPhase,
  ContentBlock,
  TextBlock,
  ThinkingBlock as ThinkingBlockType,
  ToolResultBlock,
  ToolUseBlock,
} from "../types/chat";
import { cn } from "../utils/cn";
import { ChatBubble } from "./chat-bubble";
import { ChatLoadingDots } from "./chat-loading-dots";
import { ThinkingBlock } from "./thinking-block";
import { ToolCallCard } from "./tool-call-card";

const chatThread = tv({
  slots: {
    root: "relative flex min-h-0 flex-1 flex-col",
    viewport: "flex flex-1 flex-col overflow-y-auto",
    list: "flex flex-col gap-[4px] pt-[12px] pr-[16px] pb-[12px] pl-[20px]",
    empty: [
      "flex flex-1 items-center justify-center text-center",
      "text-[14px] p-[24px] text-[color:var(--pds-label-assistive)]",
    ],
    assistantText: [
      "max-w-[100%] break-words",
      "text-[14px] leading-[22px] text-[color:var(--pds-label-normal)]",
    ],
    assistantWrapper: "flex flex-col items-start pl-[4px]",
  },
});

type ChatThreadProps = {
  messages: ChatMessage[];
  emptyState?: React.ReactNode;
  loadingDots?: boolean;
  renderMarkdown?: (text: string) => React.ReactNode;
  renderToolCall?: (toolUse: ToolUseBlock, toolResult?: ToolResultBlock) => React.ReactNode;
  renderThinking?: (block: ThinkingBlockType, phase?: ChatStatusPhase) => React.ReactNode;
  renderUserBubble?: (message: ChatMessage) => React.ReactNode;
  renderAssistantActions?: (message: ChatMessage) => React.ReactNode;
  className?: string;
  viewportRef?: React.Ref<HTMLDivElement>;
};

function toBlocks(content: ChatMessage["content"]): ContentBlock[] {
  if (typeof content === "string") {
    const textBlock: TextBlock = { type: "text", text: content };
    return [textBlock];
  }
  return content;
}

function collectToolResults(messages: ChatMessage[]): Map<string, ToolResultBlock> {
  const map = new Map<string, ToolResultBlock>();
  for (const message of messages) {
    if (typeof message.content === "string") continue;
    for (const block of message.content) {
      if (block.type === "tool_result") {
        map.set(block.tool_use_id, block);
      }
    }
  }
  return map;
}

const ChatThread = React.forwardRef<HTMLDivElement, ChatThreadProps>(function ChatThread(
  {
    messages,
    emptyState,
    loadingDots = false,
    renderMarkdown,
    renderToolCall,
    renderThinking,
    renderUserBubble,
    renderAssistantActions,
    className,
    viewportRef,
  },
  ref,
) {
  const styles = chatThread();
  const toolResultMap = React.useMemo(() => collectToolResults(messages), [messages]);

  if (messages.length === 0) {
    return (
      <div ref={ref} data-slot="chat-thread" className={cn(styles.root(), className)}>
        <div className={styles.viewport()} ref={viewportRef}>
          <div className={styles.empty()}>{emptyState ?? "메시지가 없습니다."}</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} data-slot="chat-thread" className={cn(styles.root(), className)}>
      <div ref={viewportRef} className={styles.viewport()}>
        <div className={styles.list()}>
          {messages.map((message) => {
            if (message.role === "user") {
              if (renderUserBubble) {
                return (
                  <React.Fragment key={message.id}>{renderUserBubble(message)}</React.Fragment>
                );
              }
              return <ChatBubble key={message.id} content={message.content} />;
            }

            const blocks = toBlocks(message.content);
            return (
              <div key={message.id} className={styles.assistantWrapper()} data-role="assistant">
                {blocks.map((block, blockIndex) => {
                  const blockKey = `${message.id}-${blockIndex}`;
                  if (block.type === "text") {
                    return (
                      <div key={blockKey} className={styles.assistantText()}>
                        {renderMarkdown ? renderMarkdown(block.text) : <pre>{block.text}</pre>}
                      </div>
                    );
                  }
                  if (block.type === "thinking") {
                    if (renderThinking)
                      return (
                        <React.Fragment key={blockKey}>{renderThinking(block)}</React.Fragment>
                      );
                    return (
                      <ThinkingBlock
                        key={blockKey}
                        thinking={block.thinking}
                        renderMarkdown={renderMarkdown}
                      />
                    );
                  }
                  if (block.type === "tool_use") {
                    const toolResult = toolResultMap.get(block.id);
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
                {renderAssistantActions ? renderAssistantActions(message) : null}
              </div>
            );
          })}
          {loadingDots ? <ChatLoadingDots /> : null}
        </div>
      </div>
    </div>
  );
});

export type { ChatThreadProps };
export { ChatThread, chatThread };
