"use client";

import { DotsThree } from "@fluxloop-ai/pds-icons/icons";
import * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "../utils/cn";
import { Icon } from "./icon";

const sidebarList = tv({
  slots: {
    root: "flex flex-col",
    header: "flex items-center justify-between h-[28px] pl-[8px] pr-[4px] mb-[4px]",
    headerLeading: "flex items-center gap-[6px] min-w-0",
    title: [
      "text-[12px] leading-[16px] font-semibold tracking-tight",
      "text-[color:var(--pds-label-alternative)]",
      "truncate",
    ],
    count: [
      "inline-flex items-center justify-center min-w-[16px] h-[16px] px-[4px]",
      "rounded-full bg-[var(--pds-fill-normal)]",
      "text-[10px] leading-[10px] font-semibold",
      "text-[color:var(--pds-label-alternative)]",
    ],
    actions: "flex items-center gap-[2px] shrink-0",
    body: "flex flex-col gap-[2px]",
    item: [
      "flex items-center w-full h-[32px] px-[10px] rounded-[8px]",
      "text-[13px] leading-[18px] text-left",
      "text-[color:var(--pds-label-neutral)] bg-transparent",
      "transition-[background-color,color] duration-[var(--pds-duration-fast)]",
      "cursor-pointer select-none",
      "hover:bg-[var(--pds-fill-alternative)]",
      "data-[selected=true]:bg-[var(--pds-fill-normal)]",
      "data-[selected=true]:text-[color:var(--pds-label-normal)]",
      "data-[selected=true]:font-medium",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
    ],
    itemLabel: "min-w-0 truncate",
    more: [
      "flex items-center gap-[10px] w-full h-[28px] px-[10px] rounded-[8px]",
      "text-[13px] leading-[18px] text-left",
      "text-[color:var(--pds-label-assistive)] bg-transparent",
      "transition-[background-color,color] duration-[var(--pds-duration-fast)]",
      "cursor-pointer select-none",
      "hover:bg-[var(--pds-fill-alternative)] hover:text-[color:var(--pds-label-alternative)]",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-[color:var(--pds-focus-ring)] focus-visible:ring-offset-2",
      "focus-visible:ring-offset-[color:var(--pds-background-normal-normal)]",
    ],
  },
});

type SidebarListItem = {
  id: string;
  label: string;
};

type SidebarListProps = Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> & {
  title: string;
  count?: number;
  /** 헤더 우측 액션 슬롯 (e.g., IconButton 묶음). */
  actions?: React.ReactNode;
  items: SidebarListItem[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** 지정 시 그 개수까지만 노출하고 초과분은 'more' 토글로 펼친다. 미지정 시 전체 노출. */
  initialVisibleCount?: number;
  /** 'more' 토글 라벨. 기본 "more". */
  moreLabel?: string;
};

const SidebarList = React.forwardRef<HTMLElement, SidebarListProps>(function SidebarList(
  {
    title,
    count,
    actions,
    items,
    selectedId = null,
    onSelect,
    initialVisibleCount,
    moreLabel = "more",
    className,
    ...props
  },
  ref,
) {
  const styles = sidebarList();
  const [expanded, setExpanded] = React.useState(false);
  const truncating =
    typeof initialVisibleCount === "number" &&
    initialVisibleCount >= 0 &&
    items.length > initialVisibleCount;
  const visibleItems =
    truncating && !expanded ? items.slice(0, initialVisibleCount) : items;
  const showMore = truncating && !expanded;

  return (
    <section
      ref={ref}
      data-slot="sidebar-list"
      className={cn(styles.root(), className)}
      {...props}
    >
      <header className={styles.header()}>
        <div className={styles.headerLeading()}>
          <span className={styles.title()}>{title}</span>
          {typeof count === "number" ? <span className={styles.count()}>{count}</span> : null}
        </div>
        {actions ? <div className={styles.actions()}>{actions}</div> : null}
      </header>

      <div className={styles.body()}>
        {visibleItems.map((item) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              data-selected={selected}
              aria-current={selected ? "true" : undefined}
              className={styles.item()}
              onClick={() => onSelect?.(item.id)}
            >
              <span className={styles.itemLabel()}>{item.label}</span>
            </button>
          );
        })}
        {showMore ? (
          <button
            type="button"
            className={styles.more()}
            onClick={() => setExpanded(true)}
          >
            <Icon icon={DotsThree} size="sm" />
            <span>{moreLabel}</span>
          </button>
        ) : null}
      </div>
    </section>
  );
});

export type { SidebarListItem, SidebarListProps };
export { SidebarList, sidebarList };
