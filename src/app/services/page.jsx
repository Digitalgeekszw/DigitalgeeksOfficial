import React from "react";
import PageHero from "../../components/PageHero";
import ServicesComponent from "../../components/Services";
import { Navbar, Footer, CTA } from "../../components";
import styles from "../../style";

export default function ServicesPage() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <PageHero 
        title="Our Services" 
        subtitle="Comprehensive digital solutions designed to accelerate your business growth and transform your vision into reality." 
      />

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <ServicesComponent />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}
