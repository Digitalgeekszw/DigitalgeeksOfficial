"use client";

import React from "react";
import { features } from "../constants";
import { motion } from "framer-motion";
import Image from "next/image";

const FeatureCard = ({ icon: Icon, title, content, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group flex flex-col p-8 sm:p-10 rounded-[2rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500"
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
  </motion.div>
);

const About = () => {
  const openPDF = () => {
    window.open("/About.pdf", "_blank");
  };

  return (
    <section id="About" className="w-full bg-white py-16 sm:py-24 relative overflow-hidden">

      {/* ── Section 1: Mission + Team Photo Side-by-Side ───────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 mb-28 sm:mb-36">

          {/* Left: Team Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-16px_rgba(0,0,0,0.14)] border border-slate-100">
              <Image
                src="/images/about-team.png"
                alt="DigitalGeeks team collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 1060px) 100vw, 50vw"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent pointer-events-none" />
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-[-48px] ml-6 sm:ml-10 relative z-10 inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-poppins font-bold text-xl flex-shrink-0">
                40+
              </div>
              <div>
                <p className="font-poppins font-semibold text-slate-900 text-[15px] leading-tight">Team Members</p>
                <p className="font-poppins font-normal text-slate-500 text-[13px]">across Zimbabwe & beyond</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/80 rounded-full border border-slate-200/60 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-poppins font-medium text-sm text-slate-700 tracking-wide">Who we are</span>
            </div>

            <h2 className="font-poppins font-bold text-[32px] ss:text-[40px] sm:text-[54px] text-slate-900 leading-[1.1] sm:leading-[1.05] tracking-tighter mb-6">
              Building the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                future
              </span>
              , together.
            </h2>

            <p className="font-poppins font-normal text-slate-600 text-[18px] leading-[1.75] mb-5 max-w-[500px]">
              Digital Geeks is a community of innovative developers dedicated to
              creating exceptional digital solutions. We prioritize collaboration
              and innovation, working closely with our clients to exceed expectations.
            </p>
            <p className="font-poppins font-normal text-slate-600 text-[18px] leading-[1.75] mb-10 max-w-[500px]">
              Our mission is to drive success by delivering cutting-edge technology
              and fostering a supportive environment for our team — empowering
              businesses and creating a brighter future for all.
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
          </motion.div>
        </div>

        {/* ── Section 2: Core Values Cards ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h3 className="font-poppins font-bold text-[34px] sm:text-[44px] text-slate-900 tracking-tight">
            Our Core Values
          </h3>
          <p className="font-poppins text-slate-500 text-[18px] mt-4 max-w-xl mx-auto leading-relaxed">
            The principles that guide everything we build and every relationship we foster.
          </p>
        </motion.div>

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
