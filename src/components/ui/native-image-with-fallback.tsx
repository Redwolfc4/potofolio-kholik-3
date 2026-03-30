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
    // Using a native img here avoids remote optimization/proxy failures for third-party logo URLs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={currentSrc}
      alt={props.alt ?? ""}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
