"use client";

import { ThinkingBlock } from "@fluxloop-ai/pds-ui/components/thinking-block";
import { useEffect, useState } from "react";

const SAMPLE = `**가설 세우기**
먼저 사용자의 의도를 파악한다. 주어진 단서:

- 입력이 비어 있다.
- 기본값이 필요할 수 있다.

따라서 빈 입력을 'empty' 로 정규화하자.

\`\`\`ts
const value = input ?? "empty";
\`\`\`
`;

export function ThinkingBlockDemo() {
  const [phase, setPhase] = useState<"running" | "complete">("complete");

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((prev) => (prev === "running" ? "complete" : "running"));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pds-chat-demo-card">
      <ThinkingBlock thinking={SAMPLE} statusPhase={phase} duration={12} />
      <ThinkingBlock thinking="" redacted statusPhase="complete" />
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
