"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  FiUsers, FiMail, FiBriefcase, FiGrid, FiPlus,
  FiSearch, FiFilter, FiChevronRight, FiChevronLeft,
  FiMoreVertical, FiEdit2, FiTrash2, FiExternalLink,
  FiCheckCircle, FiXCircle, FiClock, FiSettings, FiLogOut,
  FiCalendar
} from "react-icons/fi";

// ─── Status Config ──────────────────────────────────────────────────────────
const APPLICATION_STATUSES = ["Pending", "Reviewed", "Invite to Interview", "Schedule Interview", "Interview Scheduled", "Rejected", "Hired"];
const STATUS_STYLES = {
  Pending:               "bg-amber-50   text-amber-700   border-amber-200",
  Reviewed:              "bg-blue-50    text-blue-700    border-blue-200",
  "Invite to Interview": "bg-orange-50  text-orange-700  border-orange-200",
  "Schedule Interview":  "bg-violet-50  text-violet-700  border-violet-200",
  "Interview Scheduled": "bg-purple-50  text-purple-700  border-purple-200",
  Rejected:              "bg-red-50     text-red-700     border-red-200",
  Hired:                 "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// ─── Shared Components ───────────────────────────────────────────────────────
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

function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" 
          onClick={onClose} 
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">✕</button>
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            {children}
          </div>
          {footer && (
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              {footer}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ─── Dashboard Overview ─────────────────────────────────────────────────────
function DashboardOverview({ stats, setActiveTab }) {
  const cards = [
    { label: "Active Job Openings", value: stats.jobs, icon: FiBriefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Total Applications", value: stats.applicants, icon: FiUsers, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Contact Inquiries", value: stats.contacts, icon: FiMail, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Pending Review", value: stats.pendingReview, icon: FiClock, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Dashboard Overview" 
        description="A summary of your current recruitment and outreach activities."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{card.value ?? "—"}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setActiveTab("jobs")}
              className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mb-2 group-hover:bg-white">
                <FiPlus className="text-indigo-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Add New Job</span>
            </button>
            <button 
              onClick={() => setActiveTab("applicants")}
              className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-xl hover:bg-blue-50 hover:border-blue-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2 group-hover:bg-white">
                <FiUsers className="text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Review Applicants</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Applicants Management ──────────────────────────────────────────────────
function ApplicantsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter !== "all") params.set("status", statusFilter);
    try {
      const res = await fetch(`/api/admin/applicants?${params}`);
      const data = await res.json();
      setItems(data.applications || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30s so booked interviews reflect immediately
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await fetch("/api/admin/applicants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchData();
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Job Applicants" 
        description="Manage and review all incoming career applications."
      />

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search applicants..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 ring-indigo-500/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <FiFilter className="text-slate-400" />
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-50 border-none rounded-xl text-sm py-2 px-3 focus:ring-2 ring-indigo-500/20 transition-all"
          >
            <option value="all">All Statuses</option>
            {APPLICATION_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-600">Applicant</th>
              <th className="px-6 py-4 font-bold text-slate-600">Role</th>
              <th className="px-6 py-4 font-bold text-slate-600">Status</th>
              <th className="px-6 py-4 font-bold text-slate-600">Applied</th>
              <th className="px-6 py-4 text-right font-bold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan="5" className="px-6 py-8"><div className="h-4 bg-slate-100 rounded w-full"></div></td></tr>)
            ) : items.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-20 text-center text-slate-400">No applicants found</td></tr>
            ) : items.map((app) => (
              <tr key={app._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{app.firstName} {app.lastName}</div>
                  <div className="text-slate-500 text-xs">{app.email}</div>
                </td>
                <td className="px-6 py-4 text-slate-700 font-medium">{app.jobTitle}</td>
                <td className="px-6 py-4">
                  <Badge className={STATUS_STYLES[app.status]}>{app.status}</Badge>
                </td>
                <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelected(app)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-indigo-600"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={!!selected} 
        onClose={() => setSelected(null)}
        title="Application Details"
        footer={(
          <>
            <button onClick={() => setSelected(null)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Close</button>
            {selected?.resumeUrl && (
              <a href={selected.resumeUrl} target="_blank" rel="noreferrer" className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                <FiExternalLink /> Download Resume
              </a>
            )}
          </>
        )}
      >
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                {selected.firstName[0]}{selected.lastName[0]}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{selected.firstName} {selected.lastName}</h4>
                <p className="text-slate-500 text-sm">{selected.jobTitle}</p>
              </div>
              <div className="ml-auto">
                <Badge className={STATUS_STYLES[selected.status]}>{selected.status}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <p className="text-slate-400 text-xs uppercase mb-1">Email</p>
                <p className="font-medium text-slate-900">{selected.email}</p>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <p className="text-slate-400 text-xs uppercase mb-1">Phone</p>
                <p className="font-medium text-slate-900">{selected.phone}</p>
              </div>
            </div>

            {selected.coverLetter && (
              <div className="space-y-2">
                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Cover Letter</p>
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-700 text-sm leading-relaxed border border-slate-100">
                  {selected.coverLetter}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {APPLICATION_STATUSES.map(s => (
                  <button 
                    key={s}
                    onClick={() => handleUpdateStatus(selected._id, s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selected.status === s ? `border-indigo-600 bg-indigo-50 text-indigo-600` : `border-slate-200 hover:border-indigo-300 text-slate-500`}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── Jobs Management ────────────────────────────────────────────────────────
function JobsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "", department: "", location: "", type: "Full-time", description: "", details: "", active: true
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs");
      const data = await res.json();
      setItems(data.jobs || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingItem ? "PATCH" : "POST";
    const body = editingItem ? { id: editingItem._id, ...formData } : formData;

    try {
      const res = await fetch("/api/admin/jobs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({ title: "", department: "", location: "", type: "Full-time", description: "", details: "", active: true });
        fetchData();
      }
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    try {
      await fetch(`/api/admin/jobs?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (e) { console.error(e); }
  };

  const handleEdit = (job) => {
    setEditingItem(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      details: job.details,
      active: job.active
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Job Management" 
        description="Add, edit, or remove career opportunities from the website."
        actions={(
          <button 
            onClick={() => { setEditingItem(null); setFormData({ title: "", department: "", location: "", type: "Full-time", description: "", details: "", active: true }); setIsModalOpen(true); }}
            className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <FiPlus /> Post a New Job
          </button>
        )}
      />

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-600">Job Title</th>
              <th className="px-6 py-4 font-bold text-slate-600">Department</th>
              <th className="px-6 py-4 font-bold text-slate-600">Type</th>
              <th className="px-6 py-4 font-bold text-slate-600">Status</th>
              <th className="px-6 py-4 text-right font-bold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan="5" className="px-6 py-8"><div className="h-4 bg-slate-100 rounded w-full"></div></td></tr>)
            ) : items.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-20 text-center text-slate-400">No jobs posted yet</td></tr>
            ) : items.map((job) => (
              <tr key={job._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{job.title}</div>
                  <div className="text-slate-500 text-xs">{job.location}</div>
                </td>
                <td className="px-6 py-4 text-slate-700 font-medium">{job.department}</td>
                <td className="px-6 py-4 text-slate-600">{job.type}</td>
                <td className="px-6 py-4">
                  {job.active ? (
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>
                  ) : (
                    <Badge className="bg-slate-100 text-slate-500 border-slate-200">Inactive</Badge>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(job)} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(job._id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Job Listing" : "Post New Job"}
        footer={(
          <>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
            <button onClick={handleSubmit} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
              {editingItem ? "Save Changes" : "Post Job Listing"}
            </button>
          </>
        )}
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Title</label>
              <input 
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Senior Engineer" className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Department</label>
              <input 
                value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}
                placeholder="Engineering" className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 ring-indigo-500/20"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Location</label>
              <input 
                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="Remote / Harare" className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Type</label>
              <select 
                value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 ring-indigo-500/20"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Short Description</label>
            <textarea 
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              rows="2" className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 ring-indigo-500/20 resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Detailed Requirements (Markdown support)</label>
            <textarea 
              value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})}
              rows="6" className="w-full px-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 ring-indigo-500/20 resize-none font-mono"
              placeholder="### Key Responsibilities..."
            />
          </div>
          <div className="flex items-center gap-3 py-2">
            <input 
              type="checkbox" id="active" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})}
              className="w-5 h-5 text-indigo-600 bg-slate-50 border-slate-200 rounded focus:ring-indigo-500"
            />
            <label htmlFor="active" className="text-sm font-medium text-slate-700 cursor-pointer">Live / Active</label>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// ─── Contacts Management ───────────────────────────────────────────────────
function ContactsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      setItems(data.contacts || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
      fetchData();
      if (selected?._id === id) setSelected(null);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Contact Messages" 
        description="View and respond to inquiries from the contact form."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-48 bg-white border border-slate-200 rounded-2xl animate-pulse shadow-sm"></div>)
        ) : items.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400 bg-white border border-dotted border-slate-200 rounded-2xl">No messages in inbox</div>
        ) : items.map((msg) => (
          <motion.div
            key={msg._id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                {msg.firstName[0]}
              </div>
              <button 
                onClick={() => handleDelete(msg._id)}
                className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 text-red-400 rounded-lg"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <h4 className="font-bold text-slate-900 line-clamp-1">{msg.firstName} {msg.lastName}</h4>
            <p className="text-slate-400 text-xs mb-3">{new Date(msg.createdAt).toLocaleString()}</p>
            <p className="text-slate-600 text-sm line-clamp-3 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 flex-1 mb-4">
              "{msg.message}"
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelected(msg)}
                className="flex-1 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Open Message
              </button>
              <a 
                href={`mailto:${msg.email}`}
                className="flex-1 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors text-center"
              >
                Reply
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Message from Website"
        footer={(
          <>
            <button onClick={() => setSelected(null)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Close</button>
            <button onClick={() => handleDelete(selected?._id)} className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors">Delete</button>
            <a href={`mailto:${selected?.email}`} className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg">
              <FiMail /> Send Email Reply
            </a>
          </>
        )}
      >
        {selected && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-slate-400 text-xs uppercase font-bold">From</p>
                <p className="font-bold text-slate-900 text-lg">{selected.firstName} {selected.lastName}</p>
                <p className="text-indigo-600">{selected.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 text-xs uppercase font-bold">Details</p>
                {selected.company && <p className="text-slate-700"><span className="text-slate-400">Company:</span> {selected.company}</p>}
                {selected.phone && <p className="text-slate-700"><span className="text-slate-400">Phone:</span> {selected.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Message Content</p>
              <div className="p-5 bg-slate-50 rounded-2xl text-slate-800 text-sm leading-relaxed border border-slate-100 whitespace-pre-wrap">
                {selected.message}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── Interview Slots Management ─────────────────────────────────────────────
function InterviewSlotsSection() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingSlot, setPendingSlot] = useState(null); // { start, end } before saving
  const [saving, setSaving] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null); // slot clicked for detail/delete

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/interview-slots");
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  // Convert DB slots → FullCalendar events
  const calendarEvents = slots.map(slot => ({
    id: slot._id,
    title: slot.isBooked
      ? `Booked — ${slot.bookedBy?.firstName ?? ""} ${slot.bookedBy?.lastName ?? ""}`.trim()
      : "Available",
    start: slot.startTime,
    end: slot.endTime,
    backgroundColor: slot.isBooked ? "#7c3aed" : "#059669",
    borderColor: slot.isBooked ? "#6d28d9" : "#047857",
    extendedProps: slot,
  }));

  // Admin drags on empty space → preview confirm modal
  const handleSelect = ({ start, end }) => {
    setPendingSlot({ start, end });
  };

  const handleConfirmCreate = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/interview-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime: pendingSlot.start.toISOString(),
          endTime: pendingSlot.end.toISOString(),
        }),
      });
      if (res.ok) {
        setPendingSlot(null);
        fetchSlots();
      }
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleEventClick = ({ event }) => {
    setSelectedSlot(event.extendedProps);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this slot? If booked, the Google Calendar event will also be removed.")) return;
    try {
      await fetch(`/api/admin/interview-slots?id=${id}`, { method: "DELETE" });
      setSelectedSlot(null);
      fetchSlots();
    } catch (e) { console.error(e); }
  };

  const fmt = (d) => new Date(d).toLocaleString("en-GB", {
    weekday: "short", day: "numeric", month: "short",
    hour: "2-digit", minute: "2-digit",
  });

  const fmtDuration = (start, end) => {
    const mins = Math.round((new Date(end) - new Date(start)) / 60000);
    return mins >= 60 ? `${mins / 60}h` : `${mins} min`;
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Interview Slots"
        description="Drag on the calendar to create an open slot. Click a slot to view or delete it."
      />

      {/* Legend */}
      <div className="flex items-center gap-5 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" /> Available</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-violet-600 inline-block" /> Booked</span>
        <span className="ml-auto text-slate-400 font-normal italic">Drag on any time block to open a slot</span>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <style>{`
          .fc { font-family: inherit; }
          .fc-toolbar-title { font-size: 1rem !important; font-weight: 700; color: #0f172a; }
          .fc-button { background: #f1f5f9 !important; border: 1px solid #e2e8f0 !important; color: #475569 !important; font-weight: 600 !important; border-radius: 8px !important; box-shadow: none !important; }
          .fc-button:hover { background: #e2e8f0 !important; }
          .fc-button-active { background: #4f46e5 !important; color: #fff !important; border-color: #4f46e5 !important; }
          .fc-timegrid-slot { height: 36px !important; }
          .fc-highlight { background: #e0e7ff !important; border-radius: 6px; }
          .fc-event { border-radius: 6px !important; font-size: 11px !important; font-weight: 600 !important; padding: 2px 6px !important; cursor: pointer !important; }
          .fc-col-header-cell { background: #f8fafc; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; border-color: #e2e8f0 !important; }
          .fc-scrollgrid { border-radius: 0 !important; border-color: transparent !important; }
          .fc-scrollgrid-section > td { border-color: #e2e8f0 !important; }
          .fc-timegrid-slot-label { font-size: 11px; color: #94a3b8; }
          .fc-toolbar { padding: 16px 20px !important; border-bottom: 1px solid #e2e8f0; }
        `}</style>

        {loading ? (
          <div className="h-[640px] flex items-center justify-center text-slate-400">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : (
          <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay",
            }}
            selectable={true}
            selectMirror={true}
            selectMinDistance={5}
            events={calendarEvents}
            select={handleSelect}
            eventClick={handleEventClick}
            slotMinTime="07:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            height={640}
            nowIndicator={true}
            weekends={true}
            businessHours={{ daysOfWeek: [1,2,3,4,5], startTime: "08:00", endTime: "18:00" }}
            slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
            eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
          />
        )}
      </div>

      {/* Confirm create modal */}
      <Modal
        isOpen={!!pendingSlot}
        onClose={() => setPendingSlot(null)}
        title="Create Interview Slot?"
        footer={(
          <>
            <button onClick={() => setPendingSlot(null)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
            <button
              onClick={handleConfirmCreate}
              disabled={saving || !pendingSlot || (pendingSlot.end - pendingSlot.start) < 30 * 60 * 1000}
              className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Create Slots"}
            </button>
          </>
        )}
      >
        {pendingSlot && (() => {
          const SLOT_MS = 30 * 60 * 1000;
          const chunks = [];
          let cursor = new Date(pendingSlot.start);
          while (cursor.getTime() + SLOT_MS <= pendingSlot.end.getTime()) {
            const slotEnd = new Date(cursor.getTime() + SLOT_MS);
            chunks.push({ start: new Date(cursor), end: slotEnd });
            cursor = slotEnd;
          }
          const fmtTime = (d) => new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
          return (
            <div className="space-y-4">
              <p className="text-slate-600 text-sm">
                Your availability window will be split into <strong>{chunks.length} × 30-min slot{chunks.length !== 1 ? "s" : ""}</strong>. Each candidate picks one.
              </p>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {chunks.map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2 text-sm">
                    <span className="text-slate-500 text-xs font-semibold">Slot {i + 1}</span>
                    <span className="font-bold text-slate-900">{fmtTime(c.start)} – {fmtTime(c.end)}</span>
                    <span className="text-emerald-600 text-xs font-semibold">30 min</span>
                  </div>
                ))}
                {chunks.length === 0 && (
                  <p className="text-red-500 text-sm text-center py-2">Window is less than 30 minutes — please drag a longer block.</p>
                )}
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Slot detail / delete modal */}
      <Modal
        isOpen={!!selectedSlot}
        onClose={() => setSelectedSlot(null)}
        title="Slot Details"
        footer={(
          <>
            <button onClick={() => setSelectedSlot(null)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Close</button>
            {!selectedSlot?.isBooked && (
              <button onClick={() => handleDelete(selectedSlot._id)} className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2">
                <FiTrash2 size={15} /> Delete Slot
              </button>
            )}
            {selectedSlot?.meetLink && (
              <a href={selectedSlot.meetLink} target="_blank" rel="noreferrer" className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                <FiExternalLink size={14} /> Join Meet
              </a>
            )}
          </>
        )}
      >
        {selectedSlot && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${selectedSlot.isBooked ? "bg-violet-600" : "bg-emerald-500"}`} />
              <span className={`text-sm font-bold ${selectedSlot.isBooked ? "text-violet-700" : "text-emerald-700"}`}>
                {selectedSlot.isBooked ? "Booked" : "Available"}
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Start</span>
                <span className="font-bold text-slate-900">{fmt(selectedSlot.startTime)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">End</span>
                <span className="font-bold text-slate-900">{fmt(selectedSlot.endTime)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-slate-200 pt-2">
                <span className="text-slate-400">Duration</span>
                <span className="font-bold text-slate-900">{fmtDuration(selectedSlot.startTime, selectedSlot.endTime)}</span>
              </div>
            </div>
            {selectedSlot.isBooked && selectedSlot.bookedBy && (
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 space-y-1">
                <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Booked By</p>
                <p className="font-bold text-slate-900">{selectedSlot.bookedBy.firstName} {selectedSlot.bookedBy.lastName}</p>
                <p className="text-slate-500 text-sm">{selectedSlot.bookedBy.email}</p>
                <p className="text-slate-400 text-xs">{selectedSlot.bookedBy.jobTitle}</p>
              </div>
            )}
            {selectedSlot.meetLink && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Google Meet</p>
                <a href={selectedSlot.meetLink} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline text-sm break-all">{selectedSlot.meetLink}</a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── Main Sidebar Navigation ────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard",  label: "Overview",        icon: FiGrid },
  { id: "applicants", label: "Applicants",      icon: FiUsers },
  { id: "contacts",   label: "Contacts",        icon: FiMail },
  { id: "jobs",       label: "Jobs",            icon: FiBriefcase },
  { id: "slots",      label: "Interview Slots", icon: FiCalendar },
];

export default function RevolutAdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({ jobs: 0, applicants: 0, contacts: 0, pendingReview: 0 });
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const [aRes, cRes, jRes] = await Promise.all([
          fetch("/api/admin/applicants"),
          fetch("/api/admin/contacts"),
          fetch("/api/admin/jobs"),
        ]);
        const [aJson, cJson, jJson] = await Promise.all([aRes.json(), cRes.json(), jRes.json()]);
        setStats({
          applicants: aJson.total || aJson.applications?.length || 0,
          contacts: cJson.total || cJson.contacts?.length || 0,
          jobs: jJson.jobs?.filter(j => j.active).length || 0,
          pendingReview: aJson.applications?.filter(a => a.status === "Pending").length || 0
        });
      } catch (err) { console.error(err); }
    };
    fetchGlobalStats();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}} />

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white border-r border-slate-200 z-50 transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs shrink-0">DG</div>
            {isSidebarOpen && <span className="font-extrabold text-sm tracking-tight text-slate-900">DigitalGeeks Hub</span>}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-900"}`} />
                {isSidebarOpen && <span className="text-sm font-semibold tracking-tight">{item.label}</span>}
                {item.id === "applicants" && stats.pendingReview > 0 && isSidebarOpen && (
                  <span className="ml-auto bg-indigo-600 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                    {stats.pendingReview}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-slate-100 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors group">
              <FiSettings className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
              {isSidebarOpen && <span className="text-sm font-semibold">Settings</span>}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors group">
              <FiLogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
              {isSidebarOpen && <span className="text-sm font-semibold">Sign Out</span>}
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-slate-900 z-50 transition-colors"
        >
          {isSidebarOpen ? <FiChevronLeft size={14} /> : <FiChevronRight size={14} />}
        </button>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="capitalize">{activeTab}</span>
            <span className="text-slate-200">/</span>
            <span className="text-slate-900 font-bold">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-900 leading-none">Admin User</span>
              <span className="text-[10px] text-slate-400 mt-1">Super Admin Role</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-900 shadow-inner">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && <DashboardOverview stats={stats} setActiveTab={setActiveTab} />}
              {activeTab === "applicants" && <ApplicantsSection />}
              {activeTab === "contacts" && <ContactsSection />}
              {activeTab === "jobs" && <JobsSection />}
              {activeTab === "slots" && <InterviewSlotsSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
