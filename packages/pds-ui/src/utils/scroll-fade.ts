"use client";

import * as React from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

type FadeEdge = boolean;

interface ScrollFadeMaskOptions {
  top?: FadeEdge;
  bottom?: FadeEdge;
  size?: number;
}

export function getScrollFadeMask({
  top = false,
  bottom = false,
  size = 40,
}: ScrollFadeMaskOptions): string {
  const stops: string[] = [];
  stops.push(top ? "transparent" : `black 0`);
  stops.push(`black ${size}px`);
  stops.push(`black calc(100% - ${size}px)`);
  stops.push(bottom ? "transparent" : `black 100%`);
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

interface UseScrollFadeOptions {
  size?: number;
  threshold?: number;
}

interface UseScrollFadeResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  onScroll: React.UIEventHandler<T>;
  maskImage: string;
  isScrolledFromTop: boolean;
  isScrolledFromBottom: boolean;
}

export function useScrollFade<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollFadeOptions = {},
): UseScrollFadeResult<T> {
  const { size = 40, threshold = 1 } = options;
  const ref = React.useRef<T>(null);
  const [isScrolledFromTop, setIsScrolledFromTop] = React.useState(false);
  const [isScrolledFromBottom, setIsScrolledFromBottom] = React.useState(false);

  const measure = React.useCallback(
    (el: T) => {
      const fromTop = el.scrollTop > threshold;
      const fromBottom = el.scrollHeight - el.clientHeight - el.scrollTop > threshold;
      setIsScrolledFromTop(fromTop);
      setIsScrolledFromBottom(fromBottom);
    },
    [threshold],
  );

  const onScroll = React.useCallback<React.UIEventHandler<T>>(
    (event) => measure(event.currentTarget),
    [measure],
  );

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure(el);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure(el));
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const maskImage = React.useMemo(
    () =>
      getScrollFadeMask({
        top: isScrolledFromTop,
        bottom: isScrolledFromBottom,
        size,
      }),
    [isScrolledFromTop, isScrolledFromBottom, size],
  );

  return { ref, onScroll, maskImage, isScrolledFromTop, isScrolledFromBottom };
}

export type { ScrollFadeMaskOptions, UseScrollFadeOptions, UseScrollFadeResult };
