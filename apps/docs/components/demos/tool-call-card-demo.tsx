"use client";

import { ToolCallCard } from "@fluxloop-ai/pds-ui/components/tool-call-card";

export function ToolCallCardDemo() {
  return (
    <div className="pds-chat-demo-card">
      <ToolCallCard
        toolCallId="t1"
        toolName="read"
        args={{ file_path: "/src/components/button.tsx" }}
        result="export function Button() { return <button />; }"
      />
      <ToolCallCard
        toolCallId="t2"
        toolName="bash"
        args={{ command: "pnpm -w build" }}
        statusPhase="running"
      />
      <ToolCallCard
        toolCallId="t3"
        toolName="write"
        args={{ file_path: "/tmp/out.txt", content: "hello" }}
        result="Error: permission denied"
        isError
      />
      <ToolCallCard
        toolCallId="t4"
        toolName="edit"
        args={{ file_path: "/src/foo.ts" }}
        statusPhase="requires-action"
      />
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
        gap: 4px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
