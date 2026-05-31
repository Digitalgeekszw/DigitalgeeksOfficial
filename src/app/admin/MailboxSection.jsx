"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  FiSearch, FiFilter, FiTrash2, FiMail, 
  FiChevronRight, FiChevronLeft, FiRefreshCw, 
  FiClock, FiUser, FiArrowLeft, FiSend, FiBriefcase
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function Badge({ children, className }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${className}`}>
      {children}
    </span>
  );
}

function SectionHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        {actions}
      </div>

    </div>
  );
}

const INITIAL_COMPOSE = {
  isOpen: false,
  mode: "reply",
  to: "",
  subject: "",
  message: "",
  error: "",
  success: "",
};

function extractEmailAddress(value) {
  const match = String(value || "").match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0] || "";
}

function withPrefix(prefix, subject) {
  const cleanSubject = subject || "(No Subject)";
  return cleanSubject.toLowerCase().startsWith(`${prefix.toLowerCase()}:`)
    ? cleanSubject
    : `${prefix}: ${cleanSubject}`;
}

function getMailboxAddress(email) {
  const recipients = Array.isArray(email?.to) ? email.to : [];
  const mailbox = recipients.map(extractEmailAddress).find((address) =>
    ["contact@digitalgeeks.tech", "careers@digitalgeeks.tech"].includes(address.toLowerCase())
  );
  return mailbox || "contact@digitalgeeks.tech";
}

function buildOriginalMessageBlock(email) {
  const receivedAt = email?.receivedAt ? new Date(email.receivedAt).toLocaleString() : "";
  return [
    "",
    "",
    "--- Original message ---",
    `From: ${email?.from || ""}`,
    `To: ${Array.isArray(email?.to) ? email.to.join(", ") : ""}`,
    `Date: ${receivedAt}`,
    `Subject: ${email?.subject || "(No Subject)"}`,
    "",
    email?.text || "",
  ].join("\n");
}

export default function MailboxSection() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [compose, setCompose] = useState(INITIAL_COMPOSE);
  const [sending, setSending] = useState(false);
  const limit = 20;

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search
      });
      const res = await fetch(`/api/admin/emails?${params}`);
      const data = await res.json();
      setEmails(data.emails || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch emails:", error);
    }
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const handleMarkAsRead = async (id, isRead) => {
    try {
      await fetch("/api/admin/emails", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead }),
      });
      setEmails(prev => prev.map(e => e._id === id ? { ...e, isRead } : e));
      if (selectedEmail?._id === id) {
        setSelectedEmail(prev => ({ ...prev, isRead }));
      }
    } catch (error) {
      console.error("Failed to update email:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this email?")) return;
    try {
      await fetch(`/api/admin/emails?id=${id}`, { method: "DELETE" });
      setEmails(prev => prev.filter(e => e._id !== id));
      if (selectedEmail?._id === id) setSelectedEmail(null);
    } catch (error) {
      console.error("Failed to delete email:", error);
    }
  };

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      handleMarkAsRead(email._id, true);
    }
  };

  const openCompose = (mode) => {
    if (!selectedEmail) return;

    setCompose({
      ...INITIAL_COMPOSE,
      isOpen: true,
      mode,
      to: mode === "reply" ? extractEmailAddress(selectedEmail.from) : "",
      subject: withPrefix(mode === "reply" ? "Re" : "Fwd", selectedEmail.subject),
      message: mode === "forward" ? buildOriginalMessageBlock(selectedEmail) : "",
    });
  };

  const closeCompose = () => {
    if (sending) return;
    setCompose(INITIAL_COMPOSE);
  };

  const handleSendEmail = async (event) => {
    event.preventDefault();
    setSending(true);
    setCompose(prev => ({ ...prev, error: "", success: "" }));

    try {
      const res = await fetch("/api/admin/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: compose.to,
          subject: compose.subject,
          message: compose.message,
          fromMailbox: getMailboxAddress(selectedEmail),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to send email");
      }

      setCompose(prev => ({ ...prev, success: "Email sent successfully.", message: "" }));
      setTimeout(() => setCompose(INITIAL_COMPOSE), 900);
    } catch (error) {
      setCompose(prev => ({ ...prev, error: error.message }));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Mailbox" 
        description="View and manage inbound emails received via Resend."
        actions={
          <button 
            onClick={fetchEmails}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            title="Refresh"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
          </button>
        }
      />

      <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
        {/* Email List */}
        <div className={`flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm ${selectedEmail ? "hidden lg:flex" : "flex"}`}>
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {loading && emails.length === 0 ? (
              [1,2,3,4,5].map(i => (
                <div key={i} className="p-4 animate-pulse">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/6"></div>
                  </div>
                  <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                </div>
              ))
            ) : emails.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="text-slate-300 w-8 h-8" />
                </div>
                <p className="text-slate-400 text-sm font-medium">No messages found</p>
              </div>
            ) : (
              emails.map((email) => (
                <div 
                  key={email._id}
                  onClick={() => handleSelectEmail(email)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 relative group ${selectedEmail?._id === email._id ? "bg-indigo-50/50" : ""}`}
                >
                  {!email.isRead && (
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-full"></div>
                  )}
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm truncate pr-4 ${!email.isRead ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>
                      {email.from}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {new Date(email.receivedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className={`text-sm mb-1 truncate ${!email.isRead ? "font-bold text-slate-900" : "text-slate-700"}`}>
                    {email.subject || "(No Subject)"}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {email.text || "No text content"}
                  </p>
                </div>
              ))
            )}
          </div>

          {total > limit && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <FiChevronLeft size={18} />
              </button>
              <span className="text-xs font-bold text-slate-500">Page {page} of {Math.ceil(total / limit)}</span>
              <button 
                disabled={page >= Math.ceil(total / limit)}
                onClick={() => setPage(p => p + 1)}
                className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Email Detail */}
        <div className={`flex-[2] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col ${selectedEmail ? "flex" : "hidden lg:flex"}`}>
          {selectedEmail ? (
            <>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                <button 
                  onClick={() => setSelectedEmail(null)}
                  className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900"
                >
                  <FiArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDelete(selectedEmail._id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleMarkAsRead(selectedEmail._id, !selectedEmail.isRead)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title={selectedEmail.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    <FiMail size={18} />
                  </button>
                </div>
              </div>

              <div className="p-6 border-b border-slate-100 shrink-0">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{selectedEmail.subject || "(No Subject)"}</h2>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <FiUser className="text-slate-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between">
                      <p className="font-bold text-slate-900 truncate">{selectedEmail.from}</p>
                      <p className="text-xs text-slate-400">{new Date(selectedEmail.receivedAt).toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">To: {selectedEmail.to.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {selectedEmail.html ? (
                  <div 
                    className="prose prose-sm max-w-none text-slate-700"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                  />
                ) : (
                  <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">
                    {selectedEmail.text || "No content"}
                  </pre>
                )}

                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Attachments ({selectedEmail.attachments.length})</h5>
                    <div className="flex flex-wrap gap-3">
                      {selectedEmail.attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <FiBriefcase className="text-slate-400" />
                          <span className="text-xs font-medium text-slate-700">{att.name}</span>
                          <a href={att.content} target="_blank" className="text-[10px] font-bold text-indigo-600 hover:underline">Download</a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
                <div className="flex gap-3">
                  <button
                    onClick={() => openCompose("reply")}
                    className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiSend className="text-slate-400" /> Reply
                  </button>
                  <button
                    onClick={() => openCompose("forward")}
                    className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  >
                    Forward
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
                <FiMail className="text-slate-200 w-10 h-10" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Select an email to read</h3>
              <p className="text-sm text-slate-400 max-w-xs">Choose a conversation from the list on the left to view the full message and attachments.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {compose.isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
              onClick={closeCompose}
            />
            <motion.form
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onSubmit={handleSendEmail}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{compose.mode === "reply" ? "Reply" : "Forward"}</h3>
                  <p className="text-xs text-slate-400 mt-1">From {getMailboxAddress(selectedEmail)}</p>
                </div>
                <button type="button" onClick={closeCompose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg">
                  x
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">To</label>
                  <input
                    value={compose.to}
                    onChange={e => setCompose(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="recipient@example.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500/20 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Subject</label>
                  <input
                    value={compose.subject}
                    onChange={e => setCompose(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500/20 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Message</label>
                  <textarea
                    value={compose.message}
                    onChange={e => setCompose(prev => ({ ...prev, message: e.target.value }))}
                    rows={12}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed focus:ring-2 ring-indigo-500/20 outline-none resize-none"
                  />
                </div>
                {compose.error && <p className="text-sm font-semibold text-red-600">{compose.error}</p>}
                {compose.success && <p className="text-sm font-semibold text-emerald-600">{compose.success}</p>}
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button type="button" onClick={closeCompose} disabled={sending} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={sending} className="px-4 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2">
                  <FiSend /> {sending ? "Sending..." : "Send"}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
