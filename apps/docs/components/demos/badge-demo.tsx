"use client";

import { CheckCircle } from "@fluxloop-ai/pds-icons/icons";
import { Badge } from "@fluxloop-ai/pds-ui/components/badge";

const COLORS = ["neutral", "accent", "positive", "cautionary", "negative"] as const;
const SIZES = ["xs", "sm", "md"] as const;

export function BadgeGridDemo() {
  return (
    <div className="pds-demo-row">
      {(["solid", "outlined"] as const).map((variant) => (
        <div key={variant} style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              color: "var(--pds-label-alternative)",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {variant}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SIZES.map((size) => (
              <div key={size} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {COLORS.map((color) => (
                  <Badge key={color} variant={variant} size={size} color={color}>
                    {color}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Styles />
    </div>
  );
}

export function BadgeContentDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", gap: 8 }}>
      <Badge size="sm" color="positive" leadingContent={<CheckCircle />}>
        승인됨
      </Badge>
      <Badge size="sm" variant="outlined" color="cautionary">
        3
      </Badge>
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
