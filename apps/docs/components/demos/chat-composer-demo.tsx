"use client";

import { At, CaretDown, HandWaving, Microphone, Plus, X } from "@fluxloop-ai/pds-icons/icons";
import { ChatComposer } from "@fluxloop-ai/pds-ui/components/chat-composer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@fluxloop-ai/pds-ui/components/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@fluxloop-ai/pds-ui/components/tooltip";
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
      />
      <button type="button" className="pds-chat-demo-ctrl" onClick={() => setStreaming((s) => !s)}>
        toggle streaming
      </button>
      <Styles />
    </div>
  );
}

const TONE_OPTIONS = [
  { id: "wave", label: "친근하게" },
  { id: "formal", label: "정중하게" },
  { id: "concise", label: "간결하게" },
];

const MODEL_OPTIONS = [
  { id: "5.5-high", label: "5.5 높음" },
  { id: "5.5-mid", label: "5.5 보통" },
  { id: "4.5", label: "4.5 일반" },
];

export function ChatComposerAccessoriesDemo() {
  const [value, setValue] = useState("");
  const [tone, setTone] = useState("wave");
  const [model, setModel] = useState("5.5-high");
  return (
    <div className="pds-chat-demo-card">
      <ChatComposer
        value={value}
        onChange={setValue}
        onSubmit={(v) => {
          window.alert(`Submitted: ${v}`);
          setValue("");
        }}
        placeholder="후속 변경 사항을 부탁하세요"
        topAccessory={
          <div className="pds-chat-demo-mention">
            <button type="button" className="pds-chat-demo-mention-main" aria-label="첨부된 컨텍스트 3개">
              <At width={12} height={12} className="pds-chat-demo-mention-at" />
              <span className="pds-chat-demo-mention-name">file.md</span>
              <span className="pds-chat-demo-mention-more">+2</span>
            </button>
            <button type="button" className="pds-chat-demo-mention-close" aria-label="제거">
              <X width={10} height={10} />
            </button>
          </div>
        }
        leadingToolbar={
          <button type="button" className="pds-chat-demo-iconbtn" aria-label="첨부">
            <Plus width={16} height={16} />
          </button>
        }
        trailingToolbar={
          <button type="button" className="pds-chat-demo-iconbtn" aria-label="음성">
            <Microphone width={16} height={16} />
          </button>
        }
        bottomAccessory={
          <div className="pds-chat-demo-row">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="pds-chat-demo-chip" aria-label="톤 선택">
                  <HandWaving width={14} height={14} />
                  <CaretDown width={10} height={10} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" size="sm">
                <DropdownMenuRadioGroup value={tone} onValueChange={setTone}>
                  {TONE_OPTIONS.map((o) => (
                    <DropdownMenuRadioItem key={o.id} value={o.id}>
                      {o.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="pds-chat-demo-chip" aria-label="모델 선택">
                  {MODEL_OPTIONS.find((o) => o.id === model)?.label}
                  <CaretDown width={10} height={10} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" size="sm">
                <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                  {MODEL_OPTIONS.map((o) => (
                    <DropdownMenuRadioItem key={o.id} value={o.id}>
                      {o.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <ContextRingTrigger percent={0.08} />
          </div>
        }
      />
      <Styles />
    </div>
  );
}

export function ChatComposerStatesDemo() {
  const [v1, setV1] = useState("");
  return (
    <div className="pds-chat-demo-card">
      <ChatComposer value={v1} onChange={setV1} onSubmit={() => {}} disabled />
      <Styles />
    </div>
  );
}

function ContextRingTrigger({ percent }: { percent: number }) {
  const pct = Math.round(percent * 100);
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="pds-chat-demo-context"
            aria-label={`컨텍스트 ${pct}/100% 사용`}
          >
            <ContextRing percent={percent} />
          </button>
        </TooltipTrigger>
        <TooltipContent size="sm" side="top">{`${pct}/100% 사용`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ContextRing({ percent }: { percent: number }) {
  const r = 5.5;
  const c = 2 * Math.PI * r;
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r={r} fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <circle
        cx="7"
        cy="7"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - percent)}
        transform="rotate(-90 7 7)"
      />
    </svg>
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
        max-width: 400px;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
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
      .pds-chat-demo-iconbtn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--pds-label-alternative);
        cursor: pointer;
      }
      .pds-chat-demo-iconbtn:hover {
        background: var(--pds-background-normal-alternative);
        color: var(--pds-label-normal);
      }
      .pds-chat-demo-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        height: 24px;
        padding: 0 6px;
        font-size: 12px;
        color: var(--pds-label-alternative);
        border: 0;
        border-radius: 6px;
        background: transparent;
        cursor: pointer;
      }
      .pds-chat-demo-chip:hover {
        background: var(--pds-background-normal-alternative);
        color: var(--pds-label-normal);
      }
      .pds-chat-demo-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0 6px;
      }
      .pds-chat-demo-mention {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        height: 22px;
        padding: 0 4px 0 6px;
        font-size: 12px;
        color: var(--pds-label-normal);
        background: var(--pds-fill-alternative);
        border-radius: 6px;
        transition: background 120ms;
      }
      .pds-chat-demo-mention:hover {
        background: var(--pds-fill-normal);
      }
      .pds-chat-demo-mention-main {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: transparent;
        border: 0;
        padding: 0;
        font: inherit;
        color: inherit;
        cursor: pointer;
      }
      .pds-chat-demo-mention-close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        background: transparent;
        border: 0;
        border-radius: 4px;
        color: var(--pds-label-alternative);
        cursor: pointer;
      }
      .pds-chat-demo-mention-close:hover {
        background: var(--pds-fill-strong);
        color: var(--pds-label-normal);
      }
      .pds-chat-demo-mention-at {
        color: var(--pds-label-assistive);
      }
      .pds-chat-demo-mention-name {
        font-weight: 500;
      }
      .pds-chat-demo-mention-more {
        font-size: 11px;
        color: var(--pds-label-alternative);
      }
      .pds-chat-demo-context {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        width: 24px;
        height: 24px;
        padding: 0;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--pds-label-alternative);
        cursor: pointer;
        transition: background 120ms, color 120ms;
      }
      .pds-chat-demo-context:hover {
        background: var(--pds-fill-alternative);
        color: var(--pds-label-normal);
      }
      .pds-chat-demo-context:focus-visible {
        outline: 2px solid var(--pds-focus-ring);
        outline-offset: 2px;
      }
    `}</style>
  );
}
