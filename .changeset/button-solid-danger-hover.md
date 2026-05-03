---
"@fluxloop-ai/pds-ui": patch
---

**Button/IconButton — solid·danger 인터랙션 시각 보정.**

`hover:brightness-110 active:brightness-95` 가 사실상 무효였다. 브랜드 primary 가 cool-neutral-15(거의 검정)라 110% 밝기는 변화가 0.6% 수준으로 인지 불가, danger(red-50) 도 brightness 110% 는 톤이 빠지고 명도 변화가 작다.

- **Button solid / IconButton solid** — 검정 위에선 더 밝아지는 방향이 자연스러우므로 `color-mix(in srgb, var(--pds-primary-normal) 86%, white)` (hover) / `92%` (active) 로 white 를 섞음. (`--pds-primary-strong/heavy` 토큰은 cool-neutral 15 → 10 → 5 방향이라 거꾸로 더 어두워져 사용하지 않음.)
- **Button danger — 톤 자체를 soft 로 변경.** filled 빨강(white-on-red) 대신 light pink + red text 로 재정의. 파괴적 액션을 시각적으로 약하게 가져가서 일반 outlined 와 위계를 분리하면서도 빨강의 의미는 유지.
  - bg `var(--pds-color-red-95)`, text `var(--pds-accent-foreground-red)` (red-40, AA 대비)
  - hover `red-90` / active `red-80` 로 진해짐
- 더이상 의미 없는 `disabled:hover:brightness-100` 안전망 제거.
