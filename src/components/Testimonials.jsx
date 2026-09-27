"use client";

import { feedback } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedbackCard";

const Testimonials = () => (
  <section
    id="clients"
    className="flex flex-col relative bg-slate-50/50 py-24 sm:py-32 overflow-hidden items-center px-6">
    
    <div
      className="dg-reveal w-full flex flex-col items-center justify-center text-center sm:mb-20 mb-12 relative z-[1] max-w-3xl mx-auto"
    >
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100/50 rounded-full mb-6 w-fit mx-auto">
            <span className="font-poppins font-semibold text-xs text-secondary uppercase tracking-widest px-2">
              Leadership
            </span>
        </div>
        <h2 className="font-poppins font-bold text-[40px] sm:text-[50px] text-slate-900 leading-[1.1] tracking-tight">
          Our Leading Team
        </h2>
        <p className="font-poppins font-normal text-slate-500 text-[18px] sm:text-[20px] leading-[32px] max-w-[700px] mt-6">
          United in purpose, bound by a shared vision, our team stands ready to
          conquer challenges and achieve extraordinary results through the power of collaboration.
        </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-[1] max-w-[1280px] mx-auto px-6 lg:px-16">
      {feedback.map((card, index) => (
        <div
          key={card.id}
          className="dg-reveal"
          style={{ "--dg-reveal-delay": `${index * 150}ms` }}
        >
          <FeedbackCard {...card} />
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
