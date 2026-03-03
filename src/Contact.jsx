"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineEmail, MdOutlinePhone, MdOutlineLocationOn, MdCheckCircle, MdError, MdArrowForward } from "react-icons/md";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setFormData({ firstName: "", lastName: "", company: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  const inputClasses = (fieldName) => `
    w-full bg-slate-50/50 outline-none transition-all duration-300 font-poppins text-slate-900 border-b-2
    ${focusedField === fieldName ? 'border-blue-600 bg-white shadow-[0_4px_20px_-10px_rgba(37,99,235,0.15)]' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
    px-4 py-4 rounded-t-xl
  `;

  const labelClasses = (fieldName) => `
    absolute left-4 transition-all duration-300 pointer-events-none font-poppins
    ${focusedField === fieldName || formData[fieldName] 
      ? 'top-2 text-[11px] font-semibold text-blue-600 uppercase tracking-wide' 
      : 'top-4 text-[15px] text-slate-500'}
  `;

  return (
    <section className="relative w-full bg-slate-900 py-24 sm:py-36 overflow-hidden">
      
      {/* ── Background Effects ── */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]" 
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-16 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center align-middle">
        
        {/* ── Left: Premium Typed Intro ────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col pt-0 lg:pt-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-sm mb-8 w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-poppins font-medium text-sm text-slate-300 tracking-wide uppercase">
              Start a project
            </span>
          </div>

          <h2 className="font-poppins font-extrabold text-[44px] sm:text-[64px] text-white leading-[1.05] tracking-tight mb-8">
            Let's build the <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              future together.
            </span>
          </h2>
          <p className="font-poppins font-light text-slate-400 text-[19px] sm:text-[22px] leading-[1.7] mb-14 max-w-lg">
            Our engineering team is ready to help you navigate the journey from idea to industry-defining product. No sales pitches, just pure engineering focus.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300">
                <MdOutlineEmail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-poppins font-medium text-white text-lg">hello@digitalgeeks.com</h4>
                <p className="font-poppins text-slate-500 text-sm mt-0.5">Typical response: 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300">
                <MdOutlinePhone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-poppins font-medium text-white text-lg">+263 123 456 789</h4>
                <p className="font-poppins text-slate-500 text-sm mt-0.5">Mon-Fri, 8am - 5pm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300">
                <MdOutlineLocationOn className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-poppins font-medium text-white text-lg">Harare, Zimbabwe</h4>
                <p className="font-poppins text-slate-500 text-sm mt-0.5">Global Engineering Hub</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Premium Glassmorphism Form ────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full max-w-2xl mx-auto lg:mx-0 relative"
        >
          {/* Subtle glow behind the form */}
          <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-[3rem] pointer-events-none" />

          <div className="relative bg-white p-8 sm:p-14 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20">
            
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white mb-8 shadow-xl shadow-green-500/20"
                  >
                    <MdCheckCircle className="w-12 h-12" />
                  </motion.div>
                  <h3 className="font-poppins font-extrabold text-[32px] text-slate-900 mb-4 tracking-tight">Message Received.</h3>
                  <p className="font-poppins text-slate-500 text-lg mb-10 max-w-sm leading-relaxed">
                    Thank you. One of our lead engineers will evaluate your request and contact you shortly.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-poppins font-medium px-8 py-4 rounded-full transition-all duration-300"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="font-poppins font-bold text-2xl text-slate-900 mb-8">Send us a message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative pt-2">
                      <label htmlFor="firstName" className={labelClasses('firstName')}>First Name <span className="text-blue-600">*</span></label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('firstName')}
                      />
                    </div>
                    <div className="relative pt-2">
                      <label htmlFor="lastName" className={labelClasses('lastName')}>Last Name <span className="text-blue-600">*</span></label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('lastName')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative pt-2">
                      <label htmlFor="email" className={labelClasses('email')}>Work Email <span className="text-blue-600">*</span></label>
                      <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('email')}
                      />
                    </div>
                    <div className="relative pt-2">
                      <label htmlFor="phone" className={labelClasses('phone')}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('phone')}
                      />
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <label htmlFor="company" className={labelClasses('company')}>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className={inputClasses('company')}
                    />
                  </div>

                  <div className="relative pt-2">
                    <label htmlFor="message" className={labelClasses('message')}>Project Details / Message <span className="text-blue-600">*</span></label>
                    <textarea
                      required
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClasses('message')} resize-none pt-6`}
                    />
                  </div>

                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl text-red-600"
                    >
                      <MdError className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="font-poppins text-sm leading-relaxed font-medium">{errorMessage}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full mt-4 group relative flex items-center justify-center gap-3 bg-slate-900 hover:bg-blue-600 text-white font-poppins font-medium px-8 py-5 rounded-2xl transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.3)] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    {status === "loading" ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-lg">Processing...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">Send Inquiry</span>
                        <MdArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                  <p className="text-center font-poppins text-xs text-slate-400 mt-4">
                    Your data is secure and will only be used to contact you regarding your inquiry.
                  </p>
                  
                </motion.form>
              )}
            </AnimatePresence>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
