"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { ContentBlock, ImageBlock } from "../types/chat";
import { cn } from "../utils/cn";

const chatUserMessage = tv({
  slots: {
    root: "flex flex-col items-end pl-[48px]",
    bubble: [
      "flex flex-col gap-[8px]",
      "bg-[var(--pds-fill-normal)] text-[color:var(--pds-label-normal)]",
      "rounded-[10px] px-[14px] py-[10px]",
      "text-[14px] leading-[20px] max-w-[85%] break-words",
    ],
    actions: "flex gap-[2px] mt-[8px]",
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
  renderMarkdown?: (text: string) => React.ReactNode;
  actions?: React.ReactNode;
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

const ChatUserMessage = React.forwardRef<HTMLDivElement, ChatUserMessageProps>(
  function ChatUserMessage(
    { content, role = "user", renderMarkdown, actions, className, ...props },
    ref,
  ) {
    const styles = chatUserMessage({ role });
    const blocks =
      typeof content === "string" ? [{ type: "text", text: content } as const] : content;

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
        {actions ? <div className={styles.actions()}>{actions}</div> : null}
      </div>
    );
  },
);

export type { ChatUserMessageProps };
export { ChatUserMessage, chatUserMessage };
