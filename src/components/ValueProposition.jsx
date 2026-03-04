"use client";

import { motion } from "framer-motion";
import { valuePropositions } from "../constants";

const ValuePropositionItem = ({ title, description, icon: Icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative flex flex-col p-8 bg-white/50 hover:bg-white rounded-2xl border border-slate-200/60 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
  >
    {/* Subtle animated background gradient on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

    <div className="relative z-10 flex flex-col h-full">
      <div className="w-14 h-14 rounded-xl bg-blue-100/80 group-hover:bg-blue-600 flex items-center justify-center mb-6 transition-colors duration-300">
        <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
      </div>
      
      <h3 className="text-xl font-bold font-poppins text-slate-900 mb-3 tracking-tight">
        {title}
      </h3>
      
      <p className="text-slate-600 font-poppins leading-relaxed flex-1">
        {description}
      </p>
      
      <div className="mt-6 flex items-center text-blue-600 font-medium font-poppins text-sm group-hover:text-blue-700 transition-colors">
        Learn more 
        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </motion.div>
);

const ValueProposition = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-slate-50/50 overflow-hidden px-6 lg:px-16 w-full">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100/50 rounded-full">
              Enterprise Grade
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-poppins text-slate-900 leading-[1.15] tracking-tight mb-6"
          >
            Delivering Value at <span className="text-blue-600">Scale</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 font-poppins leading-relaxed"
          >
            We combine deep technical expertise with strategic vision to engineer solutions that empower industry leaders to accelerate their digital transformation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuePropositions.map((prop, index) => (
            <ValuePropositionItem key={prop.id} {...prop} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
