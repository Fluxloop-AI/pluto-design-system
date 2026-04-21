"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

export type ToolCodeLanguage = "json" | "text";

const toolCodeBlock = tv({
  slots: {
    root: ["font-mono text-[12px] leading-[18px]", "overflow-y-auto"],
    code: "whitespace-pre",
  },
  variants: {
    tone: {
      default: { root: "text-[color:var(--pds-label-normal)]" },
      caution: { root: "text-[color:var(--pds-status-cautionary)]" },
      negative: { root: "text-[color:var(--pds-status-negative)]" },
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

type ToolCodeBlockVariants = VariantProps<typeof toolCodeBlock>;

type ToolCodeBlockProps = {
  code: string;
  language?: ToolCodeLanguage;
  tone?: ToolCodeBlockVariants["tone"];
  maxHeight?: number;
  expanded?: boolean;
  renderCode?: (code: string, language: ToolCodeLanguage) => React.ReactNode;
  contentTestId?: string;
  className?: string;
};

const ToolCodeBlock = React.forwardRef<HTMLDivElement, ToolCodeBlockProps>(function ToolCodeBlock(
  {
    code,
    language = "json",
    tone = "default",
    maxHeight,
    expanded = false,
    renderCode,
    contentTestId,
    className,
  },
  ref,
) {
  const styles = toolCodeBlock({ tone });
  const effectiveMaxHeight = expanded ? undefined : maxHeight;

  return (
    <div
      ref={ref}
      data-slot="tool-code-block"
      data-testid={contentTestId}
      data-language={language}
      data-tone={tone}
      className={cn(styles.root(), className)}
      style={{ maxHeight: effectiveMaxHeight }}
    >
      {renderCode ? (
        renderCode(code, language)
      ) : (
        <pre className={styles.code()}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
});

export type { ToolCodeBlockProps };
export { ToolCodeBlock, toolCodeBlock };
