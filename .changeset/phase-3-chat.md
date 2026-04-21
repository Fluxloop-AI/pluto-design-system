---
"@fluxloop-ai/pds-ui": minor
"@fluxloop-ai/pds-core": patch
---

**PDS v0.3 — Phase 3 Tier 3 AI / Agent Chat 10개 이식 완료.**

pluto-note `apps/desktop/src/components/chat-panel/` 의 9개 소스를 Anthropic Messages API 계약의 controlled 컴포넌트로 이식. `@assistant-ui/react` · Zustand · `@pluto/wds-icon` 의존성 전면 제거.

### pds-ui (신규)

- `ChatLoadingDots` — 3-dot wave primitive, size(sm/md)
- `ChatStepDot` — phase(pending/running/complete/error/requires-action) 상태 도트, ripple
- `AgentStatusIndicator` — agent status 텍스트 라벨 + 스피너/도트 애니메이션
- `ChatBlock` — step-dot + 헤더 + 접힘 region (grid-template-rows 트릭)
- `ChatBubble` — user 메시지 풍선, text/image 블록 지원, onError fallback
- `ChatComposer` — 제어형 textarea, auto-grow, IME guard, streaming toggle, 3종 toolbar slot
- `ThinkingBlock` — running 자동 펼침 + duration 계산 + 1s 뒤 auto-close, `renderMarkdown` slot
- `ToolCodeBlock` — Request/Response 코드 블록, `renderCode` slot (shiki 의존성 0)
- `ToolCallCard` — tool_use/result 페어 카드, phase별 톤 분기, key-param 추출
- `ChatThread` — messages 배열 순회, tool_use ↔ tool_result 페어링
- `ChatTabBar` — controlled 대화 탭 바

### pds-ui 계약

- `@fluxloop-ai/pds-ui/types` 서브패스 신설 — `ChatMessage`, `ContentBlock`, `ChatStatusPhase`, `ChatAgentStatus` 공개
- Markdown / syntax highlighter 는 **slot 주입**으로 PDS 본체와 분리

### pds-core (토큰 추가)

- `--pds-chat-tone-error-bg`, `--pds-chat-tone-error-card-bg`, `--pds-chat-tone-caution-bg` — color-mix alpha 배경 (pluto-note 하드코딩 rgba 제거)
- `.pds-animate-dot-ripple` / `.pds-chat-collapsible` — keyframes.css 유틸 클래스

### 문서

- `apps/docs` — "AI / Agent Chat" 섹션 신설, 10개 MDX + live demo
- 각 페이지에 phase/size/streaming 토글 데모

### Breaking changes

없음. 기존 Phase 1 컴포넌트 API 그대로 유지.
