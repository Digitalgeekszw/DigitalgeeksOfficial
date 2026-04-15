"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components";
import styles from "../../style";
import { FiCheckCircle, FiBookOpen, FiAward, FiArrowRight } from "react-icons/fi";

export default function ZimsenseiPilot() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    qualifications: "",
    examBoard: "",
    results: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/zimsensei-pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-slate-50 w-full overflow-hidden min-h-screen flex flex-col font-poppins selection:bg-blue-100 selection:text-blue-900">
      <div className={`${styles.paddingX} ${styles.flexCenter} bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {/* Hero Section */}
      <div className={`relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden`}>
        {/* Abstract Background Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[120px]" />

        <div className={`${styles.paddingX} ${styles.flexCenter} relative z-10`}>
          <div className={`${styles.boxWidth} flex flex-col lg:flex-row gap-16 items-center`}>
            
            {/* Left Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Launching in 2 Weeks
              </div>
              <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Master Your Exams with <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ZimSensei</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The ultimate AI-powered exam tutor and study companion designed specifically for final year Cambridge and ZIMSEC students in Zimbabwe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <FiBookOpen size={20} />
                  </div>
                  Smart Study Plans
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FiAward size={20} />
                  </div>
                  Past Paper Magic
                </div>
              </div>
            </motion.div>

            {/* Right Content - Form */}
            <motion.div 
              className="flex-1 w-full max-w-md lg:max-w-none"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="bg-white rounded-[24px] p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                
                {!submitted ? (
                  <>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Join the Exclusive Beta</h3>
                      <p className="text-slate-500 text-sm">
                        We are selecting top students to pioneer ZimSensei. Apply below to secure your early access.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Full Name</label>
                          <input 
                            required type="text" name="name" value={formData.name} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Phone Number</label>
                          <input 
                            required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                            placeholder="+263..."
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
                        <input 
                          required type="email" name="email" value={formData.email} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">High School</label>
                        <input 
                          required type="text" name="school" value={formData.school} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
                          placeholder="Current School Name"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                         <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Qualifications Level</label>
                          <select 
                            required name="qualifications" value={formData.qualifications} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 appearance-none"
                          >
                            <option value="">Select Level</option>
                            <option value="O Level">O Level</option>
                            <option value="A Level">A Level</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Exam Board</label>
                          <select 
                            required name="examBoard" value={formData.examBoard} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 appearance-none"
                          >
                            <option value="">Select Board</option>
                            <option value="ZIMSEC">ZIMSEC</option>
                            <option value="Cambridge">Cambridge</option>
                            <option value="Both">Both</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Recent Results / Target Grades</label>
                        <textarea 
                          required name="results" value={formData.results} onChange={handleChange} rows="2"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 resize-none"
                          placeholder="E.g. Mostly A's in mocks, aiming for 15 points..."
                        ></textarea>
                      </div>

                      {error && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                          {error}
                        </div>
                      )}

                      <button 
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 rounded-xl bg-slate-900 text-white font-medium text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group mt-2 shadow-[0_4px_14px_0_rgba(15,23,42,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>Apply for Pilot <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6">
                      <FiCheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Application Received!</h3>
                    <p className="text-slate-600 mb-8 max-w-[280px] mx-auto">
                      Thank you for applying to the ZimSensei pilot program. We'll be in touch soon with your next steps.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className={`mt-auto bg-slate-900 ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
