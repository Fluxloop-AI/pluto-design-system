---
"@fluxloop-ai/pds-ui": patch
"@fluxloop-ai/pds-core": patch
---

`ChatLoadingDots` 를 3-dot wave 에서 단일 점 pulse 로 변경하고 `size` prop 제거.

3-dot 메신저식 typing indicator 가 AI 어시스턴트 컨텍스트에서 올드하게 읽히는 문제 해결. 단일 점(8px)이 `scale 0.85↔1` + `opacity 0.5↔1` 로 호흡한다 (1.4s ease-in-out). 동일한 컴포넌트로 block placeholder · inline trailing 두 컨텍스트를 모두 커버하므로 `size` variant 는 불필요해 제거.

pds-core 에서는 `pds-dot-wave` keyframe / `.pds-animate-dot-wave` 유틸을 `pds-dot-pulse` / `.pds-animate-dot-pulse` 로 교체.
