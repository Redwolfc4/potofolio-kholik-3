"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

type ImageWithFallbackProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  fallbackSrc: string;
};

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
