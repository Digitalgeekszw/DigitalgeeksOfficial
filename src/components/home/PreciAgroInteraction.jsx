"use client";

import { useContent } from "../../hooks/useContent";
import { productScreenKeys } from "../../constants/site";

/**
 * Shows a real PreciAgro interaction once an admin uploads one. Nothing is
 * rendered until then — the photograph carries the section on its own.
 */
export default function PreciAgroInteraction() {
  const { content } = useContent();
  const screen = content[productScreenKeys.preciagroInteraction];
  if (!screen) return null;

  return (
    <div className="mx-auto w-full max-w-dg-content px-dg-gutter py-16 sm:py-20">
      <div className="mx-auto max-w-[880px] overflow-hidden rounded-dg-lg bg-[#141519]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screen}
          alt="PreciAgro giving a farmer guidance about their crop"
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
