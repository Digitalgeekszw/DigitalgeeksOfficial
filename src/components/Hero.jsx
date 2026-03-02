import React from "react";
import styles from "../style";
import GetStarted from "./GetStarted";
// Replace robot with a cleaner block or an existing asset styled properly.
// For now we'll use a clean placeholder layout structure in place of the neon robot.
import { robot } from "../assets"; 

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY} pt-[120px] bg-white min-h-[90vh]`}
    >
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 relative z-10`}>
        
        {/* Subtle top badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200 mb-6 w-fit">
          <span className="w-2 h-2 rounded-full bg-secondary block"></span>
          <p className="font-poppins font-medium text-sm text-slate-700">
            Join the new standard for developers
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-extrabold ss:text-[72px] text-[52px] text-slate-900 ss:leading-[1.1] leading-[1.2] tracking-tight">
            The Next <br className="sm:block hidden" />
            <span className="text-secondary">Generation</span>
          </h1>
        </div>

        <h1 className="font-poppins font-extrabold ss:text-[68px] text-[52px] text-slate-900 ss:leading-[1.1] leading-[1.2] w-full mt-2 tracking-tight">
          Digital World
        </h1>
        
        <p className={`${styles.paragraph} max-w-[500px] mt-6 text-slate-600 text-[18px]`}>
          At Digital Geeks, we unite a passionate community of developers to
          create innovative solutions. With collaboration and support at our
          core, we deliver high-quality work that exceeds client expectations.
        </p>

        <div className="flex sm:flex-row flex-col gap-4 mt-10">
          <GetStarted />
          <a href="#Services" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-poppins font-medium px-8 py-3.5 rounded-lg transition-colors border border-slate-200 shadow-sm flex items-center justify-center">
            Explore Services
          </a>
        </div>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-16 relative`}>
        {/* Clean Hero Visual Container - replaces dark neon robot */}
        <div className="relative w-full h-[500px] max-w-lg mx-auto flex items-center justify-center">
            {/* Subtle background abstract shapes instead of neon gradients */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-slate-100 rounded-full blur-2xl opacity-80"></div>
            
            <div className="relative z-10 bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 p-8 w-[90%] backdrop-blur-sm overflow-hidden">
                <div className="w-full h-8 flex gap-2 items-center border-b border-slate-100 mb-6 pb-4">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
                {/* Code/Tech Illustration mockup */}
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
                  <div className="h-4 w-1/2 bg-blue-50 rounded"></div>
                  <div className="h-4 w-5/6 bg-slate-50 rounded"></div>
                  <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
                  <div className="h-4 w-full bg-slate-50 rounded mt-8"></div>
                  <div className="h-4 w-4/5 bg-slate-100 rounded"></div>
                  <div className="flex gap-4 mt-6">
                    <div className="h-10 w-24 bg-secondary rounded-lg opacity-90"></div>
                    <div className="h-10 w-24 bg-slate-100 rounded-lg"></div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
