"use client";

import { ChatBlock } from "@fluxloop-ai/pds-ui/components/chat-block";
import type { ChatStatusPhase } from "@fluxloop-ai/pds-ui/types";
import { useState } from "react";

const PHASES: ChatStatusPhase[] = ["pending", "running", "complete", "error", "requires-action"];

function Header({ label }: { label: string }) {
  return (
    <span
      style={{
        flex: 1,
        minWidth: 0,
        fontSize: 13,
        fontWeight: 500,
        lineHeight: "18px",
        color: "var(--pds-label-alternative)",
      }}
    >
      {label}
    </span>
  );
}

export function ChatBlockDemo() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="pds-chat-demo-card">
      {PHASES.map((phase) => (
        <ChatBlock
          key={phase}
          open={!!open[phase]}
          onToggle={() => setOpen((prev) => ({ ...prev, [phase]: !prev[phase] }))}
          phase={phase}
          headerContent={<Header label={`${phase} block`} />}
        >
          <div
            style={{
              padding: "4px 16px 12px 20px",
              color: "var(--pds-label-neutral)",
              fontSize: 13,
              lineHeight: "20px",
            }}
          >
            본문 영역입니다. phase={phase}.
          </div>
        </ChatBlock>
      ))}
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
        gap: 4px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
