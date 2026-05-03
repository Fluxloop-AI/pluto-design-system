---
"@fluxloop-ai/pds-ui": minor
---

**Badge — API 재설계.**

이전 5플랫 컬러(`neutral|accent|positive|cautionary|negative`) 구조와 임의 사이즈/alpha 매핑을 정리하고, foreground 토큰 선택형 API로 환원.

### API 변경 (Breaking)

- `color` 축소: `neutral | accent`. 기본값 `accent`.
- `accentColor` 추가 — `color=accent` 일 때 foreground 토큰 선택. 기본값 `cyan`.
  - 값: `red | red-orange | orange | lime | green | cyan | light-blue | blue | violet | purple | pink | positive | cautionary | negative`
- `neutralColor` 추가 — `color=neutral` 일 때 label 토큰 선택. 기본값 `alternative`.
  - 값: `normal | strong | neutral | alternative | assistive | disable`

기존 `<Badge color="positive">` → `<Badge color="accent" accentColor="positive">` 로 마이그레이션.

### 사이즈

| | xs | sm | md |
|---|---|---|---|
| padding | 3px 6px | 4px 6px | 5px 8px |
| radius | 8 | 8 | 10 |
| font / lh | 11 / 14 | 12 / 16 | 13 / 18 |
| gap | 2 | 4 | 4 |
| svg | 12 | 14 | 14 |

`width: fit-content; height: fit-content` — 고정 h 제거.

### 컬러 매핑

런타임에 `--pds-badge-color` 커스텀 프로퍼티로 선택 토큰을 주입, Tailwind는 단일 클래스로 참조.

- `solid` accent: bg = `var(--pds-badge-color) @ 8%`
- `solid` neutral: bg = `--pds-fill-normal`
- `outlined` accent: bg = `--pds-background-normal-normal`, border = `var(--pds-badge-color) @ 43%`
- `outlined` neutral: bg = white, border = `--pds-line-normal-normal`
- text(전 variant): `var(--pds-badge-color)`
