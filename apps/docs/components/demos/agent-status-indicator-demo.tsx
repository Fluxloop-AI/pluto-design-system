"use client";

import { AgentStatusIndicator } from "@fluxloop-ai/pds-ui/components/agent-status-indicator";
import type { ChatAgentStatus } from "@fluxloop-ai/pds-ui/types";

const STATUSES: ChatAgentStatus[] = [
  "speculating",
  "thinking",
  "tool_executing",
  "generating",
  "compacting",
];

export function AgentStatusIndicatorDemo() {
  return (
    <div className="pds-chat-demo-card">
      {STATUSES.map((status) => (
        <AgentStatusIndicator key={status} status={status} />
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
        gap: 8px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
        align-items: flex-start;
      }
    `}</style>
  );
}
