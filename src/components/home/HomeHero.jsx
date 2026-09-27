import Image from "next/image";
import { ActionLink, Container } from "../site/primitives";
import { SwipeeMark } from "./marks";

// A tile in the opening composition. Each one jumps to its product section.
const Tile = ({ href, className = "", children }) => (
  <a
    href={href}
    className={`group relative block overflow-hidden rounded-dg-lg ${className}`}
  >
    {children}
  </a>
);

const TileName = ({ children, dark }) => (
  <span className={`inline-flex items-center gap-1.5 font-display text-[15px] font-semibold ${dark ? "text-white" : "text-dg-ink"}`}>
    {children}
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-200 ease-dg group-hover:translate-y-0.5">
      <path d="M8 3v9M4.5 8.5 8 12l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

export default function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="bg-white pb-16 pt-[calc(var(--dg-nav-h)+40px)] sm:pb-24 sm:pt-[calc(var(--dg-nav-h)+72px)]">
      <Container>
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <h1 id="hero-title" className="dg-balance font-display text-dg-hero font-bold text-dg-ink md:col-span-7">
            Built for everyday progress.
          </h1>
          <div className="md:col-span-5 md:pb-2">
            <p className="dg-pretty max-w-[34ch] text-dg-lead text-dg-ink-2">
              We create technology that helps businesses grow, students learn and farmers make informed decisions.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <ActionLink href="#swipee">Explore our products</ActionLink>
              <ActionLink href="#company" variant="secondary">
                Meet DigitalGeeks
              </ActionLink>
            </div>
          </div>
        </div>

        {/* One dominant image, two supporting product tiles. */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 md:h-[clamp(420px,46vw,540px)] md:grid-cols-12 md:grid-rows-2">
          <Tile
            href="#preciagro"
            className="col-span-2 aspect-[4/3] bg-[#1d2a12] sm:aspect-[16/8] md:col-span-8 md:row-span-2 md:aspect-auto"
          >
            <Image
              src="/photos/preciagro-maize-field.jpg"
              alt="Young maize plants growing in rows of dark soil"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1060px) 820px, calc(100vw - 40px)"
              className="object-cover object-[center_60%] transition-transform duration-700 ease-dg group-hover:scale-[1.02]"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-20 sm:p-7 sm:pt-28">
              <TileName dark>PreciAgro</TileName>
              <span className="mt-1 block text-[15px] text-white">More clarity. From the ground up.</span>
            </span>
          </Tile>

          <Tile
            href="#swipee"
            className="flex aspect-square flex-col justify-between bg-dg-dark p-5 sm:aspect-[16/9] sm:p-7 md:col-span-4 md:aspect-auto"
          >
            <SwipeeMark className="h-10 w-10 sm:h-12 sm:w-12" disc="#fff" marks="#0a0b0d" />
            <span>
              <TileName dark>Swipee</TileName>
              <span className="mt-1 block text-[14px] leading-snug text-dg-on-dark-2 sm:text-[15px]">
                Your business. In your pocket.
              </span>
            </span>
          </Tile>

          <Tile
            href="#zimsensei"
            className="flex aspect-square flex-col justify-between bg-dg-surface-warm p-5 sm:aspect-[16/9] sm:p-7 md:col-span-4 md:aspect-auto"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/products/zimsensei-icon.png" alt="" width={180} height={180} className="h-10 w-10 rounded-[10px] sm:h-12 sm:w-12" />
            <span>
              <TileName>ZimSensei</TileName>
              <span className="mt-1 block text-[14px] leading-snug text-dg-ink-3 sm:text-[15px]">
                Understand your mistakes. Build your confidence.
              </span>
            </span>
          </Tile>
        </div>
      </Container>
    </section>
  );
}
