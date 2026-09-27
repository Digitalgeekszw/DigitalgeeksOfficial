"use client";

import React from "react";
import { features } from "../constants";
import Image from "next/image";
import { useContent } from "../hooks/useContent";

const FeatureCard = ({ icon: Icon, title, content, index }) => (
  <div
    className="dg-reveal group flex flex-col p-8 sm:p-10 rounded-[2rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500"
    style={{ "--dg-reveal-delay": `${index * 100}ms` }}
  >
    <div className="w-16 h-16 rounded-2xl flex justify-center items-center bg-white shadow-sm text-blue-600 mb-8 border border-slate-100 group-hover:-translate-y-2 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
      {typeof Icon === 'function' ? (
        <Icon className="w-8 h-8" />
      ) : (
        <Image 
          src={Icon} 
          alt={title} 
          width={32}
          height={32}
          className="w-[50%] h-[50%] object-contain filter invert opacity-80" 
        />
      )}
    </div>
    <h4 className="font-poppins font-semibold text-slate-900 text-2xl tracking-tight mb-4">
      {title.replace(":", "")}
    </h4>
    <p className="font-poppins font-normal text-slate-600 text-[17px] leading-relaxed">
      {content}
    </p>
  </div>
);

const About = () => {
  const { content } = useContent();
  const aboutTeamImage = content["about-team-image"] || "/photos/digitalgeeks-team.jpg";

  const openPDF = () => {
    window.open("/About.pdf", "_blank");
  };

  return (
    <section id="About" className="w-full bg-white py-16 sm:py-24 relative overflow-hidden">

      {/* ── Section 1: Mission + Team Photo Side-by-Side ───────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 mb-28 sm:mb-36">

          {/* Left: Team Photo */}
          <div
            className="dg-reveal flex-1 w-full"
          >
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-16px_rgba(0,0,0,0.14)] border border-slate-100">
              <Image
                src={aboutTeamImage}
                alt="DigitalGeeks team collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 1060px) 100vw, 50vw"
              />
              {/* Subtle overlay */}
            </div>

          </div>

          {/* Right: Text */}
          <div
            className="dg-reveal flex-1 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/80 rounded-full border border-slate-200/60 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-poppins font-medium text-sm text-slate-700 tracking-wide">Who we are</span>
            </div>

            <h2 className="font-poppins font-bold text-[32px] ss:text-[40px] sm:text-[54px] text-slate-900 leading-[1.1] sm:leading-[1.05] tracking-tighter mb-6">
              Building useful products, together.
            </h2>

            <p className="font-poppins font-normal text-slate-600 text-[18px] leading-[1.75] mb-5 max-w-[500px]">
              Digital Geeks is a community of innovative developers dedicated to
              creating exceptional digital solutions. We prioritize collaboration
              and innovation, working closely with our clients to exceed expectations.
            </p>
            <p className="font-poppins font-normal text-slate-600 text-[18px] leading-[1.75] mb-10 max-w-[500px]">
              Today we build three products of our own: Swipee for small
              businesses, ZimSensei for learners and PreciAgro for farmers. We
              also help organisations design and develop their own digital products.
            </p>

            <button
              className="group flex items-center gap-3 bg-slate-900 hover:bg-blue-600 text-white font-poppins font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-blue-600/20"
              onClick={openPDF}
            >
              <span className="text-[17px]">Discover our story</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Section 2: Core Values Cards ────────────────────────────── */}
        <div
          className="dg-reveal text-center mb-14"
        >
          <h3 className="font-poppins font-bold text-[34px] sm:text-[44px] text-slate-900 tracking-tight">
            Our Core Values
          </h3>
          <p className="font-poppins text-slate-500 text-[18px] mt-4 max-w-xl mx-auto leading-relaxed">
            The principles that guide everything we build and every relationship we foster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} {...feature} index={index} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default About;
