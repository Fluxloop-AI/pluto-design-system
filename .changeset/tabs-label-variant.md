---
"@fluxloop-ai/pds-ui": minor
---

**Tabs 에 `label` variant 추가.**

기존 `segmented` (icon-only) 옆에 텍스트 라벨 형태의 `label` variant 를 더해 페이지 상단의 섹션 스위처 같은 용도를 흡수. 시맨틱(Radix Tabs)은 동일, 시각만 분기.

### 신규 prop

- `Tabs.variant`: `segmented | label` (기본 `segmented`).
- `label` variant 의 `TabsTrigger` 는 children 자리에 텍스트를 직접 넣고, 툴팁은 띄우지 않음 (텍스트 자체가 라벨 역할). `aria-label` 이 옵셔널로 완화.

### 토큰 매핑 — label variant

| 속성 | 토큰 |
|---|---|
| trigger height | 28px |
| trigger padding | `--spacing-8` |
| trigger radius | `--pds-radius-10` |
| text | 13/18 (label1) |
| 컨테이너 gap | `--spacing-4` |
| selected bg | `--pds-fill-normal` |
| selected text | `--pds-label-normal` + `font-medium` |
| hover text | `--pds-label-normal` (배경 변화 없음) |

`segmented` 가 `--pds-fill-strong` (chip 톤) 인 데 비해 `label` 은 한 단계 옅은 `--pds-fill-normal` 을 써서 배경을 약하게 깔고 weight 변화를 함께 시그널.
