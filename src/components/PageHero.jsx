"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PageHero = ({ title, subtitle, badge = "DigitalGeeks" }) => {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-[120px] pb-[80px] sm:pt-[160px] sm:pb-[100px]">

      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #334155 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top subtle gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[420px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.09) 0%, transparent 72%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-start text-left min-w-0">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 border border-slate-200/60 shadow-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-poppins font-medium text-sm text-slate-700 tracking-wide">
              {badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-poppins font-extrabold text-[48px] sm:text-[68px] md:text-[80px] text-slate-900 leading-[1.0] tracking-tighter mb-7"
          >
            {title}
          </motion.h1>

          {/* Divider accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-20 h-[3px] rounded-full bg-gradient-to-r from-blue-600 to-indigo-400 mb-8 origin-left"
          />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-poppins font-normal text-slate-600 text-[18px] sm:text-[21px] leading-[1.7] max-w-[540px]"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Right: Hero Visual Image */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex justify-center items-center w-full max-w-[580px] lg:max-w-none"
        >
          <div className="relative w-full aspect-square max-w-[480px] rounded-[2.5rem] overflow-hidden shadow-[0_32px_80px_-12px_rgba(37,99,235,0.2)] border border-slate-100">
            <Image
              src="/images/about-hero-visual.png"
              alt="Digital Innovation Network"
              fill
              className="object-cover"
              sizes="(max-width: 1060px) 100vw, 480px"
              priority
            />
            {/* Overlay shimmer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-indigo-500/5 pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PageHero;
