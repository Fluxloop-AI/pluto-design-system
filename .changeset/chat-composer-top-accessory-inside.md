---
"@fluxloop-ai/pds-ui": minor
---

**ChatComposer — `topAccessory` 슬롯을 shell 안쪽으로 이동.**

레퍼런스 디자인(첨부 chip 이 input 박스 안 상단에 표시되는 형태)에 맞추기 위해 `topAccessory` 가 shell **안쪽** 상단(textarea 위)에 렌더되도록 변경. `bottomAccessory` 는 그대로 shell 바깥 하단을 유지(외부 컨트롤 row 용도).

기존에 `topAccessory` 를 외부 위 자리(상단 mb-[4px])로 사용하던 코드는 시각적으로 input 박스 안으로 들어오는 변화가 발생합니다. 외부 위 자리가 필요하면 `<ChatComposer/>` 바깥에 직접 wrapper 를 두세요.
