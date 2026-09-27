"use client";

import { useContent } from "../../hooks/useContent";
import { productScreenKeys } from "../../constants/site";
import { SwipeeMark } from "./marks";

const Screen = ({ src, alt, className = "" }) => (
  <div className={`overflow-hidden rounded-[28px] bg-black ring-1 ring-white/10 ${className}`} style={{ aspectRatio: "9 / 19.5" }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} width={900} height={1950} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
  </div>
);

/**
 * Real Swipee screens when an admin has uploaded them; otherwise a plain
 * statement of what is available today and what is still planned.
 */
export default function SwipeeVisual() {
  const { content } = useContent();
  const checkout = content[productScreenKeys.swipeeCheckout];
  const summary = content[productScreenKeys.swipeeSummary];

  if (checkout) {
    return (
      <div className="flex items-end justify-center gap-4 sm:gap-6">
        <Screen src={checkout} alt="Swipee checkout screen on a phone" className="w-[58%] max-w-[340px]" />
        {summary && (
          <Screen src={summary} alt="Swipee business summary screen" className="w-[42%] max-w-[260px] translate-y-[-8%]" />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[420px] flex-col justify-between rounded-dg-lg bg-[#141519] p-7 sm:p-10 md:min-h-[560px]">
      <SwipeeMark className="h-20 w-20 sm:h-28 sm:w-28" disc="#fff" marks="#141519" />

      <div className="mt-16">
        <p className="flex items-center gap-2 text-[14px] font-medium text-white">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-dg-green" />
          Available now · Live pilot in Zimbabwe
        </p>
        <p className="dg-balance mt-4 font-display text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
          Checkout, stock control and an owner dashboard.
        </p>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-[14px] font-medium text-white">Planned</p>
          <p className="mt-1 max-w-[46ch] text-[15px] leading-relaxed text-dg-on-dark-2">
            Digital payments are in development and depend on partner approval. They are not yet available.
          </p>
        </div>
      </div>
    </div>
  );
}
