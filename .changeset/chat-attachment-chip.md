---
"@fluxloop-ai/pds-ui": minor
---

**ChatAttachmentChip — 채팅 첨부 컨텍스트(이미지/파일) 표시 pill 추가.**

`ChatComposer.topAccessory` 안에서 첨부된 컨텍스트를 가벼운 pill 로 나열하기 위한 컴포넌트. 일반 `Chip`(filter/tag, rect)과 의미·시각이 다르기 때문에 별도 컴포넌트로 분리.

- pill(rounded-full) + 1px border, transparent shell
- `type="image"` → 22×22 썸네일(`imageSrc`), `type="file"` → 타입 무관 단일 file 아이콘
- `name` 은 `max-width:200px` 안에서 truncate
- `onRemove` 지정 시 hover/focus 에 우상단 × 노출(layout shift 없음)

`chat-composer-demo` 의 mention 자리에 적용 (이미지 2 + 파일 3 wrapping). 기존 `.pds-chat-demo-mention*` raw CSS 제거.
