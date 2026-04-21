"use client";

import * as React from "react";
import type { ChatStatusPhase } from "../types/chat";
import { cn } from "../utils/cn";
import { ChatBlock } from "./chat-block";
import { ToolCodeBlock, type ToolCodeLanguage } from "./tool-code-block";

export const DEFAULT_TOOL_LABELS: Record<string, string> = {
  read_note: "노트 읽기",
  list_notes: "노트 목록",
  search_notes: "노트 검색",
  read: "파일 읽기",
  write: "파일 쓰기",
  edit: "파일 수정",
  bash: "터미널 실행",
};

export const DEFAULT_KEY_PARAM_FIELDS = [
  "file_path",
  "command",
  "query",
  "path",
  "name",
  "pattern",
  "url",
] as const;

export type ToolCallStatusType = "running" | "complete" | "requires-action";

function resolveToolPhase({
  statusPhase,
  statusType,
  result,
  isError,
}: {
  statusPhase?: ChatStatusPhase;
  statusType?: ToolCallStatusType;
  result: unknown;
  isError?: boolean;
}): ChatStatusPhase {
  if (statusPhase) return statusPhase;
  if (statusType === "requires-action") return "requires-action";
  if (isError) return "error";
  return result === undefined ? "running" : "complete";
}

function getToolStatusLabel(phase: ChatStatusPhase) {
  switch (phase) {
    case "pending":
      return "대기 중";
    case "running":
      return "실행 중";
    case "error":
      return "오류";
    case "requires-action":
      return "입력 필요";
    default:
      return "완료";
  }
}

function extractKeyParam(
  args: Record<string, unknown> | undefined,
  fields: readonly string[],
): string | null {
  if (!args) return null;
  for (const field of fields) {
    const val = args[field];
    if (typeof val !== "string" || val.length === 0) continue;
    if (field === "file_path" || field === "path") {
      const segments = val.split("/");
      return segments[segments.length - 1] ?? val;
    }
    return val.length > 30 ? `${val.slice(0, 30)}…` : val;
  }
  return null;
}

function getPreview(result: unknown): string | null {
  if (result === undefined || result === null) return null;
  const text =
    typeof result === "string"
      ? result
      : (() => {
          try {
            return JSON.stringify(result);
          } catch {
            return String(result);
          }
        })();
  const firstLine = text.split("\n").find((line) => line.trim().length > 0);
  if (!firstLine) return null;
  const trimmed = firstLine.trim();
  return trimmed.length > 60 ? `${trimmed.slice(0, 60)}…` : trimmed;
}

function normalizeJsonCode(value: unknown): { code: string; language: "json" } | null {
  if (value === undefined) return null;
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    return { code: JSON.stringify(parsed, null, 2), language: "json" };
  } catch {
    return null;
  }
}

function normalizeToolResult(value: unknown): { code: string; language: ToolCodeLanguage } {
  if (value === undefined) return { code: "아직 결과 없음", language: "text" };
  if (typeof value === "string") {
    return normalizeJsonCode(value) ?? { code: value, language: "text" };
  }
  return normalizeJsonCode(value) ?? { code: String(value), language: "text" };
}

type ResultTone = "default" | "caution" | "negative";

function getResultTone(phase: ChatStatusPhase): ResultTone {
  if (phase === "error") return "negative";
  if (phase === "requires-action") return "caution";
  return "default";
}

function getResultToneBg(tone: ResultTone) {
  switch (tone) {
    case "negative":
      return "var(--pds-chat-tone-error-bg)";
    case "caution":
      return "var(--pds-chat-tone-caution-bg)";
    default:
      return "transparent";
  }
}

type ToolCallCardProps = {
  toolCallId: string;
  toolName: string;
  args?: Record<string, unknown>;
  argsText?: string;
  result?: unknown;
  isError?: boolean;
  statusType?: ToolCallStatusType;
  statusPhase?: ChatStatusPhase;
  toolLabels?: Record<string, string>;
  keyParamFields?: readonly string[];
  renderCode?: (code: string, language: ToolCodeLanguage) => React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
};

const ToolCallCard = React.forwardRef<HTMLDivElement, ToolCallCardProps>(function ToolCallCard(
  {
    toolCallId,
    toolName,
    args,
    argsText,
    result,
    isError,
    statusType,
    statusPhase,
    toolLabels = DEFAULT_TOOL_LABELS,
    keyParamFields = DEFAULT_KEY_PARAM_FIELDS,
    renderCode,
    defaultExpanded = false,
    className,
  },
  ref,
) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const phase = resolveToolPhase({ statusPhase, statusType, result, isError });
  const label = toolLabels[toolName] ?? toolName;
  const argsJson =
    Object.keys(args ?? {}).length > 0 ? normalizeJsonCode(args) : normalizeJsonCode(argsText);
  const argsContent = argsJson?.code ?? argsText ?? "{}";
  const resultContent = normalizeToolResult(result);
  const tone = getResultTone(phase);
  const keyParam = extractKeyParam(args, keyParamFields);
  const preview = phase === "complete" ? getPreview(result) : null;
  const statusLabel = getToolStatusLabel(phase);
  const statusColor =
    phase === "error"
      ? "var(--pds-status-negative)"
      : phase === "requires-action"
        ? "var(--pds-status-cautionary)"
        : "var(--pds-label-assistive)";

  return (
    <ChatBlock
      ref={ref}
      open={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      phase={phase}
      animationClass="pds-animate-card-in"
      testId={`tool-call-card-${toolCallId}`}
      triggerTestId={`tool-call-toggle-${toolCallId}`}
      className={cn("overflow-hidden rounded-[8px]", className)}
      headerContent={
        <span className="flex min-w-0 flex-1 items-center justify-between gap-[12px]">
          <span className="inline-flex min-w-0 items-center gap-[8px] overflow-hidden">
            <span className="shrink-0 font-medium text-[13px] text-[color:var(--pds-label-alternative)] leading-[18px]">
              {label}
            </span>
            {keyParam ? (
              <span className="truncate text-[12px] text-[color:var(--pds-label-assistive)] leading-[18px]">
                · {keyParam}
              </span>
            ) : null}
            {preview ? (
              <span className="truncate text-[12px] text-[color:var(--pds-label-assistive)] leading-[18px]">
                — {preview}
              </span>
            ) : null}
          </span>
          <span
            className="shrink-0 whitespace-nowrap font-medium text-[12px] leading-[18px]"
            style={{ color: statusColor }}
          >
            {statusLabel}
          </span>
        </span>
      }
    >
      <div
        className="px-[14px] pb-[14px]"
        style={{
          backgroundColor: phase === "error" ? "var(--pds-chat-tone-error-card-bg)" : undefined,
        }}
      >
        <div
          data-testid={`tool-call-details-${toolCallId}`}
          className="overflow-hidden rounded-[6px] bg-[var(--pds-fill-normal)]"
        >
          <section data-testid={`tool-call-args-row-${toolCallId}`} className="px-[14px] py-[12px]">
            <span className="mb-[6px] block font-medium text-[12px] text-[color:var(--pds-label-assistive)]">
              Request
            </span>
            <ToolCodeBlock
              code={argsContent}
              language="json"
              maxHeight={160}
              expanded={expanded}
              renderCode={renderCode}
              contentTestId={`tool-call-args-content-${toolCallId}`}
            />
          </section>
          <div aria-hidden="true" className="mx-[14px] h-px bg-[var(--pds-line-normal-normal)]" />
          <section
            data-testid={`tool-call-result-row-${toolCallId}`}
            className="px-[14px] py-[12px]"
            style={{ backgroundColor: getResultToneBg(tone) }}
          >
            <span className="mb-[6px] block font-medium text-[12px] text-[color:var(--pds-label-assistive)]">
              Response
            </span>
            <ToolCodeBlock
              code={resultContent.code}
              language={resultContent.language}
              tone={tone}
              maxHeight={192}
              expanded={expanded}
              renderCode={renderCode}
              contentTestId={`tool-call-result-content-${toolCallId}`}
            />
          </section>
        </div>
      </div>
    </ChatBlock>
  );
});

export type { ToolCallCardProps };
export { ToolCallCard };
