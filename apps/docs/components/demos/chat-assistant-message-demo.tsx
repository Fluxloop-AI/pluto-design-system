"use client";

import { ChatAssistantMessage } from "@fluxloop-ai/pds-ui/components/chat-assistant-message";
import type { ContentBlock, ToolResultBlock } from "@fluxloop-ai/pds-ui/types";
import { renderMarkdown } from "@fluxloop-ai/pds-markdown";

const PLAIN_TEXT = `오늘 서울은 **맑음**, 최고기온 22°C 입니다.

- 미세먼지: 보통
- 자외선: 강함
- 추천: \`산책하기 좋은 날씨\``;

const WITH_TOOL_USE: ContentBlock[] = [
  { type: "text", text: "서울 날씨를 확인해볼게요." },
  {
    type: "tool_use",
    id: "tool_demo_1",
    name: "get_weather",
    input: { city: "Seoul", units: "metric" },
  },
  { type: "text", text: "맑음, **22°C** 로 외출하기 좋은 날씨예요." },
];

const TOOL_RESULTS = new Map<string, ToolResultBlock>([
  [
    "tool_demo_1",
    {
      type: "tool_result",
      tool_use_id: "tool_demo_1",
      content: [
        {
          type: "text",
          text: '{"city":"Seoul","temp_c":22,"condition":"clear","aqi":48}',
        },
      ],
    },
  ],
]);

export function ChatAssistantMessageDemo() {
  return (
    <div className="pds-chat-demo-card">
      <ChatAssistantMessage content={PLAIN_TEXT} renderMarkdown={renderMarkdown} />
      <ChatAssistantMessage
        content={WITH_TOOL_USE}
        toolResults={TOOL_RESULTS}
        renderMarkdown={renderMarkdown}
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
