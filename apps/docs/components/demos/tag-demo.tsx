"use client";

import { Hash } from "@fluxloop-ai/pds-icons/icons";
import { Tag } from "@fluxloop-ai/pds-ui/components/tag";
import * as React from "react";

export function TagSizeDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Tag key={s} size={s}>
          size {s}
        </Tag>
      ))}
      <Styles />
    </div>
  );
}

export function TagToggleDemo() {
  const [active, setActive] = React.useState<string[]>(["design"]);
  const options = ["design", "code", "docs", "ops"];
  const toggle = (key: string) =>
    setActive((a) => (a.includes(key) ? a.filter((x) => x !== key) : [...a, key]));
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 6 }}>
      {options.map((opt) => (
        <Tag
          key={opt}
          size="sm"
          pressed={active.includes(opt)}
          onClick={() => toggle(opt)}
          leadingContent={<Hash />}
        >
          {opt}
        </Tag>
      ))}
      <Styles />
    </div>
  );
}

export function TagRemovableDemo() {
  const [tags, setTags] = React.useState(["React", "Tailwind", "Radix"]);
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 6 }}>
      {tags.map((t) => (
        <Tag
          key={t}
          size="sm"
          variant="outlined"
          onRemove={() => setTags((xs) => xs.filter((x) => x !== t))}
        >
          {t}
        </Tag>
      ))}
      {tags.length === 0 ? (
        <span style={{ fontSize: 12, color: "var(--pds-label-assistive)" }}>(모두 제거됨)</span>
      ) : null}
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-demo-row {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
