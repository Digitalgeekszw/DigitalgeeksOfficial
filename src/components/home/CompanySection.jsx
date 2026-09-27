import Image from "next/image";
import { ActionLink, Container } from "../site/primitives";

const areas = [
  { area: "Commerce", product: "Swipee", href: "#swipee" },
  { area: "Education", product: "ZimSensei", href: "#zimsensei" },
  { area: "Agriculture", product: "PreciAgro", href: "#preciagro" },
];

export default function CompanySection() {
  return (
    <section id="company" aria-labelledby="company-title" className="scroll-mt-dg-nav bg-white py-dg-section">
      <Container className="grid gap-12 md:grid-cols-12 md:items-center md:gap-10">
        <div className="dg-reveal md:col-span-6 md:pr-6">
          <p className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-dg-blue-strong">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/digitalgeeks-mark.png" alt="" width={64} height={39} className="h-4 w-auto" />
            DigitalGeeks
          </p>
          <h2 id="company-title" className="dg-balance mt-5 font-display text-dg-h2 font-bold text-dg-ink">
            Three products. One&nbsp;purpose.
          </h2>
          <p className="dg-pretty mt-5 max-w-[42ch] text-dg-lead text-dg-ink-2">
            We build practical technology around the challenges people face every day—in business, in education and on
            the farm.
          </p>
          <p className="dg-pretty mt-5 max-w-[52ch] text-dg-body text-dg-ink-3">
            DigitalGeeks is a community of developers, designers and builders who work closely together. We start from
            problems we see around us, like keeping track of a small shop, preparing for exams or reading a field, and
            build products that make them easier to handle.
          </p>

          <ul className="mt-10 border-t border-dg-line">
            {areas.map((a) => (
              <li key={a.product} className="border-b border-dg-line">
                <a href={a.href} className="group flex min-h-[52px] items-center justify-between gap-4">
                  <span className="text-[15px] text-dg-ink-3">{a.area}</span>
                  <span className="flex items-center gap-2 font-display text-[17px] font-semibold text-dg-ink">
                    {a.product}
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 text-dg-ink-3 transition-transform duration-200 ease-dg group-hover:translate-x-0.5">
                      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <ActionLink href="/about" variant="secondary">
              Discover DigitalGeeks
            </ActionLink>
          </div>
        </div>

        <div className="dg-reveal md:col-span-6">
          <div className="relative aspect-[1080/762] overflow-hidden rounded-dg-lg bg-dg-surface-2">
            <Image
              src="/photos/digitalgeeks-team.jpg"
              alt="Four members of the DigitalGeeks team working together around a laptop at an outdoor table"
              fill
              sizes="(min-width: 1060px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
