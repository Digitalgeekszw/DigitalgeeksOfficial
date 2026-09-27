"use client";

import React from 'react';
import Image from 'next/image';
import { useContent } from '../hooks/useContent';

const PageHero = ({ title, subtitle, badge = "DigitalGeeks", imageSrc = "/images/about-hero-visual.png", cmsImageKey }) => {
  const { content } = useContent();
  const resolvedSrc = (cmsImageKey && content[cmsImageKey]) || imageSrc;

  return (
    <section className="dg-site relative w-full bg-white pb-16 pt-[calc(var(--dg-nav-h)+48px)] sm:pb-24 sm:pt-[calc(var(--dg-nav-h)+80px)]">
      <div className="mx-auto flex w-full max-w-dg-content flex-col gap-12 px-dg-gutter md:flex-row md:items-center md:gap-16">

        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-semibold text-dg-blue-strong">
            {badge}
          </p>
          <h1 className="dg-balance mt-4 font-display text-dg-hero font-bold text-dg-ink">
            {title}
          </h1>
          {subtitle && (
            <p className="dg-pretty mt-6 max-w-[40ch] text-dg-lead text-dg-ink-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-full md:max-w-[440px] md:flex-1">
          <div className="relative aspect-square w-full overflow-hidden rounded-dg-lg bg-dg-surface-2">
            <Image
              src={resolvedSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1060px) 440px, 100vw"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PageHero;
