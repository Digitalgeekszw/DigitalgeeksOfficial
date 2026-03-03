import React from "react";
import PageHero from "../../components/PageHero";
import CardDeal from "../../components/CardDeal";
import { Navbar, Footer, CTA } from "../../components";
import styles from "../../style";

export default function CommunityPage() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <PageHero 
        title="Community & Culture" 
        subtitle="Join our dynamic community of creators, builders, and visionaries shaping the future of technology." 
      />

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="mt-16">
            <CardDeal />
          </div>
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}
