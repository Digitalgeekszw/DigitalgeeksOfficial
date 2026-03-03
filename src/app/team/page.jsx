import React from "react";
import PageHero from "../../components/PageHero";
import Testimonials from "../../components/Testimonials";
import { Navbar, Footer, CTA } from "../../components";
import styles from "../../style";

export default function TeamPage() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <PageHero 
        title="Our Leadership Team" 
        subtitle="Meet the passionate minds leading DigitalGeeks towards continuous innovation and success." 
      />

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Testimonials />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}
