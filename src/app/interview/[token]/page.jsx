"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Harare",
  });
}

function formatDuration(start, end) {
  const mins = Math.round((new Date(end) - new Date(start)) / 60000);
  return mins >= 60 ? `${mins / 60}h` : `${mins} min`;
}

export default function InterviewSchedulePage() {
  const { token } = useParams();
  const [state, setState] = useState("loading"); // loading | select | booked | error | invalid
  const [slots, setSlots] = useState([]);
  const [applicant, setApplicant] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booking, setBooking] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch(`/api/interview/book?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.alreadyBooked) {
          setState("booked");
        } else if (data.slots) {
          setSlots(data.slots);
          setApplicant(data.application);
          setState(data.slots.length === 0 ? "no-slots" : "select");
        } else {
          setErrorMsg(data.message || "Invalid link.");
          setState("invalid");
        }
      })
      .catch(() => {
        setErrorMsg("Something went wrong. Please try again.");
        setState("error");
      });
  }, [token]);

  const handleBook = async () => {
    if (!selectedSlot) return;
    setBooking(true);
    try {
      const res = await fetch("/api/interview/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, slotId: selectedSlot._id }),
      });
      const data = await res.json();
      if (res.ok) {
        setConfirmation(data);
        setState("confirmed");
      } else {
        setErrorMsg(data.message || "Failed to book slot.");
        setState("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setState("error");
    }
    setBooking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4 backdrop-blur-sm">
            <span className="text-white font-black text-sm">DG</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Digital Geeks</h1>
          <p className="text-indigo-300 text-sm mt-1">Interview Scheduling</p>
        </div>

        <AnimatePresence mode="wait">
          {/* Loading */}
          {state === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-2xl p-10 text-center shadow-2xl">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500">Loading your scheduling link...</p>
            </motion.div>
          )}

          {/* Slot Selection */}
          {state === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Choose Your Interview Slot</h2>
                {applicant && (
                  <p className="text-slate-500 text-sm mt-1">
                    Hi <strong>{applicant.firstName}</strong>, please select a time that works best for you for the <strong>{applicant.jobTitle}</strong> interview.
                  </p>
                )}
              </div>

              <div className="p-6 space-y-3 max-h-[420px] overflow-y-auto">
                {slots.map(slot => (
                  <button
                    key={slot._id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedSlot?._id === slot._id
                        ? "border-indigo-600 bg-indigo-50 shadow-md shadow-indigo-100"
                        : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{formatDateTime(slot.startTime)}</p>
                        <p className="text-slate-400 text-xs mt-0.5">CAT (Central Africa Time) · {formatDuration(slot.startTime, slot.endTime)}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        selectedSlot?._id === slot._id ? "border-indigo-600 bg-indigo-600" : "border-slate-300"
                      }`}>
                        {selectedSlot?._id === slot._id && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={handleBook}
                  disabled={!selectedSlot || booking}
                  className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  {booking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Confirming...
                    </>
                  ) : "Confirm This Slot"}
                </button>
                <p className="text-center text-slate-400 text-xs mt-3">
                  You will receive a Google Meet link by email once confirmed.
                </p>
              </div>
            </motion.div>
          )}

          {/* Confirmed */}
          {state === "confirmed" && confirmation && (
            <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-8 py-10 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Interview Confirmed!</h2>
                <p className="text-slate-500 text-sm mb-6">A confirmation email has been sent to you with all the details.</p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left mb-6">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Your Interview Details</p>
                  <p className="text-sm text-slate-500 mb-1">Date &amp; Time (CAT)</p>
                  <p className="font-bold text-slate-900 mb-4">{formatDateTime(confirmation.startTime)}</p>
                  {confirmation.meetLink && (
                    <>
                      <p className="text-sm text-slate-500 mb-1">Google Meet Link</p>
                      <a
                        href={confirmation.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-indigo-600 hover:underline break-all text-sm"
                      >
                        {confirmation.meetLink}
                      </a>
                    </>
                  )}
                </div>

                {confirmation.meetLink && (
                  <a
                    href={confirmation.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Join Google Meet
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* Already Booked */}
          {state === "booked" && (
            <motion.div key="booked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-10 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Already Scheduled</h2>
              <p className="text-slate-500 text-sm">You have already booked an interview slot. Check your email for the details and Google Meet link.</p>
              <p className="text-slate-400 text-xs mt-4">Need to reschedule? Contact us at <a href="mailto:careers@digitalgeeks.tech" className="text-indigo-600 hover:underline">careers@digitalgeeks.tech</a></p>
            </motion.div>
          )}

          {/* No slots available */}
          {state === "no-slots" && (
            <motion.div key="no-slots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-10 text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">No Slots Available Yet</h2>
              <p className="text-slate-500 text-sm">Our team hasn't opened any interview slots yet. Please check back soon or contact us directly.</p>
              <p className="text-slate-400 text-xs mt-4"><a href="mailto:careers@digitalgeeks.tech" className="text-indigo-600 hover:underline">careers@digitalgeeks.tech</a></p>
            </motion.div>
          )}

          {/* Invalid / Error */}
          {(state === "invalid" || state === "error") && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-10 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {state === "invalid" ? "Invalid Link" : "Something Went Wrong"}
              </h2>
              <p className="text-slate-500 text-sm">{errorMsg}</p>
              <p className="text-slate-400 text-xs mt-4">Contact us at <a href="mailto:careers@digitalgeeks.tech" className="text-indigo-600 hover:underline">careers@digitalgeeks.tech</a></p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
