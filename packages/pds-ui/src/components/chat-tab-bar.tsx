"use client";

import * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "../utils/cn";

const TAB_HEIGHT = 24;
const TAB_WIDTH = 80;

const chatTabBar = tv({
  slots: {
    root: [
      "flex items-center min-w-0 gap-[2px]",
      "overflow-x-auto overflow-y-hidden",
      "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    ],
    tab: [
      "flex items-center gap-[2px] pl-[8px] pr-[4px]",
      "rounded-[6px] cursor-pointer select-none box-border",
      "shrink-0 transition-colors duration-150",
      "bg-transparent",
      "hover:bg-[var(--pds-fill-alternative)]",
      "data-[active=true]:bg-[var(--pds-fill-normal)]",
    ],
    title: [
      "text-[12px] font-medium leading-[18px]",
      "whitespace-nowrap truncate min-w-0 flex-1",
      "text-[color:var(--pds-label-alternative)]",
      "group-data-[active=true]:text-[color:var(--pds-label-normal)]",
    ],
    close: [
      "flex items-center justify-center shrink-0",
      "w-[16px] h-[16px] rounded-[4px] border-0 p-0 cursor-pointer",
      "bg-transparent text-[color:var(--pds-label-alternative)]",
      "hover:bg-[var(--pds-fill-alternative)]",
      "opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100",
      "transition-opacity duration-150",
    ],
  },
});

type ChatTab = {
  id: string;
  title: string;
};

type ChatTabBarProps = {
  tabs: ChatTab[];
  activeId: string | null;
  onSwitch: (id: string) => void;
  onClose: (id: string) => void;
  className?: string;
};

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2.5 2.5l5 5M7.5 2.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TabChip({
  tab,
  isActive,
  onSelect,
  onClose,
  styles,
}: {
  tab: ChatTab;
  isActive: boolean;
  onSelect: () => void;
  onClose: (event: React.MouseEvent) => void;
  styles: ReturnType<typeof chatTabBar>;
}) {
  return (
    <div
      role="tab"
      tabIndex={0}
      aria-selected={isActive}
      data-active={isActive}
      className={cn("group", styles.tab())}
      style={{ height: TAB_HEIGHT, width: TAB_WIDTH }}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <span className={styles.title()}>{tab.title}</span>
      <button
        type="button"
        aria-label="탭 닫기"
        className={styles.close()}
        onClick={(event) => {
          event.stopPropagation();
          onClose(event);
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

const ChatTabBar = React.forwardRef<HTMLDivElement, ChatTabBarProps>(function ChatTabBar(
  { tabs, activeId, onSwitch, onClose, className },
  ref,
) {
  const styles = chatTabBar();
  return (
    <div ref={ref} role="tablist" data-slot="chat-tab-bar" className={cn(styles.root(), className)}>
      {tabs.map((tab) => (
        <TabChip
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeId}
          styles={styles}
          onSelect={() => onSwitch(tab.id)}
          onClose={() => onClose(tab.id)}
        />
      ))}
    </div>
  );
});

export type { ChatTab, ChatTabBarProps };
export { ChatTabBar, chatTabBar };
