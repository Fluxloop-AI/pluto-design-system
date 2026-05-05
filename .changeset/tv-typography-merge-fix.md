---
"@fluxloop-ai/pds-ui": patch
---

**`tv()` / `cn()` — PDS typography 유틸이 `text-[color:...]` 와 충돌하던 silent bug 수정.**

`tailwind-merge` 의 기본 config 는 `body2`, `title1` 같은 PDS 커스텀 사이즈
이름을 모르기 때문에 `text-body2 text-[color:var(--pds-label-normal)]` 같은
조합을 만나면 두 클래스를 같은 그룹으로 보고 한쪽을 드롭했다. 이 때문에
`ChatAssistantMessage`, `ChatUserMessage`, `Chip`, `SectionHeader` 등에서
typography 사이즈가 사라지고 부모의 14px 가 그대로 inherit 되던 문제가 발생.

수정:

- `packages/pds-ui/src/utils/tw-merge-config.ts` 신설 — PDS typography 변종
  (`display1`, `title1~3`, `heading1~2`, `headline1`, `body1`, `body1-reading`,
  `body2`, `label1~2`, `caption1~2`, `code`) 을 `font-size` 그룹으로 등록.
- `packages/pds-ui/src/utils/tv.ts` 신설 — `createTV({ twMergeConfig })` 로
  주입한 `tv` 를 export.
- `cn.ts` — `extendTailwindMerge(twMergeConfig)` 적용.
- pds-ui 컴포넌트 전부 `tailwind-variants` 직접 import 대신 `../utils/tv` 의
  `tv` 를 사용하도록 정리.

이제 `text-body2` 와 `text-[color:...]` 를 한 className 안에 같이 써도 모두
유지된다. 외부 사용자가 직접 `tailwind-variants` 의 `tv` 를 쓰면 같은 함정에
빠질 수 있으니 PDS 토큰을 className 으로 합성하는 코드는 가급적 PDS 가
제공하는 컴포넌트/유틸을 통해 사용하길 권장.
