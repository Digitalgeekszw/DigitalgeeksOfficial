"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Footer } from "../../../components";
import styles from "../../../style";
import { FiBriefcase, FiCheckCircle, FiClock, FiLogOut, FiUserPlus } from "react-icons/fi";

const STATUS_COPY = {
  Pending: "Your application was received and is waiting for review.",
  Reviewed: "Your application has been reviewed by the team.",
  "Invite to Interview": "You have been invited to choose an interview slot.",
  "Schedule Interview": "Please use the interview scheduling email to pick a slot.",
  "Interview Scheduled": "Your interview has been scheduled.",
  Rejected: "This application is no longer moving forward.",
  Hired: "You have been selected for this opportunity.",
};

function AuthForm({ mode, onDone }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/careers/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to continue.");
      onDone(data.account);
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {mode === "register" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="First name" className="px-4 py-3 rounded-xl border border-[#dadce0] outline-none focus:border-[#1a73e8]" />
          <input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Last name" className="px-4 py-3 rounded-xl border border-[#dadce0] outline-none focus:border-[#1a73e8]" />
        </div>
      )}
      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="w-full px-4 py-3 rounded-xl border border-[#dadce0] outline-none focus:border-[#1a73e8]" />
      <input required type="password" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-[#dadce0] outline-none focus:border-[#1a73e8]" />
      {message && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm">{message}</div>}
      <button disabled={loading} className="w-full py-4 rounded-full bg-[#1a73e8] text-white font-semibold hover:bg-[#1765cc] disabled:bg-slate-300">
        {loading ? "Please wait..." : mode === "register" ? "Create applicant account" : "Sign in"}
      </button>
    </form>
  );
}

export default function ApplicantAccountPage() {
  const [account, setAccount] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("login");

  const loadPortal = async () => {
    setLoading(true);
    try {
      const meRes = await fetch("/api/careers/auth/me", { cache: "no-store" });
      if (!meRes.ok) {
        setAccount(null);
        setApplications([]);
        setLoading(false);
        return;
      }
      const me = await meRes.json();
      setAccount(me.account);
      const appRes = await fetch("/api/careers/portal/applications", { cache: "no-store" });
      const appData = await appRes.json();
      setApplications(appData.applications || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => { loadPortal(); }, []);

  const signOut = async () => {
    await fetch("/api/careers/auth/logout", { method: "POST" });
    setAccount(null);
    setApplications([]);
  };

  return (
    <div className="bg-white min-h-screen font-roboto">
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}><Navbar /></div>
      </div>

      <main className="max-w-6xl mx-auto px-6 sm:px-16 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#dadce0] pb-8 mb-8">
          <div>
            <p className="text-[#1a73e8] font-semibold mb-3">Careers account</p>
            <h1 className="text-[36px] sm:text-[52px] leading-tight text-[#202124] font-medium">Track your applications</h1>
            <p className="text-[#5f6368] text-[18px] mt-4 max-w-2xl">Create an applicant account to see status updates for applications submitted with the same email address.</p>
          </div>
          {account && (
            <button onClick={signOut} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#dadce0] text-[#3c4043] hover:bg-[#f8f9fa]">
              <FiLogOut /> Sign out
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center text-[#5f6368]">Loading account...</div>
        ) : !account ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
            <section className="bg-[#f8f9fa] border border-[#dadce0] rounded-[16px] p-6 sm:p-8">
              <div className="w-12 h-12 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center mb-5"><FiUserPlus size={24} /></div>
              <h2 className="text-[26px] text-[#202124] font-medium mb-3">Email list is not system access</h2>
              <p className="text-[#5f6368] leading-relaxed">If Digital Geeks imported your email from a student CSV, you can receive opportunity alerts, but you still need to create an applicant account before you can access this portal.</p>
              <Link href="/careers" className="inline-flex mt-6 text-[#1a73e8] font-semibold hover:underline">Browse opportunities</Link>
            </section>
            <section className="border border-[#dadce0] rounded-[16px] p-6 sm:p-8 shadow-sm">
              <div className="flex p-1 bg-[#f8f9fa] rounded-full mb-6">
                <button onClick={() => setMode("login")} className={`flex-1 py-2 rounded-full text-sm font-semibold ${mode === "login" ? "bg-white text-[#1a73e8] shadow-sm" : "text-[#5f6368]"}`}>Sign in</button>
                <button onClick={() => setMode("register")} className={`flex-1 py-2 rounded-full text-sm font-semibold ${mode === "register" ? "bg-white text-[#1a73e8] shadow-sm" : "text-[#5f6368]"}`}>Create account</button>
              </div>
              <AuthForm mode={mode} onDone={() => loadPortal()} />
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-[16px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[#5f6368] text-sm">Signed in as</p>
                <h2 className="text-[#202124] text-xl font-semibold">{account.firstName} {account.lastName}</h2>
                <p className="text-[#5f6368]">{account.email}</p>
              </div>
              <Link href="/careers" className="px-5 py-3 rounded-full bg-[#1a73e8] text-white font-semibold text-center">Apply for another role</Link>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[#dadce0] rounded-[16px]">
                <FiBriefcase className="mx-auto text-[#5f6368] mb-4" size={32} />
                <h3 className="text-[#202124] text-xl font-semibold mb-2">No applications found</h3>
                <p className="text-[#5f6368]">Applications submitted with {account.email} will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {applications.map((application) => (
                  <div key={application._id} className="border border-[#dadce0] rounded-[16px] p-6 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[#202124] text-xl font-semibold mb-2">{application.jobTitle}</h3>
                        <p className="text-[#5f6368] text-sm">Applied {new Date(application.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] text-sm font-semibold w-fit">
                        {application.status === "Hired" ? <FiCheckCircle /> : <FiClock />}
                        {application.status}
                      </span>
                    </div>
                    <p className="mt-4 text-[#3c4043]">{STATUS_COPY[application.status] || "Your application status has been updated."}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <div className={`bg-white ${styles.paddingX} ${styles.flexCenter} border-t border-[#dadce0]`}>
        <div className={`${styles.boxWidth}`}><Footer /></div>
      </div>
    </div>
  );
}
