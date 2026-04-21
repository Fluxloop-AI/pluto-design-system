---
"@fluxloop-ai/pds-ui": minor
---

**PDS Phase 5a — Foundation Primitives 5개 추가.**

### pds-ui (신규)

- `Popover` — `@radix-ui/react-popover` 기반. `size: sm|md|lg` × `variant: normal|custom`. `PopoverHeader` / `PopoverTitle` / `PopoverDescription` / `PopoverBody` / `PopoverActionArea` / `PopoverClose` / `PopoverArrow` 슬롯.
- `Spinner` — 순수 SVG. `size: sm|md|lg` (16/20/28px), `currentColor` 상속, `prefers-reduced-motion` 지원.
- `Badge` — `variant: solid|outlined` × `size: xs|sm|md` × `color: neutral|accent|positive|cautionary|negative`. `leadingContent` / `trailingContent` 슬롯. (Montage `ContentBadge` 환원)
- `Tag` — `variant: solid|outlined` × `size: xs|sm|md|lg`. `pressed`(aria-pressed 연결) 토글, `onRemove`(sibling 버튼) 지원, `asChild` 폴리모픽. (Montage `Chip` 환원)
- `Progress` — `@radix-ui/react-progress` 기반. `value: number | null`(null=indeterminate), `size: sm|md` 트랙.

### Breaking changes

없음. 기존 Phase 1~3 컴포넌트 API 불변.
