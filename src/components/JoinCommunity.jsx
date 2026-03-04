"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaDiscord, FaSlack, FaGithub } from "react-icons/fa";

const channels = [
  {
    id: "channel-1",
    icon: <FaDiscord className="w-10 h-10 text-[#5865F2]" />,
    title: "Discord Server",
    description: "Join 10,000+ developers chatting daily. Get help, share projects, and hang out.",
    buttonText: "Join Discord",
    bgColor: "bg-[#5865F2]/10",
    buttonColor: "bg-[#5865F2] hover:bg-[#4752C4] text-white",
  },
  {
    id: "channel-2",
    icon: <FaSlack className="w-10 h-10 text-[#E01E5A]" />,
    title: "Slack Workspace",
    description: "For professionals and partner organizations to collaborate directly with our team.",
    buttonText: "Request Access",
    bgColor: "bg-[#E01E5A]/10",
    buttonColor: "bg-[#E01E5A] hover:bg-[#C0194A] text-white",
  },
  {
    id: "channel-3",
    icon: <FaGithub className="w-10 h-10 text-slate-900" />,
    title: "GitHub Discussions",
    description: "Ask questions, propose features, and discuss architecture with maintainers.",
    buttonText: "View Discussions",
    bgColor: "bg-slate-100",
    buttonColor: "bg-slate-900 hover:bg-slate-800 text-white",
  },
];

const ChannelCard = ({ icon, title, description, buttonText, bgColor, buttonColor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="flex flex-col p-8 rounded-3xl bg-white border border-slate-100 shadow-sm relative group text-left"
  >
    <div className={`w-[80px] h-[80px] rounded-2xl ${bgColor} flex items-center justify-center mb-6`}>
      {icon}
    </div>
    <h4 className="font-poppins font-semibold text-[24px] text-slate-900 leading-[32px] mb-3">
      {title}
    </h4>
    <p className="font-poppins font-normal text-[16px] text-slate-500 leading-[26px] mb-8 flex-grow">
      {description}
    </p>
    <button className={`w-full py-4 rounded-xl font-poppins font-medium text-[16px] transition-colors duration-300 ${buttonColor}`}>
      {buttonText}
    </button>
  </motion.div>
);

const JoinCommunity = () => (
  <section className="flex flex-col relative bg-white py-24 sm:py-32 overflow-hidden items-center px-6">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-60 pointer-events-none" />
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center text-center sm:mb-20 mb-12 relative z-[1] max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100/50 rounded-full mb-6 w-fit mx-auto">
        <span className="font-poppins font-semibold text-xs text-green-700 uppercase tracking-widest px-2">
          Connect With Us
        </span>
      </div>
      <h2 className="font-poppins font-bold text-[40px] sm:text-[50px] text-slate-900 leading-[1.1] tracking-tight">
        Join the Conversation
      </h2>
      <p className="font-poppins font-normal text-slate-500 text-[18px] sm:text-[20px] leading-[32px] max-w-[700px] mt-6">
        Pick the platform you love. Whether you prefer real-time chat, async discussions, or professional networking, we are there.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-[1] max-w-[1280px] mx-auto px-6 lg:px-16">
      {channels.map((channel, index) => (
        <ChannelCard key={channel.id} {...channel} index={index} />
      ))}
    </div>
  </section>
);

export default JoinCommunity;
