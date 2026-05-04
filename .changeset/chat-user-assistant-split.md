---
"@fluxloop-ai/pds-ui": minor
---

`ChatBubble` 을 `ChatUserMessage` 로 리네임하고, 어시스턴트 응답을 `ChatAssistantMessage` 로 분리.

PDS 채팅 모델은 user 는 풍선, assistant 는 풍선 없이 본문만 — 이 비대칭이 컴포넌트 구조에는 반영돼 있지 않아서 user 만 컴포넌트로 빠지고 assistant 는 `ChatThread` 내부 인라인 JSX 였다. role 축으로 짝을 맞춰 둘 다 단독 컴포넌트로 정리.

- `ChatUserMessage` (구 `ChatBubble`) — 사용자 메시지 풍선. text/image 블록, onError fallback.
  - 풍선 radius `8px → 10px`, 첨부 이미지 radius `6px → 8px` (한 단계 상향).
- `ChatAssistantMessage` (신규) — 풍선 없는 어시스턴트 응답. text/thinking/tool_use 블록 처리, `renderMarkdown` / `renderToolCall` / `renderThinking` / `actions` slot, `toolResults: Map<string, ToolResultBlock>` prop.
- `ChatThread` 는 role 분기 dispatcher 로 단순화.

Breaking: `ChatBubble`, `chatBubble`, `ChatBubbleProps` export 제거. import 경로 `@fluxloop-ai/pds-ui/components/chat-bubble` → `chat-user-message`.
