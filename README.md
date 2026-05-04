# Pluto Design System (PDS)

The Pluto 앱의 **단일 UI 소스**. 토큰 · 프리미티브 · AI 친화 컴포넌트가 하나의 체계로 묶인 모노레포.

- **코드가 SSOT** — Figma는 역생성으로 유지
- **macOS-first, Windows-ready** — Electron 37+ 대상 최적화
- **AI 친화** — Claude / Cursor 가 읽고 수정하기 쉬운 구조
- **Stack** — Tailwind v4 + Radix UI + `tailwind-variants`, React 19

## 상태

**Pre-release.** 첫 공개 버전은 `0.1.0` (Phase 1 + Phase 3 이식 완료, Phase 5 확장).
0.x 동안은 breaking change 가 자유롭게 들어옵니다. 1.0 이전까지는 마이너 단위 차이도 깨지는 변경을 포함할 수 있습니다.

> ### ⚠️ Experimental — AI / Agent Chat
>
> 다음 12개 컴포넌트는 **실험 단계**입니다. 1.0 이후 재설계가 예정되어 있어 API 가 자주 깨질 수 있습니다.
> 프로덕션 채택 전에 변경 이력을 반드시 확인하세요.
>
> `ChatBlock` · `ChatUserMessage` · `ChatAssistantMessage` · `ChatComposer` ·
> `ChatLoadingDots` · `ChatStepDot` · `ChatTabBar` · `ChatThread` ·
> `AgentStatusIndicator` · `ThinkingBlock` · `ToolCallCard` · `ToolCodeBlock`
>
> 그 외 컴포넌트는 stable 트랙입니다.

## 패키지 구성

| 패키지 | 역할 | 설치 |
| --- | --- | --- |
| [`@fluxloop-ai/pds-core`](packages/pds-core) | 토큰(`@theme`), Tailwind preset, Pretendard, motion | npm |
| [`@fluxloop-ai/pds-ui`](packages/pds-ui) | Radix + Tailwind 컴포넌트 (소스 노출, shadcn 레지스트리) | shadcn CLI |
| [`@fluxloop-ai/pds-icons`](packages/pds-icons) | phosphor 래퍼 + PDS 네이티브 아이콘 | npm |
| [`@fluxloop-ai/pds-markdown`](packages/pds-markdown) | chat 슬롯용 markdown 렌더러 (react-markdown + remark-gfm) | npm |

## 설치 (앱 레포)

> 비공개 GitHub Packages 레지스트리에서 배포됩니다. 소비자 레포의 `.npmrc` 가 필요합니다.

```ini
# .npmrc
@fluxloop-ai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
# 토큰 · 아이콘 (npm 으로 설치)
pnpm add @fluxloop-ai/pds-core @fluxloop-ai/pds-icons

# 컴포넌트 (shadcn 으로 소스 복사)
npx shadcn add https://pds.pluto.com/r/button
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
| `/preview/*` | 풀페이지 프리뷰 (예: `app-shell`) |

로컬 실행:

```bash
pnpm install
pnpm --filter docs dev
# → http://localhost:3000
```

> 사내 호스팅(Vercel 등)은 아직 연결되지 않았습니다. 현재는 각 개발자가 로컬에서 띄워 봅니다.

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
