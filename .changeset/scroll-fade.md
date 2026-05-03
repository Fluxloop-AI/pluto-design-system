---
"@fluxloop-ai/pds-ui": minor
---

**ScrollArea / useScrollFade: 스크롤 가장자리 그라디언트 fade 패턴 추가.**

스크롤 컨테이너 위·아래에 mask 그라디언트를 입혀 잘리는 가장자리를 부드럽게 처리하는 유틸을 추가. pluto-note Sidebar 에서 검증된 패턴을 PDS 로 끌어올림.

### 추가

- `useScrollFade<T>(options)` 훅 — 스크롤 위치를 측정해 위·아래 fade 를 자동 토글. `{ ref, onScroll, maskImage, isScrolledFromTop, isScrolledFromBottom }` 반환. 컨테이너 리사이즈는 `ResizeObserver` 로 따라감
- `getScrollFadeMask({ top, bottom, size })` 저수준 함수 — mask 문자열만 반환
- `ScrollArea` 에 viewport 직접 제어용 prop 추가:
  - `viewportStyle?: CSSProperties`
  - `viewportRef?: Ref<HTMLDivElement>`
  - `onViewportScroll?: UIEventHandler<HTMLDivElement>`

### 사용

```tsx
const { ref, onScroll, maskImage } = useScrollFade<HTMLDivElement>({ size: 40 });

<ScrollArea
  viewportRef={ref}
  onViewportScroll={onScroll}
  viewportStyle={{ maskImage, WebkitMaskImage: maskImage }}
>
  ...
</ScrollArea>
```

ScrollArea 가 아닌 임의 `overflow:auto` 컨테이너에도 동일하게 적용 가능.
