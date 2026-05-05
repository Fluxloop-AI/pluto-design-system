---
"@fluxloop-ai/pds-icons": minor
---

**`@fluxloop-ai/pds-icons/brands` 서브패스 추가 — AI 모델/벤더/제품 브랜드 로고.**

`@lobehub/icons` 위에 얹은 얇은 어댑터. PDS 의 phosphor 어댑터 컨벤션과 동일하게 공급자 직접 import 를 막고 단일 진입점으로만 노출.

- 노출 브랜드 (14):
  - 회사: `Anthropic`, `OpenAI`, `Google`, `XAI`
  - 모델: `Claude`, `Gemini`, `Grok`
  - 코딩 에이전트 / IDE: `ClaudeCode`, `Codex`, `GeminiCLI`, `OpenCode`, `Cursor`, `Antigravity`, `Copilot`
- 각 아이콘은 default = Mono, `.Color` 가 컴파운드 속성으로 붙어 있다 (있는 브랜드만). 브랜드 자체가 모노 마크인 경우(Anthropic, OpenAI, XAI, Grok, OpenCode, Cursor) Color 없음 — TS 가 호출 자체를 막음.
- Allowlist 방식: 신규 브랜드는 `packages/pds-icons/src/brands/index.ts` 에 명시적으로 추가.
- `@lobehub/icons` 는 external 처리 (consumer 쪽 트리쉐이킹).
