import React from "react";
import NextLink from "next/link";

const CTA = () => {
  return (
    <section className="dg-site bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-dg-content rounded-dg-lg bg-dg-surface-2 px-6 py-14 sm:px-14 sm:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <h2 className="dg-balance font-display text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.025em] text-dg-ink">
              Have something worth building?
            </h2>
            <p className="dg-pretty mt-4 text-dg-body text-dg-ink-2">
              Tell us what you are working on and we will get back to you.
            </p>
          </div>
          <NextLink
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center self-start rounded-full bg-dg-blue-strong px-6 text-[16px] font-medium text-white transition-colors duration-200 hover:bg-[#0b56bd] md:self-auto"
          >
            Talk to us
          </NextLink>
        </div>
      </div>
    </section>
  );
};

export default CTA;
