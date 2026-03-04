"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaMicrophoneAlt, FaUsers } from "react-icons/fa";

const highlights = [
  {
    id: "highlight-1",
    icon: <FaUsers className="w-8 h-8 text-secondary" />,
    title: "Global Meetups",
    description: "Connect with local chapters and attend our annual global summit to network with peers.",
  },
  {
    id: "highlight-2",
    icon: <FaCode className="w-8 h-8 text-secondary" />,
    title: "Open Source Projects",
    description: "Contribute to our open-source repositories and collaborate with developers worldwide.",
  },
  {
    id: "highlight-3",
    icon: <FaMicrophoneAlt className="w-8 h-8 text-secondary" />,
    title: "Tech Talks & Webinars",
    description: "Join weekly deep-dives and panel discussions featuring industry-leading experts.",
  },
];

const HighlightCard = ({ icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="flex flex-col items-center text-center p-8 rounded-[20px] bg-white shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 relative group"
  >
    <div className="w-[64px] h-[64px] rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h4 className="font-poppins font-semibold text-[22px] text-slate-900 leading-[32px] mb-3">
      {title}
    </h4>
    <p className="font-poppins font-normal text-[16px] text-slate-500 leading-[26px]">
      {description}
    </p>
  </motion.div>
);

const CommunityHighlights = () => (
  <section className="flex flex-col relative bg-slate-50/50 py-24 sm:py-32 overflow-hidden items-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center text-center sm:mb-20 mb-12 relative z-[1] max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100/50 rounded-full mb-6 w-fit mx-auto">
        <span className="font-poppins font-semibold text-xs text-secondary uppercase tracking-widest px-2">
          Programs & Events
        </span>
      </div>
      <h2 className="font-poppins font-bold text-[40px] sm:text-[50px] text-slate-900 leading-[1.1] tracking-tight">
        Build, Learn, and Grow Together
      </h2>
      <p className="font-poppins font-normal text-slate-500 text-[18px] sm:text-[20px] leading-[32px] max-w-[700px] mt-6">
        Whether you are looking to contribute to cutting-edge projects, learn from top minds, or simply meet like-minded tech enthusiasts, there's a place for you here.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-[1] max-w-[1280px] mx-auto px-6 lg:px-16">
      {highlights.map((highlight, index) => (
        <HighlightCard key={highlight.id} {...highlight} index={index} />
      ))}
    </div>
  </section>
);

export default CommunityHighlights;
