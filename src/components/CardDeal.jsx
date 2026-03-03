"use client";

import React from "react";
import styles, { layout } from "../style";

const CardDeal = () => {
  return (
    <section id="Community" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Community and Culture: <br className="sm:block hidden" /> DigitalGeeks
          Community
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Digital Geeks is a community-driven company that brings together
          passionate developers to collaborate, innovate, and excel. Our
          supportive environment encourages knowledge sharing, while industry
          partnerships and engaging events create valuable opportunities for
          growth. We value every voice and strive to create a vibrant community
          that thrives on creativity and excellence.
        </p>

        {/* <Button styles={`mt-10`}>About</Button> */}
      </div>

      <div className={layout.sectionImg}>
        <div className="w-full h-full rounded-[20px] overflow-hidden shadow-2xl border border-[#dadce0]">
           <video 
              src="https://pub-01b9a208b3354278b07d052222dd1f6a.r2.dev/videos/output2.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
           />
        </div>
      </div>
    </section>
  );
};

export default CardDeal;
