---
"@fluxloop-ai/pds-ui": minor
---

`ChatUserMessage` 에 hover-reveal 복사 버튼 내장.

- 풍선 아래 우측에 복사 버튼이 기본 노출. 메시지 행 호버 / 포커스 시 fade-in (`opacity-0 → 100`), 평상시 자리 reserve 로 호버 시 레이아웃 흔들림 없음.
- 클릭하면 클립보드에 텍스트 저장 + 1.5s 동안 아이콘이 `Copy → Check` 로 스왑, 툴팁도 "복사 → 복사됨" 으로 변경 후 복귀.
- 이미지+텍스트 메시지면 텍스트 블록만 join (이미지 스킵). 텍스트가 비어있으면 복사 버튼 자체를 안 그림.
- `showCopy={false}` 로 비활성화, `actions` 슬롯은 기본 복사 버튼과 함께 노출 (override 아닌 append).
- IconButton `subtle/sm` + Tooltip primitive 재사용.
