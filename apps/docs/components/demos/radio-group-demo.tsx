"use client";

import { RadioGroup, RadioGroupItem } from "@fluxloop-ai/pds-ui/components/radio-group";
import * as React from "react";

const OPTIONS = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
];

export function RadioGroupVerticalDemo() {
  const [value, setValue] = React.useState("pro");
  return (
    <div className="pds-demo-row">
      <RadioGroup value={value} onValueChange={setValue}>
        {OPTIONS.map((o) => {
          const id = `plan-${o.value}`;
          return (
            <label
              key={o.value}
              htmlFor={id}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <RadioGroupItem id={id} value={o.value} />
              <span>{o.label}</span>
            </label>
          );
        })}
      </RadioGroup>
      <Styles />
    </div>
  );
}

export function RadioGroupHorizontalDemo() {
  return (
    <div className="pds-demo-row">
      <RadioGroup defaultValue="sm" orientation="horizontal" size="sm">
        {["sm", "md", "lg"].map((v) => {
          const id = `size-${v}`;
          return (
            <label key={v} htmlFor={id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <RadioGroupItem id={id} value={v} />
              <span>{v}</span>
            </label>
          );
        })}
      </RadioGroup>
      <Styles />
    </div>
  );
}

export function RadioGroupDisabledDemo() {
  return (
    <div className="pds-demo-row">
      <RadioGroup defaultValue="a">
        <label htmlFor="opt-a" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RadioGroupItem id="opt-a" value="a" />
          <span>enabled</span>
        </label>
        <label
          htmlFor="opt-b"
          style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.6 }}
        >
          <RadioGroupItem id="opt-b" value="b" disabled />
          <span>disabled</span>
        </label>
      </RadioGroup>
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
