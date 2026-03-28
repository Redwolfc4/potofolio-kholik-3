"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

type ImageWithFallbackProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  fallbackSrc: string;
};

const UNOPTIMIZED_REMOTE_HOSTS = new Set(["media.licdn.com"]);

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function shouldBypassImageOptimization(src: string) {
  if (!isRemoteImage(src)) {
    return false;
  }

  try {
    return UNOPTIMIZED_REMOTE_HOSTS.has(new URL(src).hostname);
  } catch {
    return true;
  }
}

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
      unoptimized={props.unoptimized ?? shouldBypassImageOptimization(currentSrc)}
      loading={props.priority ? undefined : (props.loading ?? "lazy")}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
