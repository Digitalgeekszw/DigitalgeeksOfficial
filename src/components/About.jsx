import React from "react";
import { features } from "../constants";
import styles, { layout } from "../style";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}>
    <div
      className={`w-[64px] h-[64px] rounded-full flex justify-center items-center bg-blue-50`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain filter invert opacity-80" style={{ filter: "brightness(0) saturate(100%) invert(35%) sepia(88%) saturate(3019%) hue-rotate(209deg) brightness(97%) contrast(97%)" }} />
      {/* The style above forces the SVG icons (which are likely white/light) to turn into the secondary blue color. A better way in production is importing React Icons, but we stick to existing assets here. */}
    </div>
    <div className="flex-1 flex flex-col ml-4">
      <h4 className="font-poppins font-semibold text-slate-900 text-[18px] leading-[23.4px] mb-2">
        {title}
      </h4>
      <p className="font-poppins font-normal text-slate-600 text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const About = () => {
  const openPDF = () => {
    window.open("/About.pdf", "_blank");
  };

  return (
    <section id="About" className={`${layout.section} bg-white py-20`}>
      <div className={layout.sectionInfo}>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-4 w-fit">
          <span className="font-poppins font-medium text-sm text-secondary uppercase tracking-widest">
            About Us
          </span>
        </div>
        <h2 className={`${styles.heading2} text-4xl`}>
          About <br className="sm:block hidden" /> DigitalGeeks
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-6 leading-relaxed`}>
          Digital Geeks is a community of innovative developers dedicated to
          creating exceptional digital solutions. We prioritize collaboration
          and innovation, working closely with our clients to exceed
          expectations. 
        </p>
        <p className={`${styles.paragraph} max-w-[470px] mt-4 leading-relaxed`}>
          Our mission is to drive success by delivering
          cutting-edge technology and fostering a supportive environment for our
          team. Together, we envision a world where technology is a force for
          good, empowering businesses and creating a brighter future for all.
        </p>

        <button 
          className="mt-10 bg-secondary text-white font-poppins font-medium px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          onClick={openPDF}
        >
          Discover More
        </button>
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default About;
