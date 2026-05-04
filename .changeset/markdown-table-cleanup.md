---
"@fluxloop-ai/pds-markdown": patch
"@fluxloop-ai/pds-ui": patch
---

마크다운 표 스타일 정리 + chat assistant 표 가로 스크롤 격리.

- `pds-markdown`: fumadocs `.prose` 컨텍스트에서 leak 되던 헤더 셀 배경(`var(--color-fd-muted)`) 명시적으로 transparent 로 reset. 마지막 `tbody` row 의 bottom border 제거 (표 맨 아래 outer line 사라짐). 헤더 아래 / row 사이 line 은 유지.
- `pds-ui` `ChatAssistantMessage`: root / text slot 에 `w-full min-w-0` 추가. flex item 의 기본 `min-width: auto` 때문에 wide 테이블이 메시지 영역 자체를 부풀리던 문제 해결. 이제 메시지는 채팅 폭에 묶이고 표 영역(`.pds-markdown-table-scroll`) 안에서만 가로 스크롤.
