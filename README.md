# Pluto Design System (PDS)

The Pluto 앱의 **단일 UI 소스**. 토큰 · 프리미티브 · AI 친화 컴포넌트가 하나의 체계로 묶인 모노레포.

- **코드가 SSOT** — Figma는 역생성으로 유지
- **macOS-first, Windows-ready** — Electron 37+ 대상 최적화
- **AI 친화** — Claude / Cursor 가 읽고 수정하기 쉬운 구조
- **Stack** — Tailwind v4 + Radix UI + `tailwind-variants`, React 19

## 상태

**Pre-1.0.** 0.x 동안은 breaking change 가 자유롭게 들어옵니다. 1.0 이전까지는 마이너 단위 차이도 깨지는 변경을 포함할 수 있습니다. 마이너 릴리즈는 아래 표에 기록합니다.

| 버전 | 날짜 | 요약 |
| --- | --- | --- |
| `0.1.0` | 2026-05-05 | 첫 공개 — 토큰 7 카테고리(color · typography · spacing · radius · shadow · z-index · motion), 컴포넌트 8 그룹(Primitives · Actions · Form · Layout · Navigation · Overlays · Feedback · AI/Agent Chat), `pds-markdown` chat 슬롯 렌더러 동봉 |

## 패키지 구성

| 패키지 | 역할 | 배포 |
| --- | --- | --- |
| [`@fluxloop-ai/pds-core`](packages/pds-core) | 토큰(`@theme`), Tailwind preset, Pretendard, motion | GitHub Packages (npm) |
| [`@fluxloop-ai/pds-ui`](packages/pds-ui) | Radix + Tailwind 컴포넌트 (소스 노출) | shadcn 레지스트리 |
| [`@fluxloop-ai/pds-icons`](packages/pds-icons) | phosphor 래퍼 + PDS 네이티브 아이콘 + 브랜드 아이콘 | GitHub Packages (npm) |
| [`@fluxloop-ai/pds-markdown`](packages/pds-markdown) | chat 슬롯용 markdown 렌더러 (react-markdown + remark-gfm) | GitHub Packages (npm) |

## 설치 (앱 레포)

> 비공개 GitHub Packages 레지스트리에서 배포됩니다. 소비자 레포의 `.npmrc` 가 필요합니다.

```ini
# .npmrc
@fluxloop-ai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
# 토큰 · 아이콘 · markdown (npm 으로 설치)
pnpm add @fluxloop-ai/pds-core @fluxloop-ai/pds-icons @fluxloop-ai/pds-markdown

# 컴포넌트 (shadcn 으로 소스 복사)
npx shadcn add https://pds-docs.vercel.app/r/button
```

앱 루트 CSS 에 토큰 연결:

```css
@import "@fluxloop-ai/pds-core/styles";
```

> 소비자 레포에서 PDS 를 도입 · 유지하는 자세한 절차(인증 · 업데이트 흐름 · tradeoff · FAQ)는 [`INTEGRATION.md`](./INTEGRATION.md) 참조.

## 문서 (카탈로그)

`apps/docs` 가 PDS 의 **컴포넌트 · 토큰 카탈로그**입니다.
[fumadocs](https://fumadocs.vercel.app/) (Next.js 15) 기반이고, 다음 영역으로 구성됩니다.

| 경로 | 내용 |
| --- | --- |
| `/` | 홈 — PDS 개요 |
| `/docs/foundations/*` | 컬러 · 타이포 · 간격 · 라디우스 · 그림자 · 모션 · z-index 토큰 가이드 |
| `/docs/components/*` | 컴포넌트별 사용법 · variant · slot · 코드 예시 |
| `/docs/patterns/*` | 컴포넌트 조합 가이드 (chat · sidebar 등) |
| `/docs/examples/*` | 화면 단위 데모 |

로컬 실행:

```bash
pnpm install
pnpm --filter docs dev
# → http://localhost:3000
```

> 0.1.1 부터 Vercel preview 도메인(`https://pds-docs.vercel.app`)에서 docs + shadcn registry 가 호스팅됩니다. 커스텀 도메인은 후속.

## 개발

이 모노레포는 [pnpm](https://pnpm.io) + [Turborepo](https://turbo.build/repo) 기반입니다.

```bash
pnpm install        # 의존성 설치
pnpm build          # 모든 패키지 빌드
pnpm typecheck      # 타입 체크
pnpm lint           # Biome 린트
pnpm dev            # docs 앱 + watch 빌드
```

요구 조건:

- Node.js `>= 22.11.0`
- pnpm `10.6.5` (`packageManager` 필드로 고정)

### 변경사항 기록

PR 단위로 [Changesets](https://github.com/changesets/changesets) 를 사용합니다.
사용자 영향 변경이 있으면 PR 에 changeset 을 첨부:

```bash
pnpm changeset
```

`major` / `minor` / `patch` 중 선택 → 짧은 요약 작성. 누적된 changeset 은 머지 시점에 Release PR 로 자동 묶여 다음 버전에 반영됩니다.

## 라이선스

UNLICENSED — Fluxloop AI 내부 사용 전용. 외부 배포 · 재공개 금지.
