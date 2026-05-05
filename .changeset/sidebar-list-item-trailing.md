---
"@fluxloop-ai/pds-ui": minor
---

**`SidebarList` — 각 항목 우측에 hover-revealed trailing 슬롯 추가 (`renderItemTrailing`).**

`renderItemTrailing?: (item) => ReactNode` 으로 각 항목 우측에 액션을 꽂을 수 있다. 평소엔 숨김, **hover · keyboard focus(focus-within) · selected · 내부에 `[data-state=open]` 인 노드(예: 열린 `DropdownMenu` 트리거)가 있을 때** 노출된다. 전형 조합은 `DropdownMenu` + `IconButton(DotsThree)` 메뉴 트리거.

마크업/접근성 변경:

- 각 항목을 `<button>` → `<div role="button" tabIndex={0}>` + Enter/Space 핸들러로 변경. 진짜 `<button>` 안에 또 다른 인터랙티브 트리거(IconButton + DropdownMenu)를 넣는 nested-button 위반을 피하기 위함. `aria-current` / `data-selected` / focus-visible ring 동작은 그대로 유지.
- trailing 슬롯 영역의 `click` / `keydown` / `pointerdown` 은 내부에서 `stopPropagation` 되어 항목의 `onSelect` 를 트리거하지 않는다. consumer 쪽에서 별도로 막아줄 필요 없음.
- trailing 이 있는 항목은 `pr-[10px]` → `pr-[6px]` 로 살짝 조여 IconButton 의 시각적 가장자리 정렬을 맞춘다 (없는 항목은 종전 그대로).

기존 사용처는 prop 미지정 시 시각·동작 모두 동일.
