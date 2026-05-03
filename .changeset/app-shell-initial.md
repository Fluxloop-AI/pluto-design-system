---
"@fluxloop-ai/pds-ui": minor
---

**AppShell — 데스크탑 앱(Tauri/macOS Overlay)의 3-패널 레이아웃 셸 추가.**

`<AppShell>` + `<AppShellSidebar>` (back layer) + `<AppShellMain>` / `<AppShellSidePanel>` (foreground card) + `<AppShellSplitter>` 컴포넌트군. 각 패널은 자체 헤더/바디(/푸터) 슬롯을 갖는다.

- **레이어 모델**: 사이드바는 회색 *back layer*, Main+SidePanel 은 흰 *foreground card*. 사용자가 prop 으로 지정하지 않고 *컴포넌트 종류 자체*에 의미가 박혀있다.
- **모서리 라운딩 자동**: foreground card 는 background layer 와 만나는 모서리만 둥글게 (`rounded-l-12`). 윈도우 가장자리 쪽은 OS squircle 이 처리하므로 PDS 가 신경쓰지 않음.
- **Titlebar inset 자동 분배**: `leftInset` / `rightInset` 을 `<AppShell>` 에 주입하면 *현재 열려있는* 좌/우 끝 패널의 헤더에만 자동 적용. 사이드바를 닫으면 Main 헤더가 leftInset 흡수.
- **상태 모델 (Radix 식)**: `open` / `width` 둘 다 controlled+uncontrolled 양쪽 지원 (`defaultOpen`, `defaultWidth` / `open`, `width` + `onOpenChange`, `onWidthChange`). 단축키, URL 동기화, 패널 간 연동 가능.
- **닫힘 동작**: `open={false}` 시 width 0 으로만 줄어들고 DOM·내부 상태(스크롤·입력값) 보존.
- **Splitter**: 명시적 (`target="sidebar" | "sidePanel"`). `doubleClickResetWidth` 옵션. 대상 패널 닫힘/`resizable={false}` 시 자동 비활성.
- **Floating controls overlay**: `<AppShellLeadingControls>` / `<AppShellTrailingControls>` — titlebar 영역에 absolute 로 떠있는 슬롯. 패널 상태와 무관하게 같은 좌표에 머물러야 하는 사이드바 토글 등에 사용. `leftInset`/`rightInset` 만큼 자동 들여 배치, 컨테이너는 pointer-events pass-through.
- **Tauri 결합 분리**: PDS 는 OS 감지·트래픽 라이트·드래그 동작을 떠안지 않음. 제품이 Tauri API 로 OS 보고 inset 값 주입하는 경계 유지. `data-tauri-drag-region` 만 헤더에 자동 표식.

내부 의도 (이름 자체가 layer 를 박는 컨벤션, 자동 라운딩/inset 룰) 는 `apps/docs/content/docs/components/app-shell.mdx` 에 *Design Intent* 절로 박아두었다 — 향후 새 패널 컴포넌트 추가 시 같은 컨벤션을 따르도록.
