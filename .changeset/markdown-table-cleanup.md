---
"@fluxloop-ai/pds-markdown": patch
"@fluxloop-ai/pds-ui": patch
---

마크다운 표 스타일 정리 + chat assistant 표 가로 스크롤 격리.

- `pds-markdown`: fumadocs `.prose` 컨텍스트에서 leak 되던 헤더 셀 배경(`var(--color-fd-muted)`) 명시적으로 transparent 로 reset. `:is(th, td)` 가 Lightning CSS 의 `:-webkit-any()` fallback emission 으로 의도치 않게 (0,2,0) specificity 가 돼 `thead th` border 를 덮어쓰는 문제를 `th, td` 분리 selector 로 해결. 마지막 `tbody` row 의 bottom border 제거 (표 맨 아래 outer line 사라짐). 헤더 아래 / row 사이 line 은 유지. 셀 `min-width: 120px` 추가 — 컬럼 squish 방지 + 채팅 폭보다 자연스럽게 넓어져 가로 스크롤 트리거.
- `pds-ui` `ChatAssistantMessage`: root / text slot 에 `w-full min-w-0` 추가. flex item 의 기본 `min-width: auto` 때문에 wide 테이블이 메시지 영역 자체를 부풀리던 문제 해결. 이제 메시지는 채팅 폭에 묶이고 표 영역(`.pds-markdown-table-scroll`) 안에서만 가로 스크롤.
