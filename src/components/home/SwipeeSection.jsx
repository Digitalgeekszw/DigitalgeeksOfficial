import { ActionLink, Container } from "../site/primitives";
import { SwipeeMark } from "./marks";
import SwipeeVisual from "./SwipeeVisual";

// Capabilities confirmed on swipeeup.store as part of the live pilot.
const points = [
  {
    title: "Phone-based checkout.",
    body: "Ring up a sale with the keypad or by scanning a barcode.",
  },
  {
    title: "Stock that stays organised.",
    body: "Every sale updates your stock, with alerts before items run low.",
  },
  {
    title: "A clearer view of your business.",
    body: "An owner dashboard shows daily takings and profit margins.",
  },
];

export default function SwipeeSection() {
  return (
    <section
      id="swipee"
      aria-labelledby="swipee-title"
      className="dg-on-dark scroll-mt-dg-nav bg-dg-dark py-dg-section text-dg-on-dark"
    >
      <Container className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="dg-reveal md:col-span-5 md:self-center">
          <p className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-white">
            <SwipeeMark className="h-6 w-6" disc="#fff" marks="#0a0b0d" />
            Swipee
          </p>
          <h2 id="swipee-title" className="dg-balance mt-5 font-display text-dg-h2 font-bold text-white">
            Your business. In&nbsp;your pocket.
          </h2>
          <p className="dg-pretty mt-5 max-w-[38ch] text-dg-lead text-dg-on-dark-2">
            Manage sales, track stock and understand your business from your phone.
          </p>
          <div className="mt-7">
            <ActionLink href="https://swipeeup.store" external variant="primary-dark">
              Explore Swipee
            </ActionLink>
          </div>

          <ul className="mt-12 space-y-5 border-t border-white/10 pt-8">
            {points.map((p) => (
              <li key={p.title} className="max-w-[44ch] text-[16px] leading-relaxed text-dg-on-dark-2">
                <span className="font-semibold text-white">{p.title}</span> {p.body}
              </li>
            ))}
          </ul>
        </div>

        <div className="dg-reveal md:col-span-7">
          <SwipeeVisual />
        </div>
      </Container>
    </section>
  );
}
