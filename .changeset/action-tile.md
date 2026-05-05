---
"@fluxloop-ai/pds-ui": minor
---

**`ActionTile` 신규 추가 — 세로 stack 타일형 클릭 카드 (가로 짧고 세로 긴 형태).**

3 영역 모델 — `Header` / `Content` / `Footer`. Grid 3-column 같은 화면 구성에서 카드 여러 개를 가로로 배치하는 용도.

영역
- `ActionTileHeader` — 옵션. 상단 free-form 박스. 메타 row / NEW pill / 카테고리 라벨 / kebab 등. 안의 element 분포는 호출부 자유. 기본 `flex flex-row items-center gap-[6px]`. 정렬은 `headerAlign` prop
- `ActionTileContent` — 의미 슬롯 묶음. `ActionTileLeading` (옵션) + `ActionTileTitle` (`startIcon` prop) + `ActionTileDescription` (옵션). 내부 typography 와 슬롯 간 간격은 컴포넌트 책임 (Leading→Title 8px, Title→Description 2px). 가로 정렬은 `contentAlign`
- `ActionTileFooter` — 옵션. 하단 free-form 박스. 동작은 Header 와 동일. 정렬은 `footerAlign`

Props
- `variant` — `outlined` (기본) / `filled` / `ghost`. `ActionCard` 와 토큰 동일
- `padding` — 카드 외곽 padding. `compact` (18/20/20) / `normal` (26/28/24, 기본) / `spacious` (36/38/28). top/bottom/horizontal
- `headerGap` — Header ↔ Content 간격. `tight` (4px) / `normal` (8px, 기본) / `wide` (12px). Header 없으면 무시
- `footerGap` — Content ↔ Footer 간격. 동일 토큰. Footer 없으면 무시
- `headerAlign` / `contentAlign` / `footerAlign` — 영역별 정렬. `start` (기본) / `center` / `end` / `between` (양 끝 분포). 영역마다 다르게 줄 수 있음
- `asChild` — polymorphic (`<a>` / `<Link>` 등으로 클릭 표면 교체)

`ActionCard` 와 공유: `variant` / focus ring / hover transition / asChild / radius 16px.

토큰 — radius 16px, padding 토큰 (compact 18/20/20 · normal 26/28/24 · spacious 36/38/28), Leading→Title 8px, Title→Description 2px, Header/Footer 내부 default gap 6px, headerGap/footerGap 토큰 4/8/12, 폭 `w-full` (부모 grid/flex 결정).
