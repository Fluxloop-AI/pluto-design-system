---
"@fluxloop-ai/pds-ui": patch
---

**ChatComposer — root 슬롯의 `pt-[6px]` 제거.**

상단 6px 의 컴포넌트 자체 패딩이 위쪽 콘텐츠(메시지 스레드의 `padding-bottom` 등) 와 더해져 이중 여백처럼 보이는 케이스가 있어서 제거. 호출자가 필요하면 외부 wrapper 또는 `className` override 로 명시적으로 추가.

좌우 16px / 하단 16px 은 유지.
