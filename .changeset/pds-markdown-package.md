---
"@fluxloop-ai/pds-markdown": minor
"@fluxloop-ai/pds-ui": minor
---

신규 패키지 `@fluxloop-ai/pds-markdown` 추가, `ChatUserMessage` 에 `renderMarkdown` slot 추가.

채팅 메시지(user/assistant) 양쪽 모두 markdown 이 필요하지만 PDS 자체는 렌더러 의존을 가지지 않는다는 슬롯 패턴을 유지한다. 권장 구현체로 `react-markdown + remark-gfm` 기반 패키지를 별도로 제공.

- `@fluxloop-ai/pds-markdown` 신규 — `Markdown` 컴포넌트 + `renderMarkdown(text)` 헬퍼 export. ChatUser/Assistant 의 `renderMarkdown` slot 에 그대로 꽂아 쓰는 형태.
- `ChatUserMessage` 에 `renderMarkdown?: (text) => ReactNode` slot 추가. `ChatThread` 가 동일 함수를 user/assistant 양쪽에 패스스루.
- `ChatAssistantMessage` 의 `renderMarkdown` 미주입 폴백을 `<pre>` 에서 `whitespace-pre-wrap` plain text 로 변경 (user 와 톤 통일).
- 문서 신규: [Chat Markdown](/docs/components/chat-markdown) — 권장 패키지 설치·사용·보안·커스터마이즈 가이드.

분리 이유: chat 안 쓰는데 markdown 만 필요한 컨슈머가 `pds-ui` deps 그래프를 받지 않도록. `pds-icons` 가 `pds-ui` 와 분리된 것과 같은 원칙.
