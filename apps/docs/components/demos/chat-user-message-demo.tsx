"use client";

import { ChatUserMessage } from "@fluxloop-ai/pds-ui/components/chat-user-message";
import type { ContentBlock } from "@fluxloop-ai/pds-ui/types";
import { renderMarkdown } from "@fluxloop-ai/pds-markdown";

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

const MARKDOWN_TEXT = "이 코드 블록 `formatDate(d)` 안 돌아가는데 봐줄래?";

export function ChatUserMessageDemo() {
  return (
    <div className="pds-chat-demo-card">
      <ChatUserMessage content="안녕하세요. 오늘 날씨는 어떤가요?" />
      <ChatUserMessage content={MARKDOWN_TEXT} renderMarkdown={renderMarkdown} />
      <ChatUserMessage
        content={[{ type: "text", text: "아래 이미지 참고해주세요." }, IMAGE_BLOCK]}
      />
      <ChatUserMessage content={[BROKEN_IMAGE]} />
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
