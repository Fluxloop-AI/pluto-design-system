---
"@fluxloop-ai/pds-ui": minor
---

**`useScrollFade` — `edges` 옵션 추가.**

특정 가장자리의 페이드를 강제로 끌 수 있는 `edges?: { top?: boolean; bottom?: boolean }` 옵션 추가. 미지정 시 기존 동작(양쪽 자동) 그대로.

용도: sticky 헤더처럼 스크롤 컨테이너 *상단을 덮는 요소* 가 있을 때 상단 페이드를 끄지 않으면 sticky 요소 자체가 흐려져 보이는 문제. `edges: { top: false }` 로 해결.

```tsx
useScrollFade({
  size: 24,
  edges: { top: false }, // sticky 헤더가 상단 덮음
});
```

`isScrolledFromTop` / `isScrolledFromBottom` 측정값 자체는 옵션과 무관하게 그대로 반환된다 (다른 UI 토글에 쓸 수 있게).
