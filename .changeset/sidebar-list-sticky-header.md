---
"@fluxloop-ai/pds-ui": minor
---

**`SidebarList` — `stickyHeader` prop 추가.**

`stickyHeader={true}` 시 섹션 헤더(타이틀 + count + actions)를 부모 스크롤 컨테이너 상단에 `position: sticky; top: 0` 로 고정한다. 항목 수가 많아 사이드바가 세로 스크롤될 때 섹션 헤더가 따라 올라가지 않고 그 자리에 머물게 하기 위함. 부모가 `overflow-y-auto` 일 때만 의미가 있다.

- 기본값 `false` — 기존 사용처 시각 변화 없음.
- 헤더 배경은 sticky 상태에서 사이드바 back-layer 토큰(`--pds-background-normal-alternative`, fallback `--pds-fill-normal`)으로 자동 채워서 스크롤되는 항목이 헤더 뒤로 비치지 않게 한다.
- 헤더 하단 spacing 을 `mb-4px` → `pb-4px` (with `box-content`) 로 변경. 마진은 sticky 상태에서 배경이 비어 항목이 그 사이로 보이는 문제가 있어 패딩으로 흡수.
