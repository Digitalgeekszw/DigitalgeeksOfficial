"use client";

import React from "react";
import styles from "../style";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-[90vh] bg-white overflow-hidden text-center px-6"
    >
      {/* Decorative ultra-subtle background gradients (Google style abstract washes) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-20">
        
        {/* Google style pill badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full mb-8 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          <p className="font-poppins font-medium text-sm text-slate-700 tracking-wide">
            Introducing the new standard for developers
          </p>
          <span className="text-slate-400">→</span>
        </motion.div>

        {/* Massive pristine typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-poppins font-semibold text-[50px] sm:text-[70px] md:text-[85px] text-slate-900 leading-[1.05] tracking-tight max-w-4xl"
        >
          The next generation <br className="hidden md:block"/>
          <span className="text-secondary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">digital workspace.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-poppins mt-8 text-slate-500 text-[18px] sm:text-[22px] leading-relaxed max-w-2xl font-normal tracking-wide"
        >
          Unite your team, collaborate seamlessly, and build the future of technology together. We empower businesses through world-class engineering.
        </motion.p>

        {/* Pill shaped actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex sm:flex-row flex-col gap-4 mt-12 w-full sm:w-auto"
        >
          <Link href="/contact" className="bg-secondary hover:bg-blue-700 text-white font-poppins font-medium px-8 py-4 rounded-full transition-shadow hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center text-[17px] w-full sm:w-auto">
            Get started
          </Link>
          <Link href="/services" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-poppins font-medium px-8 py-4 rounded-full transition-colors flex items-center justify-center text-[17px] w-full sm:w-auto">
            Explore services
          </Link>
        </motion.div>
      </div>

      {/* Video product representation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 w-full max-w-[1200px] mx-auto mt-20 sm:mt-24 px-6 sm:px-0 mb-12"
      >
        <div className="w-full flex justify-center">
          <video 
            className="w-full rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] object-cover aspect-video border border-slate-200/60"
            autoPlay 
            loop 
            muted 
            playsInline
            controls
          >
            <source src="https://pub-01b9a208b3354278b07d052222dd1f6a.r2.dev/videos/output1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
