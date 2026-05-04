---
"@fluxloop-ai/pds-ui": minor
---

`ChatUserMessage` 첨부물(이미지·문서) 표시 방식 개편 + `DocumentBlock` 타입 신규.

- `types/chat.ts` 에 Anthropic Messages API 호환 `DocumentBlock` 추가 (`type: "document"`, `source` discriminated union, `title?`, `context?`). `ContentBlock` union 에 포함.
- 이미지/문서 블록은 풍선 위쪽 별도 row 에 우측 정렬로 모아 표시 (텍스트 사이에 끼워도 attachment 그룹으로 lifting). 정렬 규칙: **문서(chip) 좌측, 이미지(thumbnail) 우측**, 같은 타입끼리는 입력 순서 보존.
- 이미지 썸네일 사양 변경: `max-w-[320px] max-h-[240px]` → `64×64` 정사각, `object-cover`, `rounded-[10px]`. 다중 첨부 시 `flex-wrap-reverse` 로 좁은 폭에서 줄바꿈.
- 이미지 로드 실패 fallback: 큰 텍스트 박스 → 64×64 회색 박스 + `ImageBroken` 아이콘.
- 문서 블록은 `ChatAttachmentChip` (`type="file"`) 으로 렌더, 라벨은 `block.title ?? "Document"`.
- 텍스트 블록이 하나도 없으면 풍선 자체를 그리지 않음. "(no message)" 같은 placeholder 카피는 PDS 가 가지지 않고 앱이 text 블록으로 직접 넣도록 위임.
