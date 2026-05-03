---
"@fluxloop-ai/pds-ui": minor
---

**Button을 3개로 분리 — Button / IconButton / TextButton.**

Montage(`/components/actions/{button,icon-button,text-button}`)의 분리 모델을 따라, 단일 Button 컴포넌트가 짊어지던 책임을 컨테이너 강도 기준으로 3개로 쪼갰다.

### 분리 기준 — 컨테이너

- **Button** — 배경 또는 테두리(컨테이너 있음). 라벨이 들어가는 액션 버튼.
- **IconButton** — 컨테이너 옵션 4단계. 텍스트 없이 아이콘만.
- **TextButton** — 컨테이너 없음. 글자만의 인터랙션.

### Button (변경)

- variant 5종 → 4종으로 정리:
  - `solid` (유지)
  - `primary` → **`outlined`** (실제로는 outline이라 이름 정정)
  - `secondary` → **`frosted`** (`backdrop-filter:blur(32px)` 톤이라 명시적으로 rename)
  - `ghost` 삭제 → TextButton으로 의미 이동
  - `danger` (유지)
- **`iconOnly` prop 삭제** → IconButton으로 이동
- default variant: `outlined` (이전 `primary`와 동일한 시각)
- size, fullWidth, loading, leadingContent/trailingContent, asChild — 모두 유지

### IconButton (신규)

```tsx
<IconButton variant="normal" size="md" aria-label="검색">
  <Icon icon={MagnifyingGlass} />
</IconButton>
```

- variant: `normal` / `background` / `outlined` / `solid` (4종)
- size: `sm`(24) · `md`(32) · `lg`(40), 정사각형
- children = 아이콘 1개 (필수). `aria-label` 권장
- asChild 지원

### TextButton (신규)

```tsx
<TextButton color="primary">더 보기</TextButton>
<TextButton color="assistive" trailingContent={<Icon icon={ArrowRight} />}>
  전체 보기
</TextButton>
```

- color: `primary` / `assistive`
- size: `sm`(13px) · `md`(14px)
- 컨테이너 없음 (배경/테두리 0). 옵션 leading/trailing 슬롯 + loading
- asChild 지원

### 기존 컴포넌트 유지

- **`CloseButton`** — 기존 20/24/28 스케일 유지 (IconButton의 24/32/40보다 작은 인라인 전용).
- **chat-composer 송신 버튼** — 24×24 원형 + label-normal 배경의 채팅 UI 관례 유지.

### 마이그레이션

PDS는 0.1.0 미릴리즈 상태이므로 외부 영향 없음. 내부 docs demo 일괄 정리:
- `<Button variant="primary">` → `<Button variant="outlined">`
- `<Button variant="secondary">` → `<Button variant="frosted">`
- `<Button iconOnly variant="ghost">` → `<IconButton variant="normal">`
