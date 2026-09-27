"use client";

import React from "react";
import PageHero from "../../components/PageHero";
import AboutComponent from "../../components/About";
import { Navbar, Footer, CTA } from "../../components";
import styles from "../../style";

export default function AboutPage() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <PageHero 
        title="About DigitalGeeks" 
        subtitle="The company behind Swipee, ZimSensei and PreciAgro." 
        imageSrc="/images/summit.png"
        cmsImageKey="about-hero-image"
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
