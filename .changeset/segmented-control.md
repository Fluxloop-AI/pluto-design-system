---
"@fluxloop-ai/pds-ui": minor
---

**SegmentedControl — 신규 컴포넌트 추가.**

2-3지 단일 선택 인라인 컨트롤. 드롭다운형 `Select`와 인터랙션 모델이 다른 케이스(예: "인라인 / 분리됨", "대기열 추가 / 스티어링")를 위한 트랙 없는(track-less) 스타일.

### 스펙

- 베이스: `@radix-ui/react-radio-group` (단일 선택 의미와 키보드 내비게이션 그대로 사용).
- 사이즈: `sm` (`h-32 px-10 rounded-10 text-13`), `md` (`h-36 px-12 rounded-12 text-14`) — Button/Select와 동일 스케일.
- 톤: neutral 단일. 선택 pill `--pds-fill-normal` + `--pds-label-normal`, 미선택 텍스트 `--pds-label-assistive`, hover 시 `--pds-fill-alternative`.
- 너비: 기본 hug. `fullWidth` prop 시 컨테이너 채우며 segment 균등 분할.
- 콘텐츠: 텍스트 라벨만 (아이콘 슬롯은 향후 필요 시 확장).
- 애니메이션: 스냅 (배경 fade transition만).

### API

```tsx
<SegmentedControl size="sm" value={mode} onValueChange={setMode}>
  <SegmentedControlItem value="inline">인라인</SegmentedControlItem>
  <SegmentedControlItem value="split">분리됨</SegmentedControlItem>
</SegmentedControl>
```

Exports: `SegmentedControl`, `SegmentedControlItem`, `segmentedControl` (tv recipe).
