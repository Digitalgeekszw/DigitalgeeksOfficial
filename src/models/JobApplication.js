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
    enum: ['Pending', 'Reviewed', 'Interview Scheduled', 'Rejected', 'Hired'],
    default: 'Pending',
  }
}, { timestamps: true });

// Prevent recompilation issues in Next.js
const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);

export default JobApplication;
