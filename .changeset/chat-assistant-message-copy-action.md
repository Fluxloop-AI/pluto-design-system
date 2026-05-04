---
"@fluxloop-ai/pds-ui": minor
---

`ChatAssistantMessage` 에 hover-reveal 복사 버튼 내장.

- 응답 하단 좌측에 복사 버튼이 기본 노출. 메시지 행 호버 / 포커스 시 fade-in (`opacity-0 → 100`), `ChatUserMessage` 와 동일 패턴.
- 클릭하면 클립보드에 텍스트 저장 + 1.5s 동안 아이콘이 `Copy → Check` 로 스왑, 툴팁도 "복사 → 복사됨" 으로 변경 후 복귀.
- 텍스트 블록만 join (`thinking`, `tool_use` 블록은 스킵). 텍스트가 비어있으면 복사 버튼 자체를 안 그림.
- `showCopy={false}` 로 비활성화, `actions` 슬롯은 기본 복사 버튼과 함께 노출 (override 아닌 append).
- 두 메시지 컴포넌트가 동일 동작을 공유하도록 `ChatCopyButton` / `extractCopyText` 를 `components/internal/` 으로 분리.
