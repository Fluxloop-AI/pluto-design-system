---
"@fluxloop-ai/pds-ui": minor
---

**PageContainer — variant max-width 전반적으로 좁힘.**

- `narrow`: 720 → **640**
- `default`: 960 → **720**
- `wide`: 1200 → **960**
- `full`: 제한 없음 (변동 없음)

데스크탑 앱(Tauri/macOS Overlay) AppShell Main 영역에서 sidebar/sidepanel 까지 양쪽으로 빠지면 실제 사용 가능한 본문 폭이 좁다. 기존 960/1200 은 가독성 한계를 넘어 늘어졌고, sidepanel 을 동시에 켜면 wide(1200)는 사실상 capped 되어 의미가 없었다. 한 단계씩 당겨 *읽기 편한 폭* 쪽으로 정렬.

Migration: PageContainer 의 variant 명을 그대로 쓰고 있다면 max-width 만 줄어든다 — 페이지가 더 좁아짐. 기존 폭이 필요하면 한 단계 위 variant 로 옮기면 된다 (예: `default` → `wide`).
