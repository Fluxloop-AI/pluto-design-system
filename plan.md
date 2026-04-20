# Pluto Design System (PDS) — 구축 계획서

**문서 목적**: PDS의 구축 방향·기술 결정·구현 Phase를 하나로 정리한 레퍼런스. 이후 모든 구현 작업은 이 문서를 기준으로 진행한다.

**최종 업데이트**: 2026-04-20 (Phase 0 Step 1 완료, 토큰 파일 구조 확정)
**소유**: The Pluto
**담당**: yoojungkim (프로덕트·디자인 총괄)

---

## 0. 한 장 요약

| 항목 | 결정 |
|---|---|
| 디자인 시스템 이름 | **Pluto Design System (PDS)** |
| 네임스페이스 | `@pluto/pds-*` |
| 1차 타겟 프로덕트 | **macOS 데스크탑 앱** (Electron 37+ 유력, Windows 포팅 2차) |
| CSS 프레임워크 | **Tailwind v4** (`@theme` 토큰) |
| 컴포넌트 동작 | **Radix UI** (headless) |
| 배포 방식 | **shadcn 하이브리드** — pds-core는 npm 패키지, pds-ui는 shadcn registry |
| 레포 구조 | **PDS 단독 모노레포** (pnpm + Turborepo) |
| 린트·포맷 | **Biome** |
| 카탈로그 | **Next.js 15 + MDX 커스텀 문서 사이트** |
| 배포 타겟 | **GitHub Packages (비공개)** + Changesets |
| 기본 폰트 | SF Pro (라틴) + **Pretendard 번들** (한글) |
| 기본 font-size | **14px** (데스크탑 밀도) |
| 브랜드 Primary | `#0066FF` (Montage `blue.50` 차용, 토큰 이름 고정 값 교체 가능) |
| 1차 MVP 범위 | **24개 컴포넌트** (Tier 1 10 + Tier 2 6 + Tier 3 8) |
| Figma 관계 | 코드 SSOT → Figma 역생성 (유저 직접 담당) |

---

## 1. 배경과 목표

### 1.1 왜 만드는가
- 회사 자체 디자인 시스템을 가져 **일관된 브랜드 경험·개발 속도·AI 친화 코드 생산**을 동시 달성
- Pluto 앱은 "데스크탑 AI 에이전트"가 본질이라, 일반 UI와 AI/Chat UI를 **하나의 토큰·컴포넌트 체계**로 다뤄야 함
- 기존 오픈소스 DS(MUI, Mantine, Wanted Montage 등)로는 브랜드 정체성 손실 또는 스택 불일치 발생

### 1.2 현재 자산
- Figma 디자인 시스템 파일: **없음**
- 스타일 적용된 목업 일부만 존재
- 과거 시도물: pluto-note 레포의 `@pluto/wds` (Montage 포크) → **버림**, 깨끗한 `@pluto/pds-*`로 재출발

### 1.3 레퍼런스 자산 (PDS 설계 시 참고)
| 레포 경로 | 역할 |
|---|---|
| `/Users/yoojungkim/Documents/skilled_plan` | 비주얼 방향 레퍼런스 (Tailwind v4, SF Pro, macOS 감각, figma-squircle, 14px base) |
| `/Users/yoojungkim/Documents/pluto-note` | Agent chat 컴포넌트 추출 대상 (ChatComposer, ThinkingBlock, ToolCallCard 등) |
| Wanted Montage (GitHub `wanteddev/montage-web`) | 토큰 구조·스케일·semantic 체계의 레퍼런스 |

### 1.4 핵심 원칙
1. **코드가 SSOT (Single Source of Truth)** — Figma·Storybook보다 코드 우선
2. **AI 친화** — AI(Claude/Cursor)가 읽고 수정하기 쉬운 구조 (CSS 토큰, MDX 문서, shadcn 파일 배포)
3. **macOS-first, Windows-ready** — 1차 완성도는 macOS, 구조는 Windows 폴백 고려
4. **토큰 이름은 불변, 값은 교체 가능** — 브랜드 변경 시 값만 갈아끼움
5. **Agent chat 영역은 반드시 pluto-note 실제 코드에서 추출** — 임의 디자인 금지

---

## 2. 기술 스택

### 2.1 확정 스택
```
Framework     : React 19
CSS           : Tailwind v4 (@theme 기반 토큰)
Primitives    : Radix UI (headless)
Component     : shadcn 방식 (파일 복사형 + PDS 자체 재작성)
빌드          : pds-core·pds-icons = tsup / pds-ui = 소스 노출
카탈로그       : Next.js 15 App Router + MDX
모노레포       : pnpm workspace + Turborepo
린트·포맷      : Biome
버전·릴리즈    : Changesets
배포          : GitHub Packages (비공개)
```

### 2.2 데스크탑 앱 런타임 가정
- **Electron 37+**가 1순위 (사용자 확률 크게 언급). PDS의 `-electron-corner-smoothing` 활용 설계
- Tauri로 변경 시 해당 CSS 줄 제거하고 `corner-shape: squircle`만 유지 (Safari WebKit 폴백 필요)

---

## 3. 레포 구조

```
pluto-design-system/                  (= PDS 독립 레포)
├── apps/
│   └── docs/                         (Next.js 15 + MDX 카탈로그)
├── packages/
│   ├── pds-core/                     (토큰 @theme + Tailwind preset + Pretendard + motion + utils)
│   ├── pds-ui/                       (컴포넌트 소스 — shadcn registry로 publish)
│   └── pds-icons/                    (SVG → React 아이콘)
├── .changeset/
├── .github/workflows/                (CI: 빌드·테스트·publish)
├── biome.json
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
└── plan.md                           (본 문서)
```

### 3.1 패키지 역할
- **`@pluto/pds-core`** — CSS 토큰(`@theme`), Tailwind preset, Pretendard 번들, motion keyframe, utility 함수. npm 패키지로 publish. 내부 구조는 §4.0 참고.
- **`@pluto/pds-ui`** — Radix + Tailwind 기반 컴포넌트 소스. shadcn registry로 publish (앱이 `npx shadcn add`로 복사).
- **`@pluto/pds-icons`** — PDS 전용 아이콘 + lucide-react 래퍼. npm 패키지.
- **`apps/docs`** — 문서 사이트. MDX + live component demo + token 시각화.

### 3.2 앱(별도 레포) 소비 경로
- **Phase 0~1 기간**: `pnpm link` 또는 `file:` 로 로컬 경로 연결 (빠른 피드백)
- **Phase 1 릴리스 이후**: GitHub Packages에서 설치
  ```
  # 앱 레포 .npmrc
  @pluto:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
  ```
  ```
  pnpm add @pluto/pds-core@^0.1
  npx shadcn add https://pds.pluto.com/r/button
  ```

---

## 4. Foundations 토큰

모든 토큰은 CSS 커스텀 프로퍼티로 정의되어 `@theme` 에 노출된다. 네이밍 규칙: `--pds-{category}-{variant}-{tone?}`.

### 4.0 토큰 파일 구조

`pds-core`의 CSS는 **카테고리별 파일로 분리**한다. 한 파일 = 한 주제. AI·사람 모두 수정 포인트가 명확하고, diff가 작아진다.

```
packages/pds-core/
├── src/
│   ├── styles/
│   │   ├── index.css               # 진입점 — 아래 파일들을 @import
│   │   ├── reset.css               # preflight 보강 + 전역 squircle (§4.5)
│   │   ├── fonts.css               # @font-face (Pretendard Variable)
│   │   ├── keyframes.css           # @keyframes pds-* (§4.8.4)
│   │   ├── theme.css               # @theme { ... } 래퍼 (tokens/* 를 취합)
│   │   └── tokens/
│   │       ├── color-primitive.css # 14 hue × 14단계 (§4.1.1)
│   │       ├── color-semantic.css  # primary / label / background / ... (§4.1.2)
│   │       ├── color-chat.css      # chat 특수 토큰 (§4.1.3)
│   │       ├── typography.css      # font stack / variant 스케일 / weight (§4.2)
│   │       ├── spacing.css         # (§4.3)
│   │       ├── radius.css          # (§4.4)
│   │       ├── shadow.css          # box-shadow + drop-shadow + glow (§4.6)
│   │       ├── zindex.css          # (§4.7)
│   │       └── motion.css          # duration + easing + transition 프리셋 (§4.8.1~3)
│   ├── fonts/
│   │   └── pretendard-variable.woff2
│   ├── motion/
│   │   └── variants.ts             # Framer Motion pdsStepIn / pdsCardIn ... (§4.8.5)
│   ├── utils/
│   │   └── cn.ts                   # clsx + tailwind-merge
│   ├── tailwind-preset.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

**규칙**
- 새 토큰 카테고리 = 새 파일. 한 파일이 200줄을 넘기 시작하면 다시 쪼갠다.
- `@theme` 는 `theme.css` 한 곳에서만 사용. 다른 파일은 순수 변수 선언만.
- 앱/문서 사이트는 `@pluto/pds-core/styles/index.css` 하나만 import 하면 전부 로드.
- 다크 모드 값(Phase 4)은 각 `tokens/*.css` 파일 내부에서 `[data-theme="dark"]` 블록으로 병행 선언.

### 4.1 색 (Color)

#### 4.1.1 Primitive (Atomic) 팔레트
Montage `wds-theme` 구조를 거의 그대로 채용. 14단계 스케일, 숫자는 명도(%).

```
단계: 10, 20, 30, 40, 45, 50, 55, 60, 65, 70, 80, 90, 95, 99
hue  : blue, neutral, coolNeutral, common, red, green, orange, violet,
       pink, cyan, lightBlue, redOrange, lime, purple
```

**이식 범위**: Montage 원본의 14 hue × 14단계 값을 **전부** `color-primitive.css` 에 이식한다. 예시/일부 차용이 아니라 완전 이식. 변수 이름만 `--wds-*` → `--pds-*`.

**Blue 예시 (현재 브랜드 차용)**
```
--pds-color-blue-10:  #001536
--pds-color-blue-45:  #005EEB
--pds-color-blue-50:  #0066FF   ★ 브랜드 primary (추후 값 교체 가능)
--pds-color-blue-70:  #69A5FF
--pds-color-blue-95:  #EAF2FE
...
```

**Neutral 예시**
```
--pds-color-neutral-10: #171717   ★ 본문 기본
--pds-color-neutral-40: #5C5C5C
--pds-color-neutral-99: #F7F7F7
...
```

> **Note**: 현재 `blue.50 = #0066FF`는 Wanted 브랜드와 동일. 추후 The Pluto 브랜드 확정 시 이 값만 교체하면 되며, 토큰 이름은 고정.

#### 4.1.2 Semantic 토큰
Montage 카테고리·계층 그대로, 변수명만 `--semantic-*` → `--pds-*`.

```
--pds-primary-{normal | strong | heavy}
--pds-label-{normal | strong | neutral | alternative | assistive | disable}
--pds-background-{normal | elevated | transparent}-{normal | alternative}
--pds-interaction-{inactive | disable}
--pds-line-{normal | solid}-{normal | neutral | alternative}
--pds-status-{positive | cautionary | negative}
--pds-accent-background-{redOrange | lime | cyan | lightBlue | violet | purple | pink}
--pds-accent-foreground-{red | redOrange | orange | lime | green | cyan | lightBlue | blue | violet | purple | pink}
--pds-inverse-{primary | background | label}
--pds-fill-{normal | strong | alternative}
--pds-material-dimmer
```

#### 4.1.3 Chat 특수 토큰 (별도 AI 카테고리는 만들지 않음)
```
--pds-chat-text-glow          (파란 글로우, blue.50 알파 45%)
--pds-chat-easing             cubic-bezier(0.23, 1, 0.32, 1)
--pds-chat-dot-idle           → alias semantic.label.assistive
--pds-chat-dot-done           → alias semantic.status.positive
--pds-chat-dot-error          → alias semantic.status.negative
--pds-chat-dot-action         → alias semantic.status.cautionary
```

#### 4.1.4 다크 모드
라이트/다크 이중 정의 구조는 지금 잡음(Montage 패턴). **1차 배포는 라이트 값만** 확정, 다크는 Phase 4 이후에 값 확정.

### 4.2 타이포그래피

#### 4.2.1 폰트 스택
```
--pds-font-sans:
  -apple-system, BlinkMacSystemFont,
  "SF Pro Text", "SF Pro Display",
  "Apple SD Gothic Neo",
  "Pretendard Variable", "Pretendard",
  "Segoe UI Variable", "Segoe UI",
  "Malgun Gothic",
  system-ui, sans-serif;

--pds-font-mono:
  "SF Mono", ui-monospace, "Menlo", "Monaco",
  "Cascadia Mono", "Consolas",
  monospace;
```

**Pretendard 번들 방식**: `@pluto/pds-core/fonts/pretendard-variable.woff2` 로 패키지에 포함. Electron/Tauri 오프라인에서 동작.

#### 4.2.2 Variant 스케일 (데스크탑 밀도, Montage 이름 호환)

| Variant | Size | Line | 비고 |
|---|---|---|---|
| display1 | 32 | 42 | 온보딩 웰컴 큰 타이틀 |
| title1 | 22 | 30 | 페이지 제목 |
| title2 | 18 | 26 | 섹션 제목 |
| title3 | 16 | 22 | 다이얼로그 제목 |
| heading1 | 15 | 22 | 카드 헤딩 |
| heading2 | 14 | 20 | 작은 카드 헤딩 |
| headline1 | 14 | 22 | 강조 헤드라인 |
| **body1** | **14** | **22** | **기본 본문 (default)** |
| body1-reading | 14 | 24 | 긴 아티클 |
| body2 | 13 | 20 | 보조 본문 |
| label1 | 13 | 18 | 폼 라벨 |
| label2 | 12 | 16 | 작은 라벨·버튼 |
| caption1 | 11 | 14 | 타임스탬프·메타 |
| caption2 | 10 | 13 | 각주 |
| code | 13 | 20 | 코드 (mono) |

**삭제**: display2, display3, headline2, body2-reading, label1-reading (데스크탑에서 희박)
**추가**: code (mono, chat 코드블록용)
**Letter-spacing**: Montage 공식 그대로 이식

#### 4.2.3 Weight
```
--pds-font-weight-regular:   400
--pds-font-weight-medium:    500
--pds-font-weight-semibold:  600
--pds-font-weight-bold:      700
```

### 4.3 스페이싱

Montage 20-step 그대로 명시 토큰. Tailwind v4 `@theme`에 전부 `--spacing-*`로 정의.

```
0, 0.5, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80 (px)
```

### 4.4 Radius

```
--pds-radius-none:  0
--pds-radius-xs:    2px
--pds-radius-sm:    4px
--pds-radius-md:    6px    ★ 기본
--pds-radius-lg:    8px
--pds-radius-xl:    12px
--pds-radius-2xl:   16px
--pds-radius-full:  9999px
```

### 4.5 Squircle (전역 모서리 스무딩)

PDS는 **모든 컴포넌트에 글로벌 squircle 적용**.

```css
:root {
  --pds-corner-smoothing: 0.6;
}
*, *::before, *::after {
  corner-shape: squircle;                                   /* Chromium 139+ 표준 */
  -electron-corner-smoothing: var(--pds-corner-smoothing);  /* Electron 37+ */
}
```

- **Electron 37+** 환경: `-electron-corner-smoothing`이 네이티브로 동작 (JS/런타임 비용 0)
- **웹 카탈로그 (Chromium)**: `corner-shape: squircle` 지원
- **Safari/Firefox (카탈로그 보조 브라우저)**: 표준 `border-radius`로 폴백 (시각 손실 용인)
- 표준 원형이 필요한 특수 컴포넌트는 `corner-shape: round` 오버라이드

### 4.6 Shadow (Elevation)

Montage 3계열 그대로 채용. 서로 다른 문제를 푸는 도구이므로 전부 필요.

```
/* (a) 일반 box-shadow — 사각 카드·버튼·다이얼로그 */
--pds-shadow-xs, --pds-shadow-sm, --pds-shadow-md, --pds-shadow-lg, --pds-shadow-xl

/* (b) filter: drop-shadow() — 비사각 모양(SVG, squircle 외곽, 팝오버 꼬리) */
--pds-drop-xs, --pds-drop-sm, --pds-drop-md, --pds-drop-lg, --pds-drop-xl

/* (c) ambient glow — 포커스 링, AI 글로우 */
--pds-glow-sm, --pds-glow-md
```

값은 Montage `elevation.shadow.{normal | drop | spread}` 그대로 이식.

### 4.7 Z-index

```
--pds-z-base:      0
--pds-z-dropdown:  1000
--pds-z-sticky:    1100
--pds-z-overlay:   1200
--pds-z-modal:     1300
--pds-z-popover:   1400
--pds-z-tooltip:   1500
--pds-z-toast:     1600
--pds-z-titlebar:  9000
```

### 4.8 Motion

#### 4.8.1 Duration
```
--pds-duration-instant:  80ms
--pds-duration-fast:     150ms
--pds-duration-normal:   200ms
--pds-duration-slow:     300ms
--pds-duration-slower:   450ms
--pds-duration-glow:     2000ms
```

#### 4.8.2 Easing
```
--pds-ease-linear:     linear
--pds-ease-standard:   cubic-bezier(0.23, 1, 0.32, 1)     ★ 기본 (pluto-note chat-easing)
--pds-ease-in:         cubic-bezier(0.4, 0, 1, 1)
--pds-ease-out:        cubic-bezier(0, 0, 0.2, 1)
--pds-ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1)
--pds-ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1)
```

#### 4.8.3 Transition 프리셋
```
--pds-transition-color
--pds-transition-bg
--pds-transition-transform
--pds-transition-opacity
--pds-transition-all
```

#### 4.8.4 Keyframe 프리셋 (pluto-note 승계)
```
@keyframes pds-fade-in-up        (메시지 step-in 6px)
@keyframes pds-fade-in-card      (카드 등장 10px)
@keyframes pds-fade-collapse     (섹션 접기)
@keyframes pds-dot-wave          (3-dot 로딩)
@keyframes pds-dot-ripple        (AI 상태 pulse)
@keyframes pds-text-glow         (스트리밍 텍스트 글로우, 2s 루프)
@keyframes pds-shimmer           (스켈레톤)
```

**유틸 클래스**
```
.pds-animate-step-in
.pds-animate-card-in
.pds-animate-glow
.pds-animate-dot-wave
```

#### 4.8.5 Framer Motion preset
`@pluto/pds-core/motion` 에서 `pdsStepIn`, `pdsCardIn` 등 variants export.

#### 4.8.6 접근성
`@media (prefers-reduced-motion: reduce)` 에서 모든 애니메이션 0.01ms로 단축 (pluto-note 패턴).

---

## 5. 컴포넌트 MVP

### 5.1 전체 24개 (Tier별)

#### Tier 1 — 기본 위젯 (10)
| # | 컴포넌트 | 출처 |
|---|---|---|
| 1 | Button (primary/secondary/ghost/danger + size) | shadcn 스캐폴드 + PDS 재작성 |
| 2 | Input (text field) | shadcn |
| 3 | Icon (lucide-react 래퍼 + PDS 아이콘) | 자체 |
| 4 | Dialog | Radix |
| 5 | DropdownMenu | Radix |
| 6 | Tooltip | Radix |
| 7 | Avatar | Radix |
| 8 | Toast / Sonner | shadcn |
| 9 | Separator | Radix |
| 10 | ScrollArea (macOS 감성 커스텀 스크롤바) | Radix |

#### Tier 2a — 앱 내부 크롬 (5)
| # | 컴포넌트 | 출처 |
|---|---|---|
| 11 | TrafficLights (macOS 닫기/최소화/확대) | skilled_plan |
| 12 | Titlebar (Electron `hiddenInset` 위 커스텀 타이틀바, drag region 포함) | 자체 |
| 13 | PanelHeader | skilled_plan |
| 14 | Splitter / ResizeHandle | skilled_plan |
| 15 | Sidebar + SidebarNavItem + SidebarSkillItem | skilled_plan |

#### Tier 2b — 웹 시뮬레이션 (1)
| # | 컴포넌트 | 출처 |
|---|---|---|
| 16 | MacWindow (웹 페이지 안의 스쿼클 윈도우 카드, 카탈로그/마케팅용) | skilled_plan |

#### Tier 3 — AI/Agent Chat (8) — pluto-note 이식
| # | 컴포넌트 | 출처 |
|---|---|---|
| 17 | ChatComposer (입력 + attachments + send) | pluto-note |
| 18 | ChatBubble (= ChatBlock, 메시지 말풍선) | pluto-note |
| 19 | ChatThread (스크롤 컨테이너) | pluto-note |
| 20 | ThinkingBlock (reasoning collapsible) | pluto-note |
| 21 | ToolCallCard + ToolCodeBlock | pluto-note |
| 22 | AgentStatusIndicator | pluto-note |
| 23 | ChatLoadingDots + ChatStepDot | pluto-note |
| 24 | ChatTabBar | pluto-note |

### 5.2 pluto-note 이식 4원칙
1. `@pluto/wds` + Mantine 의존성 **전부 제거**
2. Emotion `css` prop → **Tailwind class + PDS 토큰**으로 재작성
3. `--semantic-*` → `--pds-*` 변수명 치환
4. Radix UI 표준 패턴 + shadcn 스타일로 통일

### 5.3 Phase 구성 (시간 추정 없음)

```
Phase 0 — Bootstrap
  · 모노레포 + Turborepo + pnpm workspace + Biome
  · @pluto/pds-core (토큰 @theme, Tailwind preset, Pretendard, motion keyframes)
  · apps/docs 껍데기 (Next.js 15 + MDX)
  → PDS 작업 시작 가능

Phase 1 — Tier 1 기본 위젯 (PDS v0.1)
  · Button, Input, Icon, Dialog, DropdownMenu, Tooltip, Avatar, Toast, Separator, ScrollArea
  · 각 컴포넌트 MDX 문서 (live demo + variants)
  → 앱팀 선사용 가능 (GitHub Packages publish 시작)

Phase 2 — Tier 2a 데스크탑 크롬 (PDS v0.2)
  · TrafficLights, Titlebar, PanelHeader, Splitter, Sidebar (+nav/skill items)
  · Electron titlebar 연동 가이드 문서
  → 앱 1차 기본 레이아웃 가능

Phase 3 — Tier 3 AI/Agent Chat 이식 (PDS v0.3)
  · pluto-note에서 8개 컴포넌트 이식 + 리라이트
  · chat-animations/tailwind CSS를 PDS motion 토큰으로 재매핑
  → Pluto 앱 핵심 UI 완성

Phase 4 — Tier 2b + 문서 톤업 (PDS v1.0)
  · MacWindow
  · 토큰 시각화, 컴포넌트 변형 표, 접근성·사용 지침
  · 다크 모드 값 확정
  → 공식 1.0 릴리스

Phase 5+ — 확장 컴포넌트
  · Tabs, Select, Combobox, Checkbox, Switch, Radio, Tag, Badge, Progress,
    Spinner, Table, Accordion, Popover, Form primitives, Command palette
  · 앱 요구에 따라 우선순위대로
```

---

## 6. 빌드 & 배포

### 6.1 패키지별 빌드
- **`pds-core`**, **`pds-icons`** — tsup (ESM/CJS/dts 자동)
- **`pds-ui`** — 빌드 없음, 소스(`.tsx`) 노출. 소비 앱이 번들링

### 6.2 버전 관리 (Changesets)
- PR마다 `.changeset/*.md` 파일 필수 (major/minor/patch)
- 메인 머지 → Release PR 자동 생성 → 머지 시 publish + GitHub Release
- **모든 PDS 패키지 통합 버전** (동일 버전으로 정렬)
- 0.x = Phase 1~3 (breaking 허용) / 1.0 = Phase 4 완료

### 6.3 배포 (GitHub Packages, 비공개)
```
레지스트리: https://npm.pkg.github.com
.npmrc:
  @pluto:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```
- private GitHub repo → Packages 자동 비공개
- 추후 공개 npm 이사 필요 시 publish 타겟만 변경 (패키지 이름 `@pluto/*` 유지)

### 6.4 CI/CD (GitHub Actions)
- main 머지 시 자동 publish
- 개인 로컬 `pnpm publish` 금지 (토큰 미발급)
- main 브랜치 보호: PR 필수, 빌드·타입·Biome 체크 통과 필수
- Changesets Bot이 PR에 changeset 누락 시 경고

### 6.5 컴포넌트 배포 방식 (shadcn 하이브리드)
- `@pluto/pds-core` — npm 패키지로 설치 (`pnpm add`)
- `@pluto/pds-ui` — **shadcn registry** (`registry.json`) 포맷으로 publish
  ```
  # 앱팀이 컴포넌트 추가
  npx shadcn add https://pds.pluto.com/r/button
  → 앱의 src/components/pds/button.tsx 로 복사됨
  ```
- 자체 CLI 구현하지 않음 — shadcn 공식 CLI가 custom registry 지원 (2026년 공식 기능)

---

## 7. Figma와의 관계

- **전략**: 코드가 SSOT, Figma는 역생성 방식
- **운영**: 역생성·Figma 파일 관리는 **유저(yoojungkim)가 직접 담당**
- **PDS 코드 설계**: Figma 호환성을 우선 고려하지 않음 (코드 가독성·AI 친화·성능 우선)
- **Code Connect / Figma Variables 도구 선택**: 유저가 추후 판단

개발 측 작업 트리거: **유저가 명시적으로 요청할 때만** Figma 관련 작업 진행.

---

## 8. 협업·운영 원칙

### 8.1 Agent/Chat 관련 시각 결정
- **반드시 `/Users/yoojungkim/Documents/pluto-note`의 실제 코드에서 추출**
- 상상·임의 제안 금지 (색, 애니메이션, 구조 모두)
- 일반 UI는 skilled_plan이 레퍼런스, AI/Chat은 pluto-note가 레퍼런스 — 경계 혼동 금지

### 8.2 shadcn 룩 방지
- `npx shadcn add`로 받은 파일은 **그대로 쓰지 않고** PDS 토큰·스타일로 재작성
- 첫 수령 직후 reskin 단계 필수

### 8.3 작업 진행 방식 (AI/Claude Code와의 협업 규칙)
- 유저 허락 전까지 **코드 생성·수정 금지**
- `AskUserQuestion` 도구 사용 금지 (평문으로 하나씩)
- 로드맵은 **Phase 단위**로, 주/일 추정치 사용 금지
- 결정은 한 번에 하나씩

---

## 9. 다음 단계 (Phase 0 시작 체크리스트)

PDS 실제 구현을 시작할 때 Phase 0에서 처리할 항목:

- [ ] pnpm init + `pnpm-workspace.yaml` 작성
- [ ] Turborepo 설치 + `turbo.json` 기본 파이프라인
- [ ] Biome 설치 + `biome.json` 기본 규칙
- [ ] `tsconfig.base.json` + 패키지별 `tsconfig.json`
- [ ] `packages/pds-core` 스캐폴드
  - [ ] `@theme` CSS 파일 작성 (본 문서 §4 토큰 전부 반영)
  - [ ] Pretendard variable font 번들
  - [ ] Tailwind v4 preset export
  - [ ] motion keyframes + Framer Motion variants
  - [ ] tsup 빌드 스크립트
- [ ] `packages/pds-icons` 스캐폴드 (lucide 래퍼)
- [ ] `packages/pds-ui` 스캐폴드 (첫 컴포넌트는 Phase 1에서)
- [ ] `apps/docs` 스캐폴드 (Next.js 15 App Router + MDX)
- [ ] GitHub Actions workflow (빌드·테스트·Changesets release)
- [ ] Changesets 초기화 (`pnpm changeset init`)
- [ ] GitHub Packages 권한·토큰 발급

---

## 10. 레퍼런스 링크

- [Wanted Montage GitHub](https://github.com/wanteddev/montage-web) — 토큰 구조 원천
- [Montage 문서](https://montage.wanted.co.kr/docs/foundations) — 구조 참고
- [shadcn/ui 문서](https://ui.shadcn.com/docs) — 배포 패턴 + Tailwind v4 가이드
- [Tailwind v4 @theme](https://tailwindcss.com/docs/theme) — 토큰 시스템
- [Radix UI Primitives](https://www.radix-ui.com/primitives) — headless 컴포넌트
- [Electron corner-smoothing 블로그](https://www.electronjs.org/blog/electron-37-0) — Electron 37 squircle
- [CSS corner-shape MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape) — 표준 squircle
- [Changesets](https://github.com/changesets/changesets) — 버전·릴리즈 자동화
