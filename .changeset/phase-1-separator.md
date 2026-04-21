---
"@fluxloop-ai/pds-ui": minor
"@fluxloop-ai/pds-core": minor
"@fluxloop-ai/pds-icons": minor
---

**PDS v0.1 — Phase 1 Tier 1 기본 위젯 10개 이식 완료.**

Wanted Montage 구조를 뼈대로, Radix headless + Tailwind v4 + `tailwind-variants` 로 번역·개량.

### pds-ui (신규)

- `Separator` — Radix Separator, `--pds-line-*` 토큰, orientation/color/thickness
- `Avatar` — Radix Avatar, 8단계 size (xs~4xl), person/company/academy
- `Icon` — phosphor 래퍼 + pds-icons 슬롯, size(xs~xl) + semantic color
- `Button` — 4 variant (primary/secondary/ghost/danger) × sm/md/lg, leading/trailing, loading, asChild
- `Input` — 9 slot TextField, invalid/positive/disabled/readOnly, reset 버튼, leading/trailing/trailingButton
- `Tooltip` — Radix Tooltip, size(sm/md), shortcut slot, mode(hover/always/click)
- `DropdownMenu` — Item/CheckboxItem/RadioItem/Sub/Shortcut/Label/Separator
- `Dialog` — popup/full × sm/md/lg/xl × fixed/free, Navigation/Body/ActionArea slots (bottom variant 제외)
- `Toast` — info/success/warning/error, Radix Toast 기반
- `ScrollArea` — Radix ScrollArea + macOS 얇은 스크롤바 hover-expand

### pds-icons

- `tsup` config: `splitting: false` — Next.js 번들러의 `export *` 재노출 안정화

### 레지스트리

- `packages/pds-ui/registry.json` — shadcn registry items 11개 (`utils` + 10 컴포넌트)
- 소비: `npx shadcn add https://pds.pluto.com/r/{component}`

### 도구

- `packages/pds-ui/src/utils/cn.ts` — clsx + tailwind-merge v3
- 공통 deps: `@radix-ui/react-*`, `tailwind-variants`, `clsx`, `tailwind-merge@^3`, `@phosphor-icons/react`

### 문서

- `apps/docs` — Components 섹션 신설, 10개 MDX + live demo
- `apps/docs/app/global.css` — `@source` directive 로 pds-ui Tailwind 스캐닝
