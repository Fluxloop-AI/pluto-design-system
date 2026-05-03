---
"@fluxloop-ai/pds-ui": patch
---

`Separator` vertical 높이를 `h-full` → `h-[1em]` 으로 변경.

부모에 명시적 `height` 가 없어도 현재 `font-size` 기준 1em 길이로 자연스럽게 그려지도록 함. 기존에는 부모가 명시 높이를 갖지 않으면 0으로 무너지던 문제 해결.
