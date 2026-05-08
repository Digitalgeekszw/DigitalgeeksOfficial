"use client";

import React from "react";
import PageHero from "../../components/PageHero";
import AboutComponent from "../../components/About";
import { Navbar, Footer, CTA } from "../../components";
import styles from "../../style";
import { useContent } from "../../hooks/useContent";

export default function AboutPage() {
  const { content } = useContent();
  const aboutHeroImage = content["about-hero-image"] || "/images/summit.png";

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <PageHero 
        title="About DigitalGeeks" 
        subtitle="Learn about our vision, mission, and the core values that drive our team towards digital excellence." 
        imageSrc={aboutHeroImage}
      />

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <AboutComponent />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}
