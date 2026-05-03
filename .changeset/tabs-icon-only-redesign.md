---
"@fluxloop-ai/pds-ui": major
---

**Tabs 를 icon-only segmented + 툴팁 내장 패턴으로 전면 교체. (Breaking)**

기존 underline + text label 스타일을 폐기하고, skilled prototype 의 `SkillTabBar` 패턴을 PDS Tabs 로 흡수. 시맨틱(navigation, Radix Tabs)은 동일, 비주얼만 교체.

### Breaking changes

- 트리거가 **icon-only** 로 전환. 텍스트 라벨은 더 이상 children 으로 받지 않고, `aria-label` 이 툴팁 + 스크린리더 라벨 역할을 동시에 수행
- `aria-label` 이 `TabsTrigger` 에 **필수 prop**
- `Tooltip` 이 `TabsTrigger` 내부에 자동으로 wrap. 부모 트리에 `TooltipProvider` 가 없어도 동작 (`Tabs` 가 자체 provider 를 둠)
- `size` prop 제거 — **24×24 단일 사이즈** (skilled prototype 의 22×22 + icon 16 → PDS spacing 정렬 24 + icon 18, 비율 0.73→0.75 유지)
- `resize` prop 제거 (`hug | fill`) — 사각 아이콘 버튼에서 fill 의미가 없음
- underline indicator 제거. selected 상태는 fill bg 로 표현
- `TabsTrigger` 가 자식 SVG 사이즈를 강제하므로 consumer 는 `<Icon>` 에 `size` 를 넘길 필요 없음

### 신규 prop

- `TabsTrigger.tooltipSide`: `top | bottom | left | right` (기본 `bottom`). vertical Tabs 에서는 `right` 권장.

### 토큰 매핑

| 속성 | 값 |
|---|---|
| trigger size | 24×24, 아이콘 18 |
| trigger radius | `--pds-radius-6` |
| 컨테이너 gap | `--spacing-2` |
| selected bg | `--pds-fill-strong` |
| selected text | `--pds-label-normal` |
| inactive text | `--pds-label-alternative` |
| hover bg | `--pds-fill-normal` |
| hover text | `--pds-label-neutral` |
| disabled text | `--pds-label-disable` |

### 시맨틱 분리

비주얼이 `SegmentedControl` 과 비슷해 보일 수 있으나 시맨틱이 다르므로 두 컴포넌트는 분리 유지:
- `Tabs` — 콘텐츠 패널 navigation (Radix Tabs, role=tab/tabpanel, arrow key)
- `SegmentedControl` — form field value 선택
