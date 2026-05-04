---
"@fluxloop-ai/pds-ui": minor
"@fluxloop-ai/pds-core": patch
---

**ChatProcessTrace — thinking·tool 호출·중간 멘트를 한 접힘 컨테이너로 묶는 process-trace 컴포넌트 추가.**

Anthropic Messages API 의 `thinking` · `tool_use` · `tool_result` · 중간 `text` 블록을 시간순으로 받아 단일 collapsible 로 표시한다. 최종 답변(`text`) 블록은 trace 외부에서 `ChatAssistantMessage` 등으로 분리.

- **항상 접힘** 기본. 진행 중에도 자동 펼침 없음. 사용자 클릭으로만 펼침.
- **Trigger 라벨**: `Thinking` (shimmer) → `Thought for {duration}` 단일 슬롯. 도구 사용 여부와 무관하게 동일 문구.
- **Tool row 단위**: 1 `tool_use` = 1 row. 같은 도구 연속 호출이어도 묶지 않음.
- **빌트인 도구 라벨 매핑**: bash, text_editor / str_replace_editor / str_replace_based_edit_tool, web_search, code_execution 4종을 PDS 가 알아서 영어 라벨 생성. MCP / 커스텀 도구는 `resolveToolLabel(name, input)` resolver 로 override.
- **카테고리 아이콘**: 옵션. `resolveToolIcon` 미주입 시 아이콘 생략. 도구별 1:1 매핑이 아니라 카테고리 단위로 묶기를 권장.
- **Failed row**: `tool_result.is_error === true` 일 때 row 우측에 작은 `failed` 칩.
- **redacted_thinking 미표시** (의도적).

pds-core 에서 텍스트 shimmer 용 `pds-text-shimmer` keyframe + `.pds-animate-text-shimmer` 유틸 추가 (`background-clip: text` 기반). 기존 `pds-shimmer` (skeleton background sweep) 와 별개. `prefers-reduced-motion` 시 정적 fallback.
