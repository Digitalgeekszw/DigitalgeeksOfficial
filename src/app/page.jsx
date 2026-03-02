"use client";

import styles from "../style";
import {
  Services,
  About,
  CardDeal,
  CTA,
  Footer,
  Navbar,
  Stats,
  Testimonials,
  Hero,
} from "../components";

export default function Home() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <About />
          <Services />
          <CardDeal />
          <Testimonials />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}
