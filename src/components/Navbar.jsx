"use client";

import { useState, useEffect } from "react";
import { close, menu } from "../assets";
import { navLinks } from "../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    const footerSection = document.getElementById("Contact");
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`w-full flex py-4 justify-between items-center navbar fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm px-6 sm:px-16" : "bg-transparent px-6 sm:px-16"
      }`}
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="DigitalGeeks Logo" className="w-[40px] h-auto object-contain opacity-90 rounded-md" />
          <span className="font-poppins font-bold text-xl text-slate-800 hidden sm:block tracking-tight">
            DigitalGeeks
          </span>
        </Link>
      </div>

      <ul className="list-none sm:flex hidden justify-center items-center flex-1">
        {navLinks.map((nav, index) => (
          (nav.id !== "join") && (
            <li
              key={nav.id}
              className={`font-poppins font-medium cursor-pointer text-[15px] transition-colors duration-200 ${
                pathname === nav.link ? "text-secondary" : "text-slate-600 hover:text-secondary"
              } mr-10`}
            >
              <Link href={nav.link}>{nav.title}</Link>
            </li>
          )
        ))}
      </ul>
      
      {/* Join button for desktop */}
      <div className="hidden sm:flex items-center">
         {navLinks.map((nav) => (
           nav.id === "join" && (
             <Link
                key={nav.id}
                href={nav.link}
                className="bg-secondary px-6 py-2.5 rounded-md font-poppins font-medium text-[15px] text-white hover:bg-blue-700 transition-colors shadow-sm">
                {nav.title}
             </Link>
           )
         ))}
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        {/* We use standard menu icon, but tint it dark since background is likely light */}
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          style={{ filter: "invert(1)" }} // invert because original might be white
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-xl shadow-lg sidebar border border-slate-100`}>
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] w-full ${
                  pathname === nav.link ? "text-secondary" : "text-slate-700"
                } ${index === navLinks.length - 1 ? "mb-0 mt-4" : "mb-4"}`}
                onClick={() => setToggle(false)}
              >
                {nav.id === "join" ? (
                  <Link
                    href={nav.link}
                    className="bg-secondary px-6 py-3 rounded-md text-center block w-full text-white">
                    {nav.title}
                  </Link>
                ) : (
                  <Link href={nav.link} className="block w-full">{nav.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
