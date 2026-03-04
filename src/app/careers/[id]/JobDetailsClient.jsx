"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "../../../components";
import { FiMapPin, FiBriefcase, FiArrowLeft, FiUpload, FiCheckCircle } from "react-icons/fi";
import styles from "../../../style";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function JobDetailsClient({ job }) {
  const router = useRouter();
  const [isApplying, setIsApplying] = useState(false);
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    const formData = new FormData(e.target);
    formData.append("jobTitle", job.title);
    formData.append("jobId", job._id);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="bg-white min-h-screen font-roboto">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@400;500&display=swap');
        .font-google { font-family: 'Google Sans', sans-serif; }
        .font-roboto { font-family: 'Roboto', sans-serif; }
      `}} />

      {/* Navbar Section */}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-16 py-12 md:py-20 flex flex-col md:flex-row gap-16">
        
        {/* Left Side: Job Details */}
        <div className="flex-1">
          <Link href="/careers" className="inline-flex items-center text-[#1a73e8] hover:underline mb-8 font-medium">
            <FiArrowLeft className="mr-2" />
            Back to Careers
          </Link>

          <h1 className="font-google text-[40px] sm:text-[56px] text-[#202124] tracking-tight leading-tight mb-6">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 text-[#5f6368] font-medium border-b border-[#dadce0] pb-10">
            <span className="flex items-center">
              <FiMapPin className="mr-2 text-[#1a73e8]" size={20} />
              {job.location}
            </span>
            <span className="flex items-center">
              <FiBriefcase className="mr-2 text-[#1a73e8]" size={20} />
              {job.type}
            </span>
            <span className="flex items-center">
               <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] mr-2"></span>
              {job.department}
            </span>
          </div>

          <div className="prose prose-blue max-w-none">
            <div className="font-roboto text-[18px] leading-relaxed text-[#3c4043]">
              <ReactMarkdown>{job.details}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Right Side: Application Box */}
        <div className="w-full md:w-[450px] shrink-0">
          <div className="sticky top-28 bg-[#f8f9fa] border border-[#dadce0] rounded-[24px] overflow-hidden">
            <div className="p-8 sm:p-10">
               {formStatus === "success" ? (
                 <div className="text-center py-10">
                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <FiCheckCircle className="text-[#34A853] w-10 h-10" />
                   </div>
                   <h3 className="font-google text-[28px] font-medium text-[#202124] mb-4">Application Sent!</h3>
                   <p className="font-roboto text-[#5f6368] text-[18px] mb-8">
                     Thank you for your interest. Our team will review your application and get back to you soon.
                   </p>
                   <Link href="/careers" className="inline-block py-4 px-8 bg-[#1a73e8] text-white font-google font-medium rounded-full hover:bg-[#1765cc] transition-all shadow-md">
                     Return to Careers
                   </Link>
                 </div>
               ) : !isApplying ? (
                 <div className="text-center">
                   <h2 className="font-google text-[32px] text-[#202124] font-medium mb-6">Ready to apply?</h2>
                   <p className="font-roboto text-[#5f6368] text-[18px] mb-10 leading-relaxed">
                     DigitalGeeks welcomes applicants from all backgrounds. Apply today to start your journey with us.
                   </p>
                   <button 
                     onClick={() => setIsApplying(true)}
                     className="w-full py-5 bg-[#1a73e8] text-white font-google font-medium text-[18px] rounded-full hover:bg-[#1765cc] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                   >
                     Apply for this role
                     <FiArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" />
                   </button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                       <h2 className="font-google text-[28px] font-medium text-[#202124]">Application</h2>
                       <button onClick={() => setIsApplying(false)} type="button" className="text-[#5f6368] hover:text-[#202124] font-medium">
                         Close
                       </button>
                    </div>

                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[14px] font-medium text-[#3c4043] ml-1 uppercase tracking-wider">First Name</label>
                          <input required name="firstName" type="text" className="w-full px-4 py-4 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] outline-none transition-all placeholder:text-[#9aa0a6] bg-white shadow-sm" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[14px] font-medium text-[#3c4043] ml-1 uppercase tracking-wider">Last Name</label>
                          <input required name="lastName" type="text" className="w-full px-4 py-4 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] outline-none transition-all placeholder:text-[#9aa0a6] bg-white shadow-sm" placeholder="Doe" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#3c4043] ml-1 uppercase tracking-wider">Email Address</label>
                        <input required name="email" type="email" className="w-full px-4 py-4 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] outline-none transition-all placeholder:text-[#9aa0a6] bg-white shadow-sm" placeholder="john.doe@example.com" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#3c4043] ml-1 uppercase tracking-wider">Phone</label>
                        <input required name="phone" type="tel" className="w-full px-4 py-4 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] outline-none transition-all placeholder:text-[#9aa0a6] bg-white shadow-sm" placeholder="+263 ..." />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#3c4043] ml-1 uppercase tracking-wider">Resume (PDF)</label>
                        <div className="relative">
                          <input required name="cv" type="file" accept=".pdf" className="hidden" id="resume-upload" onChange={(e) => {
                            const fileName = e.target.files[0]?.name;
                            const label = document.getElementById('file-label');
                            if (label && fileName) {
                              label.textContent = fileName;
                              label.classList.remove('text-[#5f6368]');
                              label.classList.add('text-[#1a73e8]', 'font-medium');
                            }
                          }} />
                          <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full min-h-[140px] px-4 py-6 border-2 border-dashed border-[#dadce0] rounded-2xl cursor-pointer hover:bg-white hover:border-[#1a73e8] transition-all group bg-white">
                            <FiUpload className="text-[#5f6368] group-hover:text-[#1a73e8] mb-4" size={32} />
                            <span id="file-label" className="text-[16px] text-[#5f6368] text-center px-4 break-all">
                              Upload CV (MAX 10MB)
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#3c4043] ml-1 uppercase tracking-wider">Cover Letter (Optional)</label>
                        <textarea name="coverLetter" rows="5" className="w-full px-4 py-4 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] outline-none transition-all resize-none bg-white shadow-sm" placeholder="Tell us why you're a great fit..."></textarea>
                      </div>
                    </div>

                    <button 
                      disabled={formStatus === "submitting"}
                      type="submit"
                      className="w-full py-5 bg-[#1a73e8] text-white font-google font-medium text-[18px] rounded-full hover:bg-[#1765cc] transition-all shadow-md disabled:bg-slate-300 flex items-center justify-center gap-3 mt-4"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Application...
                        </>
                      ) : "Submit Application"}
                    </button>

                    {formStatus === "error" && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium text-center">
                        Unable to submit. Please check your connection and try again.
                      </div>
                    )}

                    <p className="text-[12px] text-[#5f6368] text-center pt-2">
                      By submitting, you agree to our recruitment privacy policy.
                    </p>
                 </form>
               )}
            </div>
          </div>
        </div>

      </div>

      <div className={`bg-white ${styles.paddingX} ${styles.flexCenter} border-t border-[#dadce0]`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
