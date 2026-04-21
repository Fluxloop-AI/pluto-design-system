---
"@fluxloop-ai/pds-ui": minor
---

**PDS Phase 5b — Form Controls + Glue 5개 추가.**

### pds-ui (신규)

- `Checkbox` — `@radix-ui/react-checkbox` 기반. `size: sm|md`, `indeterminate` boolean prop (내부에서 `checked="indeterminate"` 로 치환), `invalid` / `disabled` / `required`.
- `Switch` — `@radix-ui/react-switch` 기반. `size: sm|md`, thumb 이동 거리는 `--pds-switch-thumb-on` 로컬 CSS 변수로 인라인 세팅.
- `RadioGroup` + `RadioGroupItem` — `@radix-ui/react-radio-group` 기반. `size: sm|md`, `orientation: horizontal|vertical`, `loop` 기본 on. Montage 3-class → PDS 2-class 로 단순화.
- `Select` — `@radix-ui/react-select` 기반. Flat exports(`Select` / `SelectTrigger` / `SelectValue` / `SelectContent` / `SelectItem` / `SelectGroup` / `SelectLabel` / `SelectSeparator` / `SelectScrollUpButton` / `SelectScrollDownButton` / `SelectViewport` / `SelectItemIndicator` / `SelectItemText`). Trigger `size: sm|md|lg` + `invalid`, Input 과 동일한 토큰.
- `Form` 프리미티브 5종 — `FormField` + `FormLabel` + `FormControl` + `FormDescription` + `FormErrorMessage`. `useId()` 기반 id 4개(label/field/description/error) 를 context 로 공급, `FormControl` 은 `@radix-ui/react-slot` 으로 자식 control 에 `id`/`aria-labelledby`/`aria-describedby`/`aria-invalid` 주입. `invalid` 소유권은 control 쪽(Montage 와 동일).

### Breaking changes

없음. 기존 Phase 1~3 및 5a API 불변.
