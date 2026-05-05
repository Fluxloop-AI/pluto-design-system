---
"@fluxloop-ai/pds-ui": minor
---

**`Panel` 컴포넌트 추가 — bordered cell grid layout primitive.**

외곽선·radius·hairline 디바이더만 책임지는 cell grid 박스. spirit-distiller 의 metadata strip / chart panel grid / sectioned stack 같은 "외곽선 + 셀 분할" 패턴을 단일 primitive 로 흡수.

- `Panel` (`columns: number`) — CSS Grid 균등 분할 컨테이너. 자식 셀이 좌→우 채워지고 columns 단위로 자동 wrap.
- `PanelCell` — 셀 단위. `span?: number` (CSS Grid `grid-column: span N`), `title?: string`, `icon?: PhosphorIcon` 헤더 슬롯. 헤더는 옵셔널이라 icon-only / label-only / 둘 다 / 헤더 없음 모두 지원.
- 시각: `1px var(--pds-line-normal-alternative)` 외곽선·디바이더, `rounded-[16px]`, 셀 padding `20px` 사방 고정.
- 디바이더는 grid `gap: 1px` + root background 가 line color 로 비치는 방식 — 셀 수·`span` 변화에 무관하게 동작 (nth-child 계산 불필요).
- 외부 섹션 타이틀 / 우상단 보조 meta 슬롯 미포함 — 박스 책임만 분리. 외곽 헤더가 필요하면 `SectionHeader` 가 위에 얹힘.
