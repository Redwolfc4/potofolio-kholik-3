"use client";

import { useEffect, useState, type ImgHTMLAttributes } from "react";

type NativeImageWithFallbackProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  fallbackSrc: string;
};

export default function NativeImageWithFallback({
  src,
  fallbackSrc,
  onError,
  ...props
}: NativeImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
