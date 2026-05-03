---
"@fluxloop-ai/pds-ui": minor
---

**Switch — 사이즈/스테이트 정합성 보정.**

트랙·thumb 비례를 다시 맞추고, off 트랙 색을 `--pds-fill-strong` 으로 환원. disabled 는 `opacity: 0.43` 으로 통일하고, 누름 탄성 효과(`:active` 시 thumb 가 padding 만큼 늘어남)를 추가.

### 사이즈 (Breaking)

기존 2단(sm/md) → 3단(sm/md/lg) 으로 확장. 기본값은 그대로 `md` 지만, **이전 `md` 가 새 `lg` 에 해당**.

| | sm (new) | md (구 sm) | lg (구 md) |
|---|---|---|---|
| track | 30×18 | 39×24 | 52×32 |
| thumb | 14 | 18 | 24 |
| padding | 2 | 3 | 4 |
| on translate | 12 | 15 | 20 |

마이그레이션: `<Switch size="md" />` → `<Switch size="lg" />`, `<Switch size="sm" />` → `<Switch size="md" />`.

### 스타일

- off track: `--pds-fill-strong`
- on track: `--pds-primary-normal`
- thumb: `--pds-color-common-100` (white) 고정
- transition: `200ms cubic-bezier(0.4, 0, 0.2, 1)` (transform + width + background-color)
- disabled: `opacity: 0.43`, `pointer-events: none`
