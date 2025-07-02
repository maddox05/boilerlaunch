"use client";

import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  className,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc("https://via.placeholder.com/800x400?text=No+Image");
  };

  return (
    <img src={imgSrc} alt={alt} className={className} onError={handleError} />
  );
}
