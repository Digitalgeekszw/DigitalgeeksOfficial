"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FiArchive, FiArrowLeft, FiBriefcase, FiChevronLeft, FiChevronRight,
  FiEdit3, FiInbox, FiMail, FiRefreshCw, FiSearch, FiSend,
  FiTrash2, FiUser, FiX
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const MAILBOXES = [
  { id: "contact@digitalgeeks.tech", label: "Contact" },
  { id: "careers@digitalgeeks.tech", label: "Careers" },
];

const INITIAL_COMPOSE = {
  isOpen: false,
  mode: "compose",
  to: "",
  subject: "",
  message: "",
  fromMailbox: "contact@digitalgeeks.tech",
  error: "",
  success: "",
};

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

function getInboxMailbox(email) {
  const recipients = Array.isArray(email?.to) ? email.to : [];
  const mailbox = recipients.map(extractEmailAddress).find((address) =>
    MAILBOXES.some((item) => item.id === address.toLowerCase())
  );
  return mailbox || "contact@digitalgeeks.tech";
}

function getMessageDate(email, folder) {
  return folder === "sent" ? email?.sentAt : email?.receivedAt;
}

function getPreviewName(email, folder) {
  if (folder === "sent") return `To: ${(email.to || []).join(", ")}`;
  return email.from || "Unknown sender";
}

function getMessageText(email) {
  return email?.text || "No text content";
}

function buildOriginalMessageBlock(email, folder) {
  const messageDate = getMessageDate(email, folder);
  const dateLabel = messageDate ? new Date(messageDate).toLocaleString() : "";
  return [
    "",
    "",
    "--- Original message ---",
    `From: ${email?.from || ""}`,
    `To: ${Array.isArray(email?.to) ? email.to.join(", ") : ""}`,
    `Date: ${dateLabel}`,
    `Subject: ${email?.subject || "(No Subject)"}`,
    "",
    email?.text || "",
  ].join("\n");
}

function ComposeModal({ compose, sending, selectedEmail, currentFolder, onChange, onClose, onSubmit }) {
  return (
    <AnimatePresence>
      {compose.isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.form
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            onSubmit={onSubmit}
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">
                  {compose.mode === "compose" ? "New email" : compose.mode === "reply" ? "Reply" : "Forward"}
                </h3>
                {selectedEmail && compose.mode !== "compose" && (
                  <p className="text-xs text-slate-400 mt-1">
                    {currentFolder === "sent" ? "Forwarding sent message" : `Responding from ${getInboxMailbox(selectedEmail)}`}
                  </p>
                )}
              </div>
              <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg" title="Close">
                <FiX />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">From</label>
                  <select
                    value={compose.fromMailbox}
                    onChange={e => onChange({ fromMailbox: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500/20 outline-none"
                  >
                    {MAILBOXES.map((mailbox) => (
                      <option key={mailbox.id} value={mailbox.id}>{mailbox.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">To</label>
                  <input
                    value={compose.to}
                    onChange={e => onChange({ to: e.target.value })}
                    placeholder="recipient@example.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500/20 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Subject</label>
                <input
                  value={compose.subject}
                  onChange={e => onChange({ subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500/20 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Message</label>
                <textarea
                  value={compose.message}
                  onChange={e => onChange({ message: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed focus:ring-2 ring-indigo-500/20 outline-none resize-none"
                />
              </div>
              {compose.error && <p className="text-sm font-semibold text-red-600">{compose.error}</p>}
              {compose.success && <p className="text-sm font-semibold text-emerald-600">{compose.success}</p>}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button type="button" onClick={onClose} disabled={sending} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
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
  );
}

export default function MailboxSection() {
  const [emails, setEmails] = useState([]);
  const [folder, setFolder] = useState("inbox");
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [compose, setCompose] = useState(INITIAL_COMPOSE);
  const [sending, setSending] = useState(false);
  const limit = 20;

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        folder,
        page: page.toString(),
        limit: limit.toString(),
        search,
      });
      const res = await fetch(`/api/admin/emails?${params}`);
      const data = await res.json();
      setEmails(data.emails || []);
      setTotal(data.total || 0);
      setUnreadCount(data.unreadCount || 0);
      setSentCount(data.sentCount || 0);
    } catch (error) {
      console.error("Failed to fetch emails:", error);
    } finally {
      setLoading(false);
    }
  }, [folder, page, search]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const switchFolder = (nextFolder) => {
    setFolder(nextFolder);
    setSelectedEmail(null);
    setPage(1);
  };

  const handleMarkAsRead = async (id, isRead) => {
    if (folder !== "inbox") return;

    try {
      await fetch("/api/admin/emails", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead }),
      });
      setEmails(prev => prev.map(e => e._id === id ? { ...e, isRead } : e));
      setUnreadCount(prev => Math.max(0, prev + (isRead ? -1 : 1)));
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
      await fetch(`/api/admin/emails?id=${id}&folder=${folder}`, { method: "DELETE" });
      const deletedEmail = emails.find(email => email._id === id);
      setEmails(prev => prev.filter(e => e._id !== id));
      setTotal(prev => Math.max(0, prev - 1));
      if (folder === "sent") setSentCount(prev => Math.max(0, prev - 1));
      if (folder === "inbox" && deletedEmail && !deletedEmail.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      if (selectedEmail?._id === id) setSelectedEmail(null);
    } catch (error) {
      console.error("Failed to delete email:", error);
    }
  };

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    if (folder === "inbox" && !email.isRead) {
      handleMarkAsRead(email._id, true);
    }
  };

  const updateCompose = (updates) => {
    setCompose(prev => ({ ...prev, ...updates, error: "", success: "" }));
  };

  const openCompose = (mode = "compose") => {
    const fromMailbox = selectedEmail && folder === "inbox" ? getInboxMailbox(selectedEmail) : "contact@digitalgeeks.tech";

    if (mode === "compose" || !selectedEmail) {
      setCompose({ ...INITIAL_COMPOSE, isOpen: true, mode });
      return;
    }

    setCompose({
      ...INITIAL_COMPOSE,
      isOpen: true,
      mode,
      fromMailbox,
      to: mode === "reply" ? extractEmailAddress(selectedEmail.from) : "",
      subject: withPrefix(mode === "reply" ? "Re" : "Fwd", selectedEmail.subject),
      message: mode === "forward" ? buildOriginalMessageBlock(selectedEmail, folder) : "",
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
          fromMailbox: compose.fromMailbox,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to send email");
      }

      setCompose(prev => ({ ...prev, success: "Email sent successfully.", message: "" }));
      setSentCount(prev => prev + 1);
      if (folder === "sent") fetchEmails();
      setTimeout(() => setCompose(INITIAL_COMPOSE), 900);
    } catch (error) {
      setCompose(prev => ({ ...prev, error: error.message }));
    } finally {
      setSending(false);
    }
  };

  const selectedDate = selectedEmail ? getMessageDate(selectedEmail, folder) : null;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Mailbox"
        description="Send, reply to, and manage Digital Geeks email from one place."
        actions={
          <>
            <button
              onClick={() => openCompose("compose")}
              className="px-4 py-2.5 bg-slate-900 rounded-xl text-sm font-bold text-white hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2"
            >
              <FiEdit3 /> Compose
            </button>
            <button
              onClick={fetchEmails}
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
              title="Refresh"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
            </button>
          </>
        }
      />

      <div className="flex flex-col lg:flex-row gap-6 min-h-[640px]">
        <div className={`w-full lg:w-80 flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm ${selectedEmail ? "hidden lg:flex" : "flex"}`}>
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => switchFolder("inbox")}
                className={`px-3 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${folder === "inbox" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
              >
                <FiInbox /> Inbox {unreadCount > 0 && <span className="text-[10px] rounded-full bg-indigo-500 text-white px-1.5 py-0.5">{unreadCount}</span>}
              </button>
              <button
                onClick={() => switchFolder("sent")}
                className={`px-3 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${folder === "sent" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
              >
                <FiSend /> Sent {sentCount > 0 && <span className="text-[10px] rounded-full bg-slate-200 text-slate-700 px-1.5 py-0.5">{sentCount}</span>}
              </button>
            </div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${folder}...`}
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {loading && emails.length === 0 ? (
              [1, 2, 3, 4, 5].map(i => (
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
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiArchive className="text-slate-300 w-8 h-8" />
                </div>
                <p className="text-slate-400 text-sm font-medium">No messages found</p>
              </div>
            ) : (
              emails.map((email) => {
                const messageDate = getMessageDate(email, folder);
                return (
                  <div
                    key={email._id}
                    onClick={() => handleSelectEmail(email)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 relative group ${selectedEmail?._id === email._id ? "bg-indigo-50/50" : ""}`}
                  >
                    {folder === "inbox" && !email.isRead && (
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-full"></div>
                    )}
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-sm truncate pr-4 ${folder === "inbox" && !email.isRead ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>
                        {getPreviewName(email, folder)}
                      </span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {messageDate ? new Date(messageDate).toLocaleDateString() : ""}
                      </span>
                    </div>
                    <h4 className={`text-sm mb-1 truncate ${folder === "inbox" && !email.isRead ? "font-bold text-slate-900" : "text-slate-700"}`}>
                      {email.subject || "(No Subject)"}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {getMessageText(email)}
                    </p>
                  </div>
                );
              })
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

        <div className={`flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col ${selectedEmail ? "flex" : "hidden lg:flex"}`}>
          {selectedEmail ? (
            <>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900"
                >
                  <FiArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => handleDelete(selectedEmail._id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                  {folder === "inbox" && (
                    <button
                      onClick={() => handleMarkAsRead(selectedEmail._id, !selectedEmail.isRead)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title={selectedEmail.isRead ? "Mark as unread" : "Mark as read"}
                    >
                      <FiMail size={18} />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 border-b border-slate-100 shrink-0">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{selectedEmail.subject || "(No Subject)"}</h2>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <FiUser className="text-slate-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-4">
                      <p className="font-bold text-slate-900 truncate">{selectedEmail.from}</p>
                      <p className="text-xs text-slate-400 whitespace-nowrap">{selectedDate ? new Date(selectedDate).toLocaleString() : ""}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">To: {(selectedEmail.to || []).join(", ")}</p>
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
                          <a href={att.content} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-indigo-600 hover:underline">Download</a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
                <div className="flex gap-3">
                  {folder === "inbox" && (
                    <button
                      onClick={() => openCompose("reply")}
                      className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiSend className="text-slate-400" /> Reply
                    </button>
                  )}
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
              <p className="text-sm text-slate-400 max-w-xs">Choose a message from Inbox or Sent to view the full email.</p>
            </div>
          )}
        </div>
      </div>

      <ComposeModal
        compose={compose}
        sending={sending}
        selectedEmail={selectedEmail}
        currentFolder={folder}
        onChange={updateCompose}
        onClose={closeCompose}
        onSubmit={handleSendEmail}
      />
    </div>
  );
}
