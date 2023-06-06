import React, { useRef } from "react";
import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import YouTube from "react-youtube";
import { useInView } from "react-intersection-observer";

const CardDeal = () => {
  const videoId = "svtDMM82PZY";
  const videoRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust this threshold as needed
  });

  // Autoplay the video when the section is in view
  if (inView) {
    const player = videoRef.current.internalPlayer;
    if (player) {
      player.playVideo();
    }
  }

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

      <div className={layout.sectionImg} ref={ref}>
        <YouTube
          videoId={videoId}
          className="w-[100%] h-[100%]"
          opts={{
            playerVars: {
              autoplay: 0, // Set autoplay to 0 to prevent initial autoplay
            },
          }}
          ref={videoRef}
        />
      </div>
    </section>
  );
};

export default CardDeal;
