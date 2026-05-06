---
"@fluxloop-ai/pds-core": minor
"@fluxloop-ai/pds-ui": minor
---

`tv` 팩토리와 `tw-merge-config` 를 `@fluxloop-ai/pds-core` 로 이동.

- pds-core 가 `tv`, `VariantProps`, `twMergeConfig`, `PDS_TYPOGRAPHY_VARIANTS` 를 새로 export. `cn` 도 `extendTailwindMerge(twMergeConfig)` 로 강화돼 PDS typography 그룹(`text-body2` 등) 과 임의 색 클래스 충돌이 해소됨.
- pds-ui 컴포넌트는 `../utils/cn`, `../utils/tv` 가 아니라 `@fluxloop-ai/pds-core` 에서 직접 import. 레지스트리 `utils` 항목은 제거됐고, 컴포넌트별 `dependencies` 에 `@fluxloop-ai/pds-core` 가 추가돼 `npx shadcn add` 한 번이면 추가 파일 fetch 없이 빌드된다.
- 소비자 측: 기존에 `lib/utils.ts` 로 복사된 `cn` 을 쓰고 있었다면, `@fluxloop-ai/pds-core` 의 `cn` 으로 옮기거나 그대로 둬도 됨(중복일 뿐 동작 무방). 단 PDS typography 그룹 인지가 필요한 새 컴포넌트는 core 의 `cn`/`tv` 사용 권장.
