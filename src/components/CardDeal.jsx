"use client";

import React from "react";
import styles, { layout } from "../style";
import Image from "next/image";

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
        <div className="w-full h-full rounded-[24px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-slate-200/60 relative aspect-square sm:aspect-auto sm:h-[450px]">
           <Image 
              src="/images/post.png"
              alt="Community and Culture"
              fill
              className="object-cover"
              sizes="(max-width: 1060px) 100vw, 50vw"
           />
        </div>
      </div>
    </section>
  );
};

export default CardDeal;
