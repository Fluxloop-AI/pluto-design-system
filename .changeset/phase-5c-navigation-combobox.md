---
"@fluxloop-ai/pds-ui": minor
---

**PDS Phase 5c — Navigation + Compound 2개 추가 (Phase 5 완결).**

### pds-ui (신규)

- `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` — `@radix-ui/react-tabs` 기반. `size: sm|md|lg` × `resize: hug|fill`, `orientation: horizontal|vertical`, 활성 탭 밑줄 indicator. Montage 의 측정 기반 indicator 애니메이션 / auto scroll-into-view / iconButton trailing 은 범위 밖.
- `Combobox` 세트 — `cmdk` + `@radix-ui/react-popover` 를 PDS 공개 API(`Combobox` / `ComboboxTrigger` / `ComboboxContent` / `ComboboxInput` / `ComboboxList` / `ComboboxEmpty` / `ComboboxGroup` / `ComboboxItem` / `ComboboxSeparator`) 뒤로 완전히 래핑.
  - `value` / `onValueChange` / `inputValue` / `onInputValueChange` PDS 어휘 고정, `filter` passthrough, `disabled` 는 루트 `<fieldset>` 으로 적용.
  - 래핑 규율 5개(cmdk 재노출 금지, data-cmdk-* 공개 계약 제외 등)를 MDX 에 명문화.
  - 이전 트리거 3개(async 로딩 / 한글 composition 버그 / 대폭 필터 커스터마이즈) 명시.

### Phase 5 총 12개 컴포넌트 완결

Phase 5a (5) + Phase 5b (5) + Phase 5c (2) = 12 컴포넌트. 각 컴포넌트 5개 산출물(소스·MDX·demo·registry·changeset) 모두 갖춤. Tier 1 기존 컴포넌트 API 불변.

### Breaking changes

없음.
