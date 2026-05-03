---
"@fluxloop-ai/pds-ui": minor
---

**Radio — 시그니처 룩/halo/tight 도입, 그룹 레이아웃 제거.**

체크드 시각을 "흰 바탕 + 파랑 보더 + 파랑 dot" → "꽉 찬 `--pds-primary-normal` + 흰 inner dot" 으로 교체. 보더는 `border` 가 아닌 `inset box-shadow` 로 그려 체크 전후 레이아웃 흔들림을 제거하고, 외곽에 2px hit-area 패딩과 hover/press halo (`::before`) 를 추가.

### 사이즈

| | sm (구) | sm (new) | md (구) | md (new) |
|---|---|---|---|---|
| 외곽 hit-area | 16 | 16 | 20 | 20 |
| 내부 visible ring | 16 | 14 (pad 1) | 20 | 16 (pad 2) |
| inner dot (checked) | 8 | 5 | 10 | 6 |

외곽 hit-area 는 그대로 두고 내부 visible ring 만 hit-area 안쪽에 padding 만큼 들여 그립니다. dot 비율도 함께 축소.

### `RadioGroup` 레이아웃 제거 (Breaking)

`RadioGroup` 의 기본 `flex gap-[12px]` 와 `data-[orientation]` 기반 방향 분기가 모두 빠졌습니다. 그룹은 `role="radiogroup"` + 화살표 키 네비게이션만 담당하고, 시각 정렬은 컨슈머가 `style`/className 으로 직접 부여합니다.

```tsx
// Before
<RadioGroup orientation="horizontal">…</RadioGroup>

// After
<RadioGroup
  orientation="horizontal"
  style={{ display: "flex", flexDirection: "row", gap: 12 }}
>
  …
</RadioGroup>
```

권장 항목 간격: **최소 8px (4×n)**.

### 스타일 정리

- 체크 전: `--pds-background-elevated-normal` + `inset 0 0 0 1.5px --pds-line-normal-normal`
- 체크 후: `--pds-primary-normal` + 흰 dot (`--pds-color-common-100`)
- Halo: ring 외곽 4px 확장. hover `--pds-fill-normal`, active `--pds-fill-strong`.
- Focus: visible ring 에 `outline 2px var(--pds-focus-ring)` + offset 2px.
- Invalid: inset 라인 → `--pds-status-negative`.
- Disabled: `opacity: 0.43`, halo 숨김 (Switch/Checkbox 와 동일 톤).
- transition: `var(--pds-duration-fast) var(--pds-ease-standard)`.
