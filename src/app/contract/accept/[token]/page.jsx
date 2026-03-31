"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function formatDate(dateValue) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ContractAcceptPage() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState("loading"); // loading | ready | signed | invalid | error
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(null);
  const [candidateSignedName, setCandidateSignedName] = useState("");

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      try {
        const res = await fetch(`/api/contract/accept/${token}`);
        const payload = await res.json();

        if (!res.ok) {
          setErrorMsg(payload.message || "Invalid contract link.");
          setState("invalid");
          return;
        }

        setData(payload);
        if (payload.acceptanceContract?.candidateAccepted) {
          setState("signed");
        } else {
          setState("ready");
        }
      } catch {
        setErrorMsg("Could not load the contract. Please try again.");
        setState("error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const handleSign = async (e) => {
    e.preventDefault();
    if (!candidateSignedName.trim()) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/contract/accept/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateSignedName }),
      });
      const payload = await res.json();

      if (!res.ok) {
        setErrorMsg(payload.message || "Failed to sign contract.");
        setState("error");
        return;
      }

      setData((prev) => ({
        ...prev,
        acceptanceContract: {
          ...(prev?.acceptanceContract || {}),
          candidateAccepted: true,
          candidateSignedName: candidateSignedName.trim(),
          candidateSignedAt: new Date().toISOString(),
        },
      }));
      setState("signed");
    } catch {
      setErrorMsg("Could not submit your signature. Please try again.");
      setState("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg relative overflow-hidden">
        {/* Branded Letterhead */}
        <div className="relative">
          <img src="/contract-letterhead.svg" alt="DigitalGeeks Letterhead" className="w-full h-auto" />
        </div>
        
        {/* Letterhead with brand info */}
        <div className="px-8 py-8 border-b-4 border-blue-900">
          {/* Letterhead content is in the SVG above */}
        </div>

        <div className="px-8 py-8">
          {loading && <p className="text-slate-600">Loading contract...</p>}

          {!loading && (state === "invalid" || state === "error") && (
            <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-red-700 text-sm">
              {errorMsg || "Unable to load this contract."}
            </div>
          )}

          {!loading && data && (
            <>
              <p className="text-sm text-slate-700 mb-2"><strong>Date:</strong> {formatDate(data.acceptanceContract?.adminDate)}</p>
              <p className="text-sm text-slate-700 mb-2"><strong>To:</strong> {data.application.firstName} {data.application.lastName}</p>
              <p className="text-sm text-slate-700 mb-8"><strong>Subject:</strong> Internship Acceptance Letter</p>

              <p className="text-slate-900 mb-4">Dear {data.application.firstName} {data.application.lastName},</p>
              <p className="text-slate-800 leading-7 mb-4">
                We are pleased to inform you that you have been selected for the <strong>{data.application.jobTitle}</strong> internship role at Digital Geeks.
              </p>
              <p className="text-slate-800 leading-7 mb-4">
                This letter serves as your internship acceptance agreement and confirms your formal selection into our program.
              </p>
              <p className="text-slate-800 leading-7 mb-8">
                Kindly confirm your acceptance by signing below with your legal full name.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 border-t border-slate-200 pt-6 mt-6">
                <div>
                  <p className="text-xs uppercase text-slate-500 mb-1">Authorized by (Digital Geeks)</p>
                  <p className="text-slate-900 mb-4">{data.acceptanceContract?.adminName}</p>
                  <p className="text-xs uppercase text-slate-500 mb-1">Title</p>
                  <p className="text-slate-900 mb-4">{data.acceptanceContract?.adminTitle}</p>
                  <p className="text-xs uppercase text-slate-500 mb-1">Date</p>
                  <p className="text-slate-900">{formatDate(data.acceptanceContract?.adminDate)}</p>
                </div>

                <div>
                  {state === "signed" ? (
                    <>
                      <p className="text-xs uppercase text-slate-500 mb-1">Candidate Signature</p>
                      <p className="text-slate-900 mb-4">{data.acceptanceContract?.candidateSignedName}</p>
                      <p className="text-xs uppercase text-slate-500 mb-1">Date Signed</p>
                      <p className="text-slate-900">{formatDate(data.acceptanceContract?.candidateSignedAt)}</p>
                    </>
                  ) : (
                    <form onSubmit={handleSign} className="space-y-4">
                      <label className="block">
                        <span className="text-xs uppercase text-slate-500 mb-1 block">Candidate Signature (Full Name)</span>
                        <input
                          value={candidateSignedName}
                          onChange={(e) => setCandidateSignedName(e.target.value)}
                          className="w-full border border-slate-300 rounded-md px-3 py-2 text-slate-900"
                          placeholder={`${data.application.firstName} ${data.application.lastName}`}
                          required
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2.5 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 disabled:opacity-60"
                      >
                        {saving ? "Submitting..." : "Sign and Accept"}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {state === "signed" && (
                <div className="mt-8 p-4 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm">
                  Thank you. Your acceptance has been recorded successfully.
                </div>
              )}
            </>
          )}
        </div>

        {/* Decorative Footer Strip - using brand asset */}
        <img src="/contract-footer.svg" alt="DigitalGeeks Footer" className="w-full h-auto" />
      </div>
    </div>
  );
}
