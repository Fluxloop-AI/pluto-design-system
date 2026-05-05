---
"@fluxloop-ai/pds-ui": minor
---

**`ActionCard` 신규 추가 — 제목 + 설명에 좌/우 슬롯이 붙는 클릭 가능한 카드.**

`ActionCard`, `ActionCardLeading`, `ActionCardTitle`, `ActionCardDescription`, `ActionCardTrailing` 5 개로 구성된 flat compound. Suggestion / prompt 카드, permission · option toggle row 등 큰 면적의 액션 표면에 사용.

- 기본 `<button type="button">`, `asChild` 로 `<a>` 등 polymorphic
- Leading / Trailing 은 두 행 span, Title / Description 은 가운데 컬럼 두 행. CSS Grid `auto · minmax(0,1fr) · auto` 3-컬럼
- 슬롯 간 간격은 column-gap 대신 Leading/Trailing 자체 margin 으로 만들어, 슬롯 미사용 시 빈 공간이 생기지 않음
- `ActionCardTitle` 의 `icon` prop 으로 title 좌측 inline 아이콘(20px) 정렬
- `variant` 3 종: `outlined` (기본, border 1px + 투명 bg) / `filled` (border 없음 + bg fill) / `ghost` (border·bg 모두 없음, hover 시에만 fill). 모든 variant 의 hover transition 단계는 PDS fill 스케일 (`alternative` < `normal`) 을 따름
- radius 12px, padding 14×16px
