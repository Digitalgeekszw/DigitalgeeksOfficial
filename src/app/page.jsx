import styles from "../style";
import {
  Services,
  About,
  CTA,
  Footer,
  Navbar,
  Stats,
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
          {/* Include teasers/sections linking to new pages */}
          <About />
          <Services />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}
