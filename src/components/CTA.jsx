"use client";

import React from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="sm:py-24 py-12 px-6 flex justify-center bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[1280px] bg-blue-50/80 rounded-[40px] px-6 py-16 sm:py-24 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
           <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200 rounded-full blur-[80px]"></div>
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-300 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-blue-100 mb-8 shadow-sm">
            <span className="font-poppins font-semibold text-xs text-secondary uppercase tracking-widest px-2">
              Get Started
            </span>
          </div>
          
          <h2 className="font-poppins font-bold text-[32px] ss:text-[40px] sm:text-[56px] text-slate-900 leading-[1.1] tracking-tight mb-6">
            Ready to build <br className="hidden sm:block"/>
            <span className="text-secondary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">the future?</span>
          </h2>
          
          <p className="font-poppins text-slate-600 text-[18px] sm:text-[20px] leading-relaxed mb-10 max-w-lg">
            Discuss your next big software project with our expert engineering team. We're ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <NextLink 
              href="/contact" 
              className="bg-secondary hover:bg-blue-700 text-white font-poppins font-medium px-10 py-4 text-[18px] rounded-full transition-shadow hover:shadow-xl hover:shadow-blue-500/20 w-full sm:w-auto text-center"
            >
              Book a Free Consultation
            </NextLink>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
