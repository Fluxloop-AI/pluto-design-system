"use client";

import { ChatBubble } from "@fluxloop-ai/pds-ui/components/chat-bubble";
import type { ContentBlock } from "@fluxloop-ai/pds-ui/types";

const IMAGE_BLOCK: ContentBlock = {
  type: "image",
  source: {
    type: "url",
    url: "https://images.unsplash.com/photo-1558584724-1f19f41ce47f?w=320&auto=format&q=75",
  },
};

const BROKEN_IMAGE: ContentBlock = {
  type: "image",
  source: { type: "url", url: "https://example.invalid/nope.png" },
};

export function ChatBubbleDemo() {
  return (
    <div className="pds-chat-demo-card">
      <ChatBubble content="안녕하세요. 오늘 날씨는 어떤가요?" />
      <ChatBubble content={[{ type: "text", text: "아래 이미지 참고해주세요." }, IMAGE_BLOCK]} />
      <ChatBubble content={[BROKEN_IMAGE]} />
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
        gap: 16px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
