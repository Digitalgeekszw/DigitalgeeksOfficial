import React from "react";
import PageHero from "../../components/PageHero";
import CardDeal from "../../components/CardDeal";
import { Navbar, Footer, CTA, CommunityHighlights } from "../../components";
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
        imageSrc="/images/post.png"
        cmsImageKey="community-hero-image"
      />

      <div className={`bg-primary w-full`}>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <div className="mt-16">
              <CardDeal />
            </div>
          </div>
        </div>

        <CommunityHighlights />

        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <CTA />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
