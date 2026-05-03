---
"@fluxloop-ai/pds-ui": major
---

**Tag → Chip 으로 리네임 + Montage 스펙 정합화. (Breaking)**

기존 `Tag` 는 의미가 모호해 Montage 분류와 동일한 `Chip` 으로 정리. API 와 사이즈 스케일을 Montage 스펙에 맞춰 재구성.

### Breaking changes

- `Tag` / `tag` export 제거 → `Chip` / `chip` 사용
- import 경로: `@fluxloop-ai/pds-ui/components/tag` → `@fluxloop-ai/pds-ui/components/chip`
- `pressed` prop 제거 → `active` 사용 (`aria-pressed` 는 동일하게 출력)
- `onRemove` prop 제거 → `trailingContent` 자리에 직접 닫기 버튼 배치 (Montage 와 동일)
- 사이즈 키 변경: `xs/sm/md/lg` → `xsmall/small/medium/large` (Montage 동일)
- 기본 사이즈 명칭 `md` → `medium` (실제 치수도 변경됨, 아래 표 참고)

### 사이즈 스케일 (Montage 동일)

| size | radius | padding (y/x) | gap | text | icon |
|---|---|---|---|---|---|
| `xsmall` | 6px | 4 / 7 | 2 | caption1 (11px) | 12px |
| `small` | 8px | 6 / 8 | 2 | label1 (13px) | 14px |
| `medium` | 8px | 7 / 11 | 3 | body2 (13px) | 14px |
| `large` | 10px | 9 / 12 | 3 | body2 (13px) | 16px |

높이는 `padding + line-height` 로 결정 (Montage 와 동일하게 `height: fit-content`).

### Variant 색

- `solid`: bg `--pds-fill-alternative` → active 시 `--pds-inverse-background` / `--pds-inverse-label`
- `outlined`: 1px `--pds-line-normal-neutral` → active 시 `--pds-primary-normal` 5% 채움 + 43% 보더, 텍스트 `--pds-primary-normal`
- disabled: `--pds-label-disable` + (solid) `--pds-interaction-disable` / (outlined) 보더 유지

### 메타

- 카테고리 이동: Feedback → Actions (Montage 분류 일치)
