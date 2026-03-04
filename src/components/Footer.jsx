"use client";

import styles from "../style";
import { footerLinks, socialMedia } from "../constants";
import Link from "next/link";

// We will use inline SVG icons for Google-like minimalism
const EarthIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

import Image from "next/image";

const Footer = () => (
  <footer className="bg-slate-50 text-slate-500 pt-14 pb-6 font-sans border-t border-slate-200">
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16">
      
      {/* Top Header Section: Logo & Socials (Google Style) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-10 border-b border-slate-200">
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="DigitalGeeks" 
              width={180}
              height={50}
              className="w-[140px] sm:w-[180px] h-auto object-contain cursor-pointer opacity-90 hover:opacity-100 transition-opacity" 
            />
          </Link>
          <span className="hidden sm:inline-block text-[14px] ml-4 pl-4 border-l border-slate-200 text-slate-500">
            Empowering innovation through collaboration.
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[14px] mr-2 text-slate-500">Follow us</span>
          {socialMedia.map((social) => {
            const Icon = social.icon;
            return (
              <a 
                key={social.id} 
                href={social.link} 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-500 hover:text-blue-600"
              >
                <Icon className="w-5 h-5 transition-colors" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
        {/* About column */}
        <div className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-2 pr-0 md:pr-12">
           <h4 className="text-slate-900 text-[16px] font-medium mb-6">About DigitalGeeks</h4>
           <p className="text-[14px] leading-relaxed mb-6 max-w-sm text-slate-600">
             We craft digital experiences that transform businesses and build the future. Our commitment to excellence drives every project we undertake.
           </p>
           <div className="flex flex-col gap-3">
             <span className="text-[14px] text-slate-600 flex items-center gap-2">
               Poland (Operates Globally)
             </span>
           </div>
        </div>

        {/* Dynamic Links */}
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className="flex flex-col">
            <h4 className="text-slate-900 text-[16px] font-medium mb-6">
              {footerlink.title}
            </h4>
            <ul className="flex flex-col gap-4">
              {footerlink.links.map((link) => (
                <li key={link.name}>
                  {link.link.startsWith("http") ? (
                    <a href={link.link} target="_blank" rel="noreferrer" className="text-[14px] text-slate-600 hover:text-blue-600 transition-colors w-fit">
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.link} className="text-[14px] text-slate-600 hover:text-blue-600 transition-colors w-fit">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar: Legal & Region */}
      <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-6">
        <div className="flex items-center gap-6 flex-wrap justify-center lg:justify-start">
          <Link href="/" className="text-[20px] font-bold text-slate-800 tracking-tight mr-4">
            Digital<span className="text-blue-500 font-light">Geeks</span>
          </Link>
          <Link href="/privacy" className="text-[13px] text-slate-600 hover:text-blue-600 transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[13px] text-slate-600 hover:text-blue-600 transition-colors">Terms</Link>
          <Link href="/about" className="text-[13px] text-slate-600 hover:text-blue-600 transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4 text-[13px] text-slate-500">
          <div className="flex items-center hover:text-blue-600 cursor-pointer transition-colors">
            <EarthIcon />
            <span>English (United States)</span>
          </div>
          <span className="hidden sm:block">|</span>
          <span>© {new Date().getFullYear()} DigitalGeeks</span>
        </div>
      </div>
      
    </div>
  </footer>
);

export default Footer;
