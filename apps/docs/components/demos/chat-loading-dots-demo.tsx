"use client";

import { ChatLoadingDots } from "@fluxloop-ai/pds-ui/components/chat-loading-dots";

export function ChatLoadingDotsDemo() {
  return (
    <div className="pds-chat-demo-card">
      <div className="pds-chat-demo-row">
        <ChatLoadingDots />
      </div>
      <div className="pds-chat-demo-row">
        <ChatLoadingDots size="sm" />
        <ChatLoadingDots size="md" />
      </div>
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
        gap: 12px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-chat-demo-row {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: center;
      }
    `}</style>
  );
}
