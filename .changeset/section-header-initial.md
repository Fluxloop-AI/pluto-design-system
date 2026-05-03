---
"@fluxloop-ai/pds-ui": minor
---

**SectionHeader — 섹션 진입을 표시하는 1라인 row 헤더 추가.**

`<SectionHeader>` + `headingContent` / `trailingContent` 두 슬롯 모델. Montage `section-header` 의 row 패턴(타이틀 + 우측 보조 슬롯 + 우측 끝 액션 슬롯)을 PDS 토큰 위에 이식.

- **사이즈 4단계** (`xs` / `sm` / `md` / `lg`) — 각각 `text-label1` / `text-headline1` / `text-heading1` / `text-title2` bold. `xs` 만 `label-alternative` 컬러(사이드바 그룹 라벨 용도), 나머지는 `label-strong`.
- **슬롯 정렬** — `align-items: center`. row 전체 높이 = max(slot heights). Montage 는 baseline 을 쓰지만, 한글 타이틀 + Chip/Button 조합에서 어긋나 보이는 케이스가 있어 PDS 는 center 로 통일.
- **타이틀 ↔ headingContent gap 은 사이즈별 차등** (xs `4` / sm·md `6` / lg `8`). 한 덩어리로 읽히도록 의도적으로 타이트하게.
- **`not-prose` 자동 적용** — MDX `.prose` 컨테이너 안에서도 내부 `<h2>` 가 prose 의 margin 영향을 받지 않도록 root 에 박혀있다.
- **`headingAs` 폴리모픽** — `h1`~`h6` 시맨틱 태그 선택.
- **`color` override** — root 색만 바꾸고 자식은 inherit. 슬롯 안의 `IconButton` / `TextButton` 등은 자체 variant 색을 유지(헤더 색에 강제 동기화하지 않음).
- **의도적으로 미포함**: ① `platform` prop (PDS 는 desktop-first 단일 밀도) ② `SectionHeader.Navigation` 페이지네이터 서브(추후 별도 `Pagination` 컴포넌트로) ③ eyebrow + 타이틀 + 설명 수직 적층 패턴(별도 페이지 헤더 컴포넌트로 분리 예정).
