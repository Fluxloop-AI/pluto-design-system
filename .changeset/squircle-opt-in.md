---
"@fluxloop-ai/pds-core": patch
---

`reset.css` 의 전역 `*` squircle 룰을 `[data-pds-squircle]` opt-in 으로 한정.

- 기존: 모든 요소에 `corner-shape: squircle` + `-electron-corner-smoothing` 이 적용돼 있었음. Electron 37+ 환경에서는 superellipse 곡선이 활성화돼 `rounded-full` 인 24×24 버튼이 완전한 원이 아니라 macOS 아이콘 모양(둥근 사각형) 으로 그려졌고, 브라우저에서는 이 속성들이 무시돼 표준 원으로 fallback — 같은 컴포넌트인데 데스크탑 앱과 docs/웹에서 모양이 달라지는 문제.
- 변경: squircle 은 `data-pds-squircle` 표식이 붙은 요소에만 적용. PDS 컴포넌트 어디에도 아직 표식을 부여하지 않았으므로 결과적으로 모든 표면이 표준 round 로 그려진다. 이게 의도된 단기 방향이고, 어느 표면(Card, Modal, Sheet 등) 이 다시 squircle 을 켤지는 후속 디자인 결정 라운드에서 정한다.
- 소비자 영향: published 0.1.1 에서 squircle 로 그려지던 모든 컨테이너·버튼이 표준 round 로 바뀐다. 별도 코드 변경은 필요 없음 — 패키지만 0.1.2 로 올리면 즉시 반영.
- 다시 squircle 을 켜고 싶다면: `<div data-pds-squircle className="...">` 처럼 명시적 opt-in.
