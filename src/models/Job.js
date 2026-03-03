import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time',
  },
  description: {
    type: String,
    required: [true, 'Short description is required'],
  },
  details: {
    type: String,
    required: [true, 'Full job details are required'],
  },
  active: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

export default Job;
