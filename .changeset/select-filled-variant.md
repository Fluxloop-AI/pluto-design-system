---
"@fluxloop-ai/pds-ui": minor
---

**Select — `filled` variant 추가.**

`SelectTrigger`에 `variant` prop 추가. 기본값 `outlined`(기존 동작).

- `outlined`: 1px inset border + transparent 배경 (기존)
- `filled`: 무테 + `--pds-fill-normal` grey 배경, hover/open 시 `--pds-fill-strong`로 한 단계 어두워짐

focus-visible / aria-invalid ring과 disabled 처리는 두 variant 공통.
