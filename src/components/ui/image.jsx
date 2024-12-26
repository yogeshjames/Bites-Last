'use client'

import NextImage from 'next/image'
import { useState } from 'react'

export function Image({ 
  src, 
  alt, 
  fallbackSrc = '/placeholder.svg',
  fill,
  style,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)

  if (!src && !fallbackSrc) {
    return null
  }

  return (
    <NextImage
      {...props}
      src={imgSrc}
      alt={alt || ''}
      fill={fill}
      style={fill ? { ...style } : undefined}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
} 