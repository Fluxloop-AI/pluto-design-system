---
"@fluxloop-ai/pds-ui": minor
---

**ChatAssistantMessage — `loading` prop 추가.**

스트리밍 라이프사이클(dots → typing → done)을 한 컴포넌트로 통일. `loading` 이 true 면:

- 본문 끝(빈 본문이면 단독)에 `<ChatLoadingDots />` 가 inline 으로 붙는다 — text slot 의 `text-body2` 컨텍스트 안에 들어가므로 13px 로 정렬된다.
- `renderMarkdown` 은 자동으로 무시되고 `whitespace-pre-wrap` plain text 로 떨어진다 (미완성 마크다운 깨짐 방지).
- 기본 복사 버튼과 `actions` 가 모두 숨겨진다 (미완성 텍스트 복사·액션 차단).
- 루트에 `data-loading` 속성이 노출된다.

기존 사용처는 변경 없이 동작 (`loading` 미지정 시 false).
