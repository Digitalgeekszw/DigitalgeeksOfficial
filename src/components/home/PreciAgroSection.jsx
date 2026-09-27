import Image from "next/image";
import { ActionLink } from "../site/primitives";
import PreciAgroInteraction from "./PreciAgroInteraction";

export default function PreciAgroSection() {
  return (
    <section id="preciagro" aria-labelledby="preciagro-title" className="dg-on-dark scroll-mt-dg-nav bg-dg-dark">
      <div className="relative isolate flex min-h-[600px] items-end overflow-hidden sm:min-h-[680px] md:min-h-[min(820px,92vh)]">
        <Image
          src="/photos/preciagro-maize-field.jpg"
          alt="Rows of young maize plants in dark, freshly worked soil"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-[35%_center] md:object-center"
        />
        {/* Scrim keeps the copy at AA contrast over any part of the photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/0 md:bg-gradient-to-r md:from-black/75 md:via-black/35 md:to-black/0"
        />

        <div className="mx-auto w-full max-w-dg-content px-dg-gutter pb-14 pt-40 sm:pb-20 md:pb-24">
          <div className="dg-reveal max-w-[560px]">
            <p className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/preciagro-icon.png" alt="" width={64} height={64} className="h-6 w-6 rounded-md" />
              PreciAgro
            </p>
            <h2 id="preciagro-title" className="dg-balance mt-5 font-display text-dg-h2 font-bold text-white">
              More clarity. From the ground&nbsp;up.
            </h2>
            <p className="dg-pretty mt-5 max-w-[40ch] text-dg-lead text-white/90">
              Agricultural intelligence to help farmers understand crop conditions and decide what to do next.
            </p>
            <div className="mt-7">
              <ActionLink href="https://preciagro.com" external variant="primary-dark">
                Explore PreciAgro
              </ActionLink>
            </div>
          </div>
        </div>
      </div>

      <PreciAgroInteraction />
    </section>
  );
}
