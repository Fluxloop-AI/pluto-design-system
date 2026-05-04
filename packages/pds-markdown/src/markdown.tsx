"use client";

import * as React from "react";
import ReactMarkdown, { type Options } from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  children: string;
  className?: string;
  components?: Options["components"];
};

const REMARK_PLUGINS: Options["remarkPlugins"] = [remarkGfm];

function Markdown({ children, className, components }: MarkdownProps) {
  return (
    <div className={["pds-markdown", className].filter(Boolean).join(" ")}>
      <ReactMarkdown remarkPlugins={REMARK_PLUGINS} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

function renderMarkdown(text: string): React.ReactNode {
  return <Markdown>{text}</Markdown>;
}

export type { MarkdownProps };
export { Markdown, renderMarkdown };
