"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { innovationShowcase } from "../constants";

const ShowcaseCard = ({ title, category, image, link, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="group relative overflow-hidden rounded-2xl cursor-pointer"
  >
    <div className="relative w-full h-[300px] sm:h-[400px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
    </div>

    <div className="absolute inset-0 p-8 flex flex-col justify-end">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/50 backdrop-blur-sm rounded-full border border-blue-400/20">
          {category}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-white mb-2 tracking-tight">
          {title}
        </h3>
        <div className="flex items-center text-blue-300 font-medium text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          Explore Project
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  </motion.div>
);

const InnovationShowcase = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-white overflow-hidden px-6 lg:px-16 w-full">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100/50 rounded-full">
                Our Work
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold font-poppins text-slate-900 leading-[1.15] tracking-tight"
            >
              Pioneering the Future of <br className="hidden sm:block" />
              <span className="text-blue-600">Digital Solutions</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-poppins font-medium rounded-lg transition-colors border-none shadow-sm flex items-center gap-2">
              View All Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {innovationShowcase.map((item, index) => (
            <ShowcaseCard key={item.id} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationShowcase;
