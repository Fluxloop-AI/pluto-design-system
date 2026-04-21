"use client";

import { type ChatTab, ChatTabBar } from "@fluxloop-ai/pds-ui/components/chat-tab-bar";
import { useState } from "react";

const INITIAL: ChatTab[] = [
  { id: "t1", title: "새 대화" },
  { id: "t2", title: "PDS 토큰 질문" },
  { id: "t3", title: "Bug triage" },
  { id: "t4", title: "Refactor notes" },
];

export function ChatTabBarDemo() {
  const [tabs, setTabs] = useState<ChatTab[]>(INITIAL);
  const [activeId, setActiveId] = useState<string | null>("t2");

  return (
    <div className="pds-chat-demo-card">
      <ChatTabBar
        tabs={tabs}
        activeId={activeId}
        onSwitch={setActiveId}
        onClose={(id) => {
          setTabs((prev) => prev.filter((t) => t.id !== id));
          setActiveId((prev) => {
            if (prev !== id) return prev;
            const remaining = tabs.filter((t) => t.id !== id);
            return remaining[0]?.id ?? null;
          });
        }}
      />
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-chat-demo-card {
        padding: 12px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
