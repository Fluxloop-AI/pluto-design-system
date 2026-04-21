"use client";

import { ChatThread } from "@fluxloop-ai/pds-ui/components/chat-thread";
import type { ChatMessage } from "@fluxloop-ai/pds-ui/types";

const CONVERSATION: ChatMessage[] = [
  { id: "u1", role: "user", content: "PDS 의 기본 색상 토큰이 뭐야?" },
  {
    id: "a1",
    role: "assistant",
    content: [
      {
        type: "text",
        text: "주요 semantic 토큰은 `--pds-primary-normal`, `--pds-label-normal`, `--pds-fill-normal` 입니다.",
      },
    ],
  },
  { id: "u2", role: "user", content: "src/app.ts 읽고 요약해줘." },
  {
    id: "a2",
    role: "assistant",
    content: [
      {
        type: "thinking",
        thinking: "파일을 먼저 읽어야 한다. read 툴 호출.",
      },
      {
        type: "tool_use",
        id: "call_1",
        name: "read",
        input: { file_path: "/src/app.ts" },
      },
    ],
  },
  {
    id: "u3",
    role: "user",
    content: [
      {
        type: "tool_result",
        tool_use_id: "call_1",
        content: "export function main() { return 0; }",
      },
    ],
  },
  {
    id: "a3",
    role: "assistant",
    content: [{ type: "text", text: "main 함수 하나로 0을 반환합니다." }],
  },
];

export function ChatThreadDemo() {
  return (
    <div className="pds-chat-demo-card">
      <ChatThread
        messages={CONVERSATION}
        renderMarkdown={(text) => <span className="whitespace-pre-wrap">{text}</span>}
      />
      <Styles />
    </div>
  );
}

export function ChatThreadEmptyDemo() {
  return (
    <div className="pds-chat-demo-card pds-chat-demo-card-short">
      <ChatThread messages={[]} />
      <Styles />
    </div>
  );
}

export function ChatThreadLoadingDemo() {
  const messages: ChatMessage[] = [
    { id: "u1", role: "user", content: "리액트 컴포넌트 하나 보여줘." },
  ];
  return (
    <div className="pds-chat-demo-card pds-chat-demo-card-short">
      <ChatThread messages={messages} loadingDots />
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-chat-demo-card {
        display: flex;
        flex-direction: column;
        height: 420px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
        overflow: hidden;
      }
      .pds-chat-demo-card-short {
        height: 200px;
      }
    `}</style>
  );
}
