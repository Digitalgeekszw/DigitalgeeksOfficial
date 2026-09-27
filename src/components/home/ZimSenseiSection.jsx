import { ActionLink, Container } from "../site/primitives";
import ZimSenseiVisual from "./ZimSenseiVisual";

export default function ZimSenseiSection() {
  return (
    <section
      id="zimsensei"
      aria-labelledby="zimsensei-title"
      className="scroll-mt-dg-nav bg-dg-surface-warm py-dg-section"
    >
      <Container>
        <div className="dg-reveal grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-[#007a55]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/zimsensei-icon.png" alt="" width={180} height={180} className="h-6 w-6 rounded-md" />
              ZimSensei
            </p>
            <h2 id="zimsensei-title" className="dg-balance mt-5 font-display text-dg-h2 font-bold text-dg-ink">
              Understand your mistakes. Build your confidence.
            </h2>
          </div>
          <div className="md:col-span-5 md:pb-1">
            <p className="dg-pretty max-w-[40ch] text-dg-lead text-dg-ink-2">
              Practise exam questions, get examiner-style feedback and discover what to work on next.
            </p>
            <div className="mt-6">
              <ActionLink
                href="https://zimsensei.com"
                external
                variant="plain"
                className="bg-[#007a55] text-white hover:bg-[#00664a]"
              >
                Explore ZimSensei
              </ActionLink>
            </div>
          </div>
        </div>

        <div className="dg-reveal mt-12 sm:mt-16">
          <ZimSenseiVisual />
        </div>

        <p className="dg-reveal mt-10 max-w-[60ch] text-[16px] leading-relaxed text-dg-ink-3">
          Built for students from Grade&nbsp;7 to A-Level, with dedicated spaces for teachers and parents to follow
          progress.
        </p>
      </Container>
    </section>
  );
}
