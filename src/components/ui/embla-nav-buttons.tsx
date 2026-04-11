"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type EmblaNavButtonsProps = {
  mounted: boolean;
  prevDisabled: boolean;
  nextDisabled: boolean;
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
  prevClassName: string;
  nextClassName: string;
  iconClassName: string;
};

export function EmblaNavButtons({
  mounted,
  prevDisabled,
  nextDisabled,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  prevClassName,
  nextClassName,
  iconClassName,
}: EmblaNavButtonsProps) {
  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label={prevLabel}
        className={prevClassName}
      >
        <ChevronLeft className={iconClassName} />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label={nextLabel}
        className={nextClassName}
      >
        <ChevronRight className={iconClassName} />
      </button>
    </>
  );
}
