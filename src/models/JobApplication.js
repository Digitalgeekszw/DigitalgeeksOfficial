import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
  },
  resumeUrl: {
    type: String,
    required: [true, 'Resume URL is required'],
  },
  coverLetter: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Invite to Interview', 'Schedule Interview', 'Interview Scheduled', 'Rejected', 'Hired'],
    default: 'Pending',
  },
  scheduleToken: { type: String, default: null },
  interviewSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewSlot', default: null },
  offerLetter: {
    sentAt: { type: Date, default: null },
    fileUrl: { type: String, default: '' },
    fileName: { type: String, default: '' },
  },
  acceptanceContract: {
    type: { type: String, enum: ['generated', 'manual'], default: 'generated' },
    token: { type: String, default: null },
    sentAt: { type: Date, default: null },
    adminName: { type: String, default: '' },
    adminTitle: { type: String, default: '' },
    adminDate: { type: Date, default: null },
    candidateSignedName: { type: String, default: '' },
    candidateSignedAt: { type: Date, default: null },
    candidateAccepted: { type: Boolean, default: false },
    fileUrl: { type: String, default: '' },
    fileName: { type: String, default: '' },
  },
}, { timestamps: true });

// Prevent recompilation issues in Next.js
const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);

export default JobApplication;
