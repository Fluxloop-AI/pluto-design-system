"use client";

import { Check, Copy } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { ContentBlock, ImageBlock, TextBlock } from "../types/chat";
import { cn } from "../utils/cn";
import { IconButton } from "./icon-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const COPY_RESET_MS = 1500;

const chatUserMessage = tv({
  slots: {
    root: "group/msg flex flex-col items-end pl-[48px]",
    bubble: [
      "flex flex-col gap-[8px]",
      "bg-[var(--pds-fill-normal)] text-[color:var(--pds-label-normal)]",
      "rounded-[10px] px-[14px] py-[10px]",
      "text-[14px] leading-[20px] max-w-[85%] break-words",
    ],
    actions: [
      "flex gap-[2px] mt-[4px]",
      "opacity-0 group-hover/msg:opacity-100 group-focus-within/msg:opacity-100",
      "transition-opacity duration-[var(--pds-motion-duration-fast)]",
    ],
    image: "block max-w-[min(100%,320px)] max-h-[240px] rounded-[8px] object-cover",
    imageError: [
      "max-w-[min(100%,320px)] px-[14px] py-[12px] rounded-[8px]",
      "bg-[var(--pds-fill-alternative)] text-[color:var(--pds-label-assistive)]",
      "text-[12px] leading-[16px]",
    ],
  },
  variants: {
    role: {
      user: {},
    },
  },
  defaultVariants: {
    role: "user",
  },
});

type ChatUserMessageVariants = VariantProps<typeof chatUserMessage>;

type ChatUserMessageProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "content"> & {
  content: string | ContentBlock[];
  role?: ChatUserMessageVariants["role"];
  /**
   * 텍스트 블록 렌더러. 기본은 미주입 = plain text (사용자 입력은 보통 plain).
   * 명시적으로 넘기면 마크다운 렌더링 (`<p>` wrapping 으로 인한 위/아래 마진 발생 가능).
   */
  renderMarkdown?: (text: string) => React.ReactNode;
  /** 풍선 아래 추가 액션. `showCopy` 가 true 면 기본 복사 버튼 옆에 함께 노출. */
  actions?: React.ReactNode;
  /** 기본 복사 버튼 노출 여부. 텍스트 컨텐츠가 있을 때만 실제로 그려짐. 기본 true. */
  showCopy?: boolean;
  className?: string;
};

function MessageImage({ block }: { block: ImageBlock }) {
  const [failed, setFailed] = React.useState(false);
  const styles = chatUserMessage();

  const src =
    block.source.type === "url"
      ? block.source.url
      : `data:${block.source.media_type};base64,${block.source.data}`;

  if (failed || !src) {
    return (
      <div role="img" aria-label="첨부 파일" className={styles.imageError()}>
        Image unavailable
      </div>
    );
  }

  return (
    <img src={src} alt="사용자 첨부" onError={() => setFailed(true)} className={styles.image()} />
  );
}

function extractCopyText(content: string | ContentBlock[]): string {
  if (typeof content === "string") return content;
  return content
    .filter((b): b is TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n\n");
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), COPY_RESET_MS);
    } catch {
      // clipboard 미지원/거부 — 시각 피드백 없이 무시
    }
  };

  const label = copied ? "복사됨" : "복사";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton variant="subtle" size="sm" aria-label={label} onClick={handleClick}>
          {copied ? <Check /> : <Copy />}
        </IconButton>
      </TooltipTrigger>
      <TooltipContent size="sm">{label}</TooltipContent>
    </Tooltip>
  );
}

const ChatUserMessage = React.forwardRef<HTMLDivElement, ChatUserMessageProps>(
  function ChatUserMessage(
    { content, role = "user", renderMarkdown, actions, showCopy = true, className, ...props },
    ref,
  ) {
    const styles = chatUserMessage({ role });
    const blocks =
      typeof content === "string" ? [{ type: "text", text: content } as const] : content;

    const copyText = showCopy ? extractCopyText(content) : "";
    const hasCopy = showCopy && copyText.length > 0;
    const hasActionBar = hasCopy || Boolean(actions);

    return (
      <div
        ref={ref}
        data-slot="chat-user-message"
        data-role={role}
        className={cn(styles.root(), className)}
        {...props}
      >
        <div className={styles.bubble()}>
          {blocks.map((block, i) => {
            if (block.type === "text") {
              const key = `text-${i}-${block.text.slice(0, 16)}`;
              return (
                <div key={key} className="whitespace-pre-wrap">
                  {renderMarkdown ? renderMarkdown(block.text) : block.text}
                </div>
              );
            }
            if (block.type === "image") {
              const src =
                block.source.type === "url" ? block.source.url : block.source.data.slice(0, 16);
              const key = `image-${i}-${src}`;
              return <MessageImage key={key} block={block} />;
            }
            return null;
          })}
        </div>
        {hasActionBar ? (
          <TooltipProvider>
            <div className={styles.actions()}>
              {hasCopy ? <CopyButton text={copyText} /> : null}
              {actions}
            </div>
          </TooltipProvider>
        ) : null}
      </div>
    );
  },
);

export type { ChatUserMessageProps };
export { ChatUserMessage, chatUserMessage };
