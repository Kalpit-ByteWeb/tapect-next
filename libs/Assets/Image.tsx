'use client';
import React, { useEffect, useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  fallbackSrc?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  style,
  fallbackSrc,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    if (fallbackSrc && fallbackSrc.length > 0) {
      setImageSrc(fallbackSrc);
    }
  };

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      style={style}
      onError={handleError}
      {...props}
    />
  );
};

export default Image;
