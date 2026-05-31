import mongoose from "mongoose";

const SentEmailSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: [String],
    required: true,
  },
  subject: {
    type: String,
  },
  text: {
    type: String,
  },
  resendId: {
    type: String,
    unique: true,
    sparse: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.models.SentEmail || mongoose.model("SentEmail", SentEmailSchema);
