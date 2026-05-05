---
"@fluxloop-ai/pds-core": patch
"@fluxloop-ai/pds-ui": patch
---

**`SidebarMenu` — selected 진입 시 아이콘 1회 pop 모션 추가.**

`pds-core` 에 `@keyframes pds-icon-pop` + `.pds-animate-icon-pop` 유틸을 추가하고, `SidebarMenu` 항목이 selected 가 될 때 아이콘에 1회 적용한다. 회전 -12deg → +5deg(overshoot) → 0deg + scale 0.88 → 1.06 → 1, `--pds-duration-slow` / `--pds-ease-out`. 책이 비스듬히 탁 자리 잡는 느낌.

`prefers-reduced-motion: reduce` 환경에서는 다른 PDS 모션과 동일하게 비활성화된다. `regular → fill` weight 전환은 종전과 동일.
