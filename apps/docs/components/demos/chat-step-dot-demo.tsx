"use client";

import { ChatStepDot } from "@fluxloop-ai/pds-ui/components/chat-step-dot";
import type { ChatStatusPhase } from "@fluxloop-ai/pds-ui/types";

const PHASES: ChatStatusPhase[] = ["pending", "running", "complete", "error", "requires-action"];

export function ChatStepDotDemo() {
  return (
    <div className="pds-chat-demo-card">
      <div className="pds-chat-demo-row">
        {PHASES.map((phase) => (
          <div key={phase} className="pds-chat-demo-cell">
            <ChatStepDot phase={phase} />
            <span className="pds-chat-demo-label">{phase}</span>
          </div>
        ))}
      </div>
      <div className="pds-chat-demo-row">
        <ChatStepDot phase="running" size={8} />
        <ChatStepDot phase="running" size={10} />
        <ChatStepDot phase="complete" size={12} />
      </div>
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
        gap: 14px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-chat-demo-row {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        align-items: center;
      }
      .pds-chat-demo-cell {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .pds-chat-demo-label {
        font-size: 12px;
        color: var(--pds-label-assistive);
      }
    `}</style>
  );
}
