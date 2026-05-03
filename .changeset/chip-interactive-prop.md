---
"@fluxloop-ai/pds-ui": minor
---

**Chip: 기본 렌더 요소를 `<span>` 으로 변경, `<button>` 은 `interactive` 옵트인. (Behavior change)**

`trailingContent` 에 닫기 버튼(`<button>`)을 둘 때 button-in-button 으로 hydration 에러가 나던 문제를 잡기 위해 Chip 의 기본 렌더 요소를 `<button>` → `<span>` 으로 변경.

### 변경

- `interactive` prop 추가 (`boolean`, 기본 `false`)
  - `false` (기본): `<span>` 으로 렌더. `disabled` 는 `aria-disabled` 로 노출, `aria-pressed` 미연결
  - `true`: `<button>` 으로 렌더 + `type` / `disabled` / `aria-pressed` 연결 (이전 동작)
- `cursor: pointer` 는 `data-interactive=true` 일 때만 적용
- 기존 클릭 가능한 Chip 사용처는 `interactive` 를 추가해야 동일 동작 (자동 분기 없음)

### 마이그레이션

```diff
- <Chip onClick={fn}>토글</Chip>
+ <Chip interactive onClick={fn}>토글</Chip>

- <Chip active onClick={fn}>선택됨</Chip>
+ <Chip interactive active onClick={fn}>선택됨</Chip>

  // 제거 버튼 패턴은 이제 그대로 동작 (Chip 이 span 이라 nested button 없음)
  <Chip trailingContent={<RemoveButton />}>React</Chip>
```
