"use client";

import { ToolCodeBlock } from "@fluxloop-ai/pds-ui/components/tool-code-block";

const JSON_SAMPLE = JSON.stringify(
  {
    file_path: "/tmp/foo.ts",
    command: "bun install",
    args: ["--frozen-lockfile"],
  },
  null,
  2,
);

const ERROR_SAMPLE = `Error: file not found
  at readFile (/lib/fs.ts:12:4)
  at run (/lib/run.ts:3:8)`;

export function ToolCodeBlockDemo() {
  return (
    <div className="pds-chat-demo-card">
      <ToolCodeBlock code={JSON_SAMPLE} language="json" maxHeight={160} />
      <ToolCodeBlock code={ERROR_SAMPLE} language="text" tone="negative" maxHeight={140} />
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
        gap: 12px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-fill-normal);
      }
    `}</style>
  );
}
