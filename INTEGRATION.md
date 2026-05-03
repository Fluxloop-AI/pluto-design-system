# PDS 운영 모델 — 다른 레포에서 PDS를 어떻게 쓰고, 어떻게 업데이트하는가

이 문서는 **소비자 레포 입장**에서 PDS를 도입·유지하는 방법, 그리고 **메인테이너 입장**에서 변경이 어떻게 흘러가는지를 설명한다.

요약: PDS는 **하이브리드 배포**다. 패키지 종류에 따라 소비 방식과 업데이트 절차가 다르다.

---

## 1. 두 가지 배포 채널

| 패키지 | 배포 방식 | 소비자 입장 |
|---|---|---|
| `@fluxloop-ai/pds-core` | **npm 패키지** (GitHub Packages) | `pnpm add` 후 `import` |
| `@fluxloop-ai/pds-icons` | **npm 패키지** (GitHub Packages) | `pnpm add` 후 `import` |
| `@fluxloop-ai/pds-ui` | **shadcn 레지스트리** (소스 복사) | `npx shadcn add` 로 파일을 소비자 레포에 복붙 |

### 왜 둘로 나눠 놨나

- **core / icons** 는 한 번 정해지면 거의 안 바뀌는 인프라(토큰 · CSS · 아이콘) → 의존성으로 잠가두고 한꺼번에 업데이트하는 게 깔끔.
- **ui** 는 컴포넌트 — 앱마다 살짝씩 다른 인터랙션 · 스타일 요구가 생긴다. shadcn 모델은 "복사해서 그 자리에서 고친다"가 핵심. 그래서 변형 자유도가 필요한 컴포넌트는 의존성으로 잠그지 않고 소스로 푼다.

---

## 2. 소비자 레포가 PDS를 도입하는 절차

### (A) 인증 — `.npmrc` 한 번 세팅

GitHub Packages 는 비공개 레지스트리라 토큰이 필요. 소비자 레포에:

```ini
# .npmrc (소비자 레포 루트)
@fluxloop-ai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

각 개발자는 로컬 `~/.npmrc` 또는 환경변수 `GITHUB_TOKEN` 으로 자기 PAT(Personal Access Token, `read:packages` scope)를 주입. CI 에서는 `secrets.GITHUB_TOKEN` 을 그대로 쓰면 된다.

### (B) core / icons 설치

```bash
pnpm add @fluxloop-ai/pds-core @fluxloop-ai/pds-icons
```

앱 루트 CSS 한 줄:

```css
/* app/globals.css 같은 데 */
@import "@fluxloop-ai/pds-core/styles";
```

이걸 import 하면 토큰(`--pds-color-*`, `--pds-spacing-*`, `--pds-motion-*` 등) · Pretendard · 기본 스타일이 한 번에 들어온다.

Tailwind 설정에 preset:

```ts
// tailwind.config.ts
import { plutoPreset } from "@fluxloop-ai/pds-core/tailwind-preset";

export default {
  presets: [plutoPreset],
  // ...
};
```

아이콘:

```tsx
import { Plus, ArrowRight } from "@fluxloop-ai/pds-icons/icons";

<Plus size={16} />
```

### (C) ui 컴포넌트 설치 (필요한 것만)

```bash
npx shadcn add https://pds.pluto.com/r/button
npx shadcn add https://pds.pluto.com/r/dialog
npx shadcn add https://pds.pluto.com/r/chat-bubble
```

이게 하는 일: PDS 레포의 `packages/pds-ui/src/components/button.tsx` 를 **너의 레포 안의 `components/ui/button.tsx` 로 복사**. 의존성이 아니다. 이후 그 파일은 소비자 레포가 소유 — 마음대로 수정 가능.

```tsx
// 사용
import { Button } from "@/components/ui/button";

<Button variant="solid" size="md">저장</Button>
```

### (D) 한 번 더 정리하면

```
소비자 레포
├── .npmrc                                    # 1회 세팅
├── package.json
│   └── deps: @fluxloop-ai/pds-core, /pds-icons    ← 잠긴 의존성
├── app/globals.css
│   └── @import "@fluxloop-ai/pds-core/styles"     ← 토큰 진입점
├── components/ui/                            ← shadcn 으로 복사된 PDS-UI 컴포넌트
│   ├── button.tsx
│   ├── dialog.tsx
│   └── ...
└── tailwind.config.ts
    └── presets: [plutoPreset]
```

---

## 3. 업데이트 — 두 채널이 다르게 동작

### core / icons 업데이트 (자동 / 잠금)

PDS 레포에 변경 → Changesets 가 버전 bump → publish → 소비자 레포에서:

```bash
pnpm update @fluxloop-ai/pds-core @fluxloop-ai/pds-icons
```

또는 `pnpm outdated` 로 확인. semver 따라 자동 호환. 토큰 값이 변하거나 새 토큰이 추가되면 그게 다음 빌드부터 반영된다. **소비자가 수정하지 않은 영역**이라 충돌 없음.

### ui 업데이트 (수동 / 명시적)

shadcn 모델은 **자동 업데이트가 없다**. 컴포넌트는 이미 소비자 레포의 일부니까 PDS 가 변경됐는지 모른다. 두 가지 길:

1. **재실행해서 덮어쓰기** (소비자가 수정 안 했을 때)
   ```bash
   npx shadcn add https://pds.pluto.com/r/button --overwrite
   ```
   해당 파일이 최신 PDS 소스로 교체된다.

2. **수동 머지** (소비자가 컴포넌트를 수정해서 살짝 갈라졌을 때)
   - PDS 레포의 새 버전 소스를 보고 변경분만 골라 적용.
   - 또는 `git diff` 로 비교해서 cherry-pick.

#### Tradeoff

- **자유도**: 컴포넌트별로 변형 · 삭제 · 확장 가능 (앱마다 다른 요구 흡수).
- **부담**: 업데이트가 명시적 → 누락되기 쉬움. PDS 변경 공지를 잘 받아야 한다.

이 부담을 줄이려고 보통:
- PDS 가 changelog (`CHANGELOG.md`) + GitHub Release 로 변경분을 명시적으로 공지.
- 소비자 앱들은 주기적으로 (예: 스프린트 시작 때) 의도적인 "PDS sync" 시간을 따로 잡는다.

---

## 4. 변경이 PDS 안에서 흘러가는 경로 (메인테이너 시점)

```
1. PDS 레포에서 컴포넌트 / 토큰 수정 (예: Button.tsx)
2. PR 만들 때 `pnpm changeset` 으로 변경 종류 기록 (major/minor/patch)
3. PR 머지 → main push
4. release.yml 발동
   → Changesets 가 누적된 changeset 들을 모아 "Release PR" 자동 생성
     (이 PR 안에 version bump + CHANGELOG 업데이트가 들어있음)
5. 메인테이너가 Release PR 검토 후 머지
6. release.yml 다시 발동
   → core/icons 는 GitHub Packages 에 publish
   → ui 는 registry.json 이 갱신되어 shadcn 으로 항상 최신을 받게 됨
   → GitHub Release 자동 생성
7. 소비자 레포들이 변경분을 본다
   → core/icons 는 `pnpm update` 로 받음
   → ui 는 필요한 컴포넌트만 `npx shadcn add ... --overwrite` 로 받음
```

**핵심**: PDS 메인테이너는 changeset 만 신경 쓰면 된다. 버전 매기기 · publish · 태그 · changelog 는 모두 워크플로우가 한다.

---

## 5. 실무에서 자주 나오는 질문들

**Q. 소비자가 PDS-UI 컴포넌트를 고쳐서 쓰고 싶을 때**
→ 그게 바로 shadcn 모델의 의도. 복사된 파일은 그 레포 소유라 마음대로 수정. 단 PDS 자체에 반영하고 싶다면 PR 을 PDS 레포로 올려야 한다.

**Q. 토큰 값이 바뀌었는데 컴포넌트 코드는 그대로일 때**
→ core 만 업데이트하면 된다. 컴포넌트는 `var(--pds-*)` 만 참조하니까 자동으로 새 값 따라간다.

**Q. PDS 가 0.x 면 잦은 breaking change 가 있을 텐데**
→ 그래서 0.x 동안은 소비자 앱이 PDS 버전을 핀(`^0.1.0` 이 아닌 `~0.1.0` 또는 정확한 버전)으로 잠그는 것도 옵션. 1.0 이후엔 semver 로 안전. README 에 명시한 이유.

**Q. 앱이 두 개 이상이면 동기화는 어떻게**
→ 모든 앱이 같은 changelog 를 보고 같은 타이밍에 sync. PDS 가 메인 채널(GitHub Release / Slack 알림 등) 으로 공지하면 된다. 강제할 도구는 없음 (의도적). 앱별로 PDS 버전 다르게 가져갈 수 있는 게 단점이자 장점.

---

## 6. 정리

| 측면 | core / icons | ui |
|---|---|---|
| 배포 | GitHub Packages npm | shadcn 레지스트리 |
| 설치 | `pnpm add` | `npx shadcn add <url>` |
| 위치 | `node_modules/` | 소비자 레포의 `components/ui/` |
| 수정 | ❌ (잠긴 의존성) | ✅ (소비자 소유) |
| 업데이트 | `pnpm update` | `--overwrite` 재실행 / 수동 머지 |
| semver | 따른다 | 따르지만 강제력 없음 (소스 복사라서) |

도입 비용은 낮다 (`.npmrc` 한 번 + `pnpm add`). 운영 비용은 ui 채널의 명시적 sync 가 핵심 — 이걸 의식적으로 짜면 두 앱 이상에서도 PDS 가 깔끔하게 굴러간다.
