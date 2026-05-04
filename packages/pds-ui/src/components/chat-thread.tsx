"use client";

import * as React from "react";
import { tv } from "tailwind-variants";
import type {
  ChatMessage,
  ChatStatusPhase,
  ThinkingBlock as ThinkingBlockType,
  ToolResultBlock,
  ToolUseBlock,
} from "../types/chat";
import { cn } from "../utils/cn";
import { ChatAssistantMessage } from "./chat-assistant-message";
import { ChatLoadingDots } from "./chat-loading-dots";
import { ChatUserMessage } from "./chat-user-message";

const chatThread = tv({
  slots: {
    root: "relative flex min-h-0 flex-1 flex-col",
    viewport: "flex flex-1 flex-col overflow-y-auto",
    list: "flex flex-col gap-[4px] pt-[12px] pr-[16px] pb-[12px] pl-[20px]",
    empty: [
      "flex flex-1 items-center justify-center text-center",
      "text-[14px] p-[24px] text-[color:var(--pds-label-assistive)]",
    ],
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
              return (
                <ChatUserMessage
                  key={message.id}
                  content={message.content}
                  renderMarkdown={renderMarkdown}
                />
              );
            }

            return (
              <ChatAssistantMessage
                key={message.id}
                content={message.content}
                toolResults={toolResultMap}
                renderMarkdown={renderMarkdown}
                renderToolCall={renderToolCall}
                renderThinking={renderThinking}
                actions={renderAssistantActions ? renderAssistantActions(message) : undefined}
              />
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
