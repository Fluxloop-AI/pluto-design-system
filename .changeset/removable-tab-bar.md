---
"@fluxloop-ai/pds-ui": minor
---

**`ChatTabBar` → `RemovableTabBar` 로 일반화. nav 카테고리로 이동 + `size` variant 도입.**

chat 세션뿐 아니라 노트 등 다른 워크스페이스에서도 동적으로 열고 닫는 탭이 필요해져, AI/Agent Chat 카테고리 전용이던 `ChatTabBar` 를 navigation 컴포넌트로 일반화한다.

- 신규: `RemovableTabBar`, `removableTabBar`, `RemovableTab`, `RemovableTabBarProps`, `RemovableTabBarSize` (`@fluxloop-ai/pds-ui/components/removable-tab-bar`).
- 제거: `ChatTabBar`, `chatTabBar`, `ChatTab`, `ChatTabBarProps` (`@fluxloop-ai/pds-ui/components/chat-tab-bar`). 사용처는 `RemovableTabBar` 로 교체.
- `size` prop 추가: `sm` (기존 ChatTabBar — 24h, 12px) / `md` (32h, 14px).
- width 가 컨텐츠 가변으로 변경 (sm 60–140, md 80–200). 이전 `ChatTabBar` 는 80px 고정이었음.
- 닫기 버튼·radius·padding 등은 사이즈에 비례.
