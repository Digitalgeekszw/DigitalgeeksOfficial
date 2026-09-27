"use client";

import { useContent } from "../../hooks/useContent";

/**
 * Shows a real product screenshot uploaded through Admin → Website Content
 * under `contentKey`. Until one exists, renders `fallback` — an honest
 * typographic treatment, never an invented interface.
 *
 * The frame keeps a fixed aspect ratio either way, so swapping in a
 * screenshot never shifts the layout.
 */
export default function ProductScreen({
  contentKey,
  alt,
  width,
  height,
  fallback,
  className = "",
  frameClassName = "",
}) {
  const { content } = useContent();
  const src = contentKey ? content[contentKey] : null;

  return (
    <div className={className} style={{ aspectRatio: `${width} / ${height}` }}>
      {src ? (
        <div className={`h-full w-full overflow-hidden ${frameClassName}`}>
          {/* CMS files are served from R2, outside next/image's allowed hosts. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        fallback
      )}
    </div>
  );
}
