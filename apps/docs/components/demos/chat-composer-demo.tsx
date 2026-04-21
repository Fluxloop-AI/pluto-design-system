"use client";

import { ChatComposer } from "@fluxloop-ai/pds-ui/components/chat-composer";
import { useState } from "react";

export function ChatComposerIdleDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="pds-chat-demo-card">
      <ChatComposer
        value={value}
        onChange={setValue}
        onSubmit={(v) => {
          window.alert(`Submitted: ${v}`);
          setValue("");
        }}
        footerText="Global chat mode"
      />
      <Styles />
    </div>
  );
}

export function ChatComposerStreamingDemo() {
  const [value, setValue] = useState("작성 중인 메시지…");
  const [streaming, setStreaming] = useState(true);
  return (
    <div className="pds-chat-demo-card">
      <ChatComposer
        value={value}
        onChange={setValue}
        isStreaming={streaming}
        onSubmit={(v) => {
          setStreaming(true);
          setValue(v);
        }}
        onCancel={() => {
          setStreaming(false);
          window.alert("Cancelled");
        }}
        footerText={streaming ? "스트리밍 중…" : "대기"}
      />
      <button type="button" className="pds-chat-demo-ctrl" onClick={() => setStreaming((s) => !s)}>
        toggle streaming
      </button>
      <Styles />
    </div>
  );
}

export function ChatComposerStatesDemo() {
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("에러 상태 예시");
  return (
    <div className="pds-chat-demo-card">
      <ChatComposer
        value={v1}
        onChange={setV1}
        onSubmit={() => {}}
        disabled
        helperText="프로바이더 연결 전까지 입력 비활성화"
      />
      <ChatComposer
        value={v2}
        onChange={setV2}
        onSubmit={() => {}}
        errorText="요청 실패. 다시 시도해주세요."
      />
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-chat-demo-card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px 0;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-alternative);
      }
      .pds-chat-demo-ctrl {
        align-self: flex-end;
        margin-right: 16px;
        padding: 4px 10px;
        font-size: 12px;
        border: 1px solid var(--pds-line-normal-normal);
        border-radius: var(--pds-radius-sm);
        background: var(--pds-background-normal-normal);
        cursor: pointer;
      }
    `}</style>
  );
}
