import { ActionLink, Container } from "../site/primitives";

export default function ServicesTeaser() {
  return (
    <section aria-labelledby="services-title" className="border-t border-dg-line bg-dg-surface-2 py-16 sm:py-20">
      <Container className="dg-reveal flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[560px]">
          <h2 id="services-title" className="dg-balance font-display text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.025em] text-dg-ink">
            Have something worth building?
          </h2>
          <p className="dg-pretty mt-4 text-dg-body text-dg-ink-2">
            We also work with organisations to design and develop useful digital products.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <ActionLink href="/services" variant="outline" className="bg-white">
            Explore our services
          </ActionLink>
          <ActionLink href="/contact" variant="secondary">
            Talk to us
          </ActionLink>
        </div>
      </Container>
    </section>
  );
}
