"use client";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  CheckCircle2,
  XCircle as CircleCloseFill,
  AlertCircle,
} from "@fluxloop-ai/pds-icons/lucide";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const input = tv({
  slots: {
    wrapper: [
      "group relative flex items-center rounded-[12px] overflow-hidden",
      "bg-[var(--pds-background-transparent-normal)]",
      "[backdrop-filter:blur(32px)]",
      "shadow-[var(--pds-shadow-xs)]",
      "transition-[box-shadow] duration-200",
    ],
    field: [
      "flex w-full h-full items-center gap-[8px] rounded-[inherit]",
      "shadow-[inset_0_0_0_1px_var(--pds-line-normal-neutral)]",
      "group-focus-within:shadow-[inset_0_0_0_2px_color-mix(in_srgb,var(--pds-primary-normal)_43%,transparent)]",
      "transition-[box-shadow] duration-200 cursor-text relative",
    ],
    leading: "flex shrink-0 items-center text-[color:var(--pds-label-alternative)]",
    input: [
      "flex-1 min-w-0 bg-transparent outline-none border-0 px-[4px] min-h-[24px]",
      "text-[color:var(--pds-label-normal)]",
      "placeholder:text-[color:var(--pds-label-assistive)]",
      "caret-[color:var(--pds-primary-normal)]",
      "disabled:cursor-default disabled:text-[color:var(--pds-label-alternative)]",
      "disabled:placeholder:text-[color:var(--pds-label-disable)]",
      "read-only:cursor-default",
    ],
    trailing: "flex shrink-0 items-center text-[color:var(--pds-label-alternative)]",
    trailingButton: "shrink-0 self-stretch",
    reset: [
      "hidden shrink-0 items-center justify-center size-[22px]",
      "text-[color:var(--pds-label-assistive)]",
      "group-focus-within:not(:has(input:placeholder-shown)):flex",
    ],
    invalidIcon: [
      "flex shrink-0 items-center justify-center size-[22px]",
      "text-[color:var(--pds-status-negative)]",
      "group-focus-within:hidden",
    ],
    positiveIcon: [
      "flex shrink-0 items-center justify-center size-[22px]",
      "text-[color:var(--pds-primary-normal)]",
      "group-focus-within:hidden",
    ],
  },
  variants: {
    size: {
      sm: {
        field: "px-[10px] py-[8px] text-[13px]",
      },
      md: {
        field: "px-[12px] py-[12px] text-[14px]",
      },
      lg: {
        field: "px-[16px] py-[14px] text-[16px]",
      },
    },
    invalid: {
      true: {
        field: [
          "shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--pds-status-negative)_28%,transparent)]",
          "group-focus-within:shadow-[inset_0_0_0_2px_color-mix(in_srgb,var(--pds-status-negative)_43%,transparent)]",
        ],
      },
      false: {},
    },
    disabled: {
      true: {
        wrapper: "bg-[var(--pds-fill-alternative)] [backdrop-filter:none]",
        field: [
          "shadow-[inset_0_0_0_1px_var(--pds-line-normal-alternative)]",
          "group-focus-within:shadow-[inset_0_0_0_1px_var(--pds-line-normal-alternative)]",
          "cursor-default",
        ],
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "md",
    invalid: false,
    disabled: false,
  },
});

type InputVariants = VariantProps<typeof input>;

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: InputVariants["size"];
  invalid?: boolean;
  positive?: boolean;
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  trailingButton?: React.ReactNode;
  width?: React.CSSProperties["width"];
  onReset?: (prev: string) => void;
  wrapperClassName?: string;
  wrapperRef?: React.Ref<HTMLDivElement>;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    wrapperClassName,
    wrapperRef,
    size = "md",
    invalid = false,
    positive = false,
    disabled = false,
    readOnly,
    leadingContent,
    trailingContent,
    trailingButton,
    width,
    style,
    onReset,
    onChange,
    type = "text",
    ...props
  },
  ref,
) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(inputRef, ref);
  const styles = input({ size, invalid, disabled });

  const handleReset = () => {
    const el = inputRef.current;
    if (!el) return;
    const prev = el.value;
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    setter?.call(el, "");
    el.dispatchEvent(new Event("input", { bubbles: true }));
    onReset?.(prev);
    el.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(styles.wrapper(), wrapperClassName)}
      style={{ width, ...style }}
    >
      <div className={styles.field()}>
        {leadingContent ? <div className={styles.leading()}>{leadingContent}</div> : null}
        <input
          ref={composedRef}
          type={type}
          readOnly={readOnly}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          onChange={onChange}
          className={cn(styles.input(), className)}
          {...props}
        />
        {invalid ? (
          <span className={styles.invalidIcon()} aria-hidden="true">
            <AlertCircle className="size-[18px]" />
          </span>
        ) : positive ? (
          <span className={styles.positiveIcon()} aria-hidden="true">
            <CheckCircle2 className="size-[18px]" />
          </span>
        ) : null}
        {!readOnly && !disabled ? (
          <button
            type="button"
            onPointerDown={(e) => e.preventDefault()}
            onClick={handleReset}
            tabIndex={-1}
            aria-label="초기화"
            className={cn(
              styles.reset(),
              "group-focus-within:flex peer-placeholder-shown:hidden",
            )}
          >
            <CircleCloseFill className="size-[18px]" />
          </button>
        ) : null}
        {trailingContent ? <div className={styles.trailing()}>{trailingContent}</div> : null}
      </div>
      {trailingButton ? <div className={styles.trailingButton()}>{trailingButton}</div> : null}
    </div>
  );
});

export { Input, input };
export type { InputProps };
