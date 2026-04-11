"use client";

import { DependencyList, RefObject, useEffect, useState } from "react";

type UseExpandableTextOptions = {
  checkDelays?: number[];
};

export function useExpandableText(
  ref: RefObject<HTMLElement | null>,
  isExpanded: boolean,
  deps: DependencyList,
  options?: UseExpandableTextOptions,
) {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (!ref.current) return;

      const { scrollHeight, clientHeight } = ref.current;
      setIsTruncated(scrollHeight > clientHeight || isExpanded);
    };

    const timers = (options?.checkDelays ?? [0]).map((delay) =>
      setTimeout(checkTruncation, delay),
    );

    window.addEventListener("resize", checkTruncation);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", checkTruncation);
    };
  }, [ref, isExpanded, options?.checkDelays, ...deps]);

  return isTruncated;
}
