"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar, Footer } from "../../components";
import { FiSearch, FiMapPin, FiBriefcase, FiArrowRight } from "react-icons/fi";
import styles from "../../style";
import { JOB_LISTINGS } from "../../data/jobs";

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChip, setActiveChip] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const departments = ["All", ...Array.from(new Set(jobs.map(job => job.department)))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = activeChip === "All" || job.department === activeChip;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-white min-h-screen font-roboto">
      {/* Global style overrides to simulate Product Sans / Google aesthetic */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@400;500&display=swap');
        
        .font-google {
          font-family: 'Google Sans', 'Roboto', 'Inter', sans-serif;
        }
        .font-roboto {
          font-family: 'Roboto', 'Inter', sans-serif;
        }
        .google-blue-btn {
          background-color: #1a73e8;
          color: white;
          transition: background-color 0.2s, box-shadow 0.2s;
        }
        .google-blue-btn:hover {
          background-color: #1765cc;
          box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
        }
      `}} />

      {/* Navbar Section */}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#f8f9fa] pt-20 pb-16 px-6 sm:px-16 border-b border-[#dadce0]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-google text-[40px] sm:text-[56px] text-[#202124] tracking-tight leading-tight mb-6">
            Build for everyone.
          </h1>
          <p className="font-roboto text-[18px] sm:text-[22px] text-[#5f6368] max-w-2xl mb-12">
            Find your next opportunity at DigitalGeeks. Join us to create technology that changes the world.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-3xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-[#5f6368] w-6 h-6" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-[#dadce0] focus:outline-none focus:border-[#1a73e8] focus:shadow-[0_1px_6px_rgba(32,33,36,0.28)] transition-shadow text-[16px] text-[#202124] bg-white placeholder:text-[#5f6368]"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-16 py-12 md:py-20 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar / Filters (Desktop) */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
             <h3 className="font-google font-medium text-[16px] text-[#202124] mb-4 uppercase tracking-wider">Departments</h3>
             <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 custom-scrollbar">
                {departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setActiveChip(dept)}
                    className={`whitespace-nowrap md:whitespace-normal px-4 py-2.5 rounded-full text-[14px] font-medium transition-colors border text-left
                      ${activeChip === dept 
                        ? 'bg-[#e8f0fe] text-[#1a73e8] border-[#e8f0fe]' 
                        : 'bg-white text-[#3c4043] border-[#dadce0] hover:bg-[#f8f9fa]'
                      }
                    `}
                  >
                    {dept}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
             <h2 className="font-google text-[24px] text-[#202124] font-medium">
               {loading ? "Finding roles..." : `${filteredJobs.length} ${filteredJobs.length === 1 ? 'role' : 'roles'} found`}
             </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white border border-[#dadce0] rounded-[16px] p-8 animate-pulse">
                    <div className="h-8 bg-slate-100 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
               filteredJobs.map((job) => (
                 <Link href={`/careers/${job._id}`} key={job._id} className="block group">
                   <div className="bg-white border border-[#dadce0] rounded-[16px] p-6 sm:p-8 hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] transition-all duration-300">
                     <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-google text-[22px] sm:text-[24px] text-[#1a73e8] group-hover:underline font-medium mb-3 leading-tight tracking-tight">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                            <span className="font-roboto flex items-center text-[14px] text-[#5f6368] font-medium">
                              <FiMapPin className="mr-1.5" />
                              {job.location}
                            </span>
                            <span className="font-roboto flex items-center text-[14px] text-[#5f6368] font-medium">
                              <FiBriefcase className="mr-1.5" />
                              {job.type}
                            </span>
                            <span className="font-roboto flex items-center text-[14px] text-[#5f6368] font-medium">
                               <span className="w-2 h-2 rounded-full bg-[#34A853] mr-2"></span>
                              {job.department}
                            </span>
                          </div>
                          <p className="font-roboto text-[#3c4043] text-[16px] leading-relaxed max-w-3xl">
                            {job.description}
                          </p>
                        </div>
                        <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-[#f8f9fa] items-center justify-center text-[#1a73e8] group-hover:bg-[#1a73e8] group-hover:text-white transition-colors duration-300">
                          <FiArrowRight size={24} />
                        </div>
                     </div>
                   </div>
                 </Link>
               ))
            ) : (
               <div className="text-center py-20 bg-[#f8f9fa] rounded-[16px] border border-[#dadce0]">
                 <p className="font-google text-[22px] text-[#202124] mb-2">No roles found</p>
                 <p className="font-roboto text-[16px] text-[#5f6368]">Try adjusting your search or filters.</p>
               </div>
            )}
          </div>
        </div>

      </div>

      <div className={`bg-white ${styles.paddingX} ${styles.flexCenter} border-t border-[#dadce0]`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
      
      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px; /* Added for vertical scrollbar in case of md:flex-col */
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #dadce0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #bdc1c6;
        }
      `}} />
    </div>
  );
}
