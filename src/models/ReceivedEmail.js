import mongoose from "mongoose";

const ReceivedEmailSchema = new mongoose.Schema({
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
  html: {
    type: String,
  },
  attachments: [
    {
      name: String,
      content: String, // Base64 or URL if stored elsewhere
      contentType: String,
    },
  ],
  isRead: {
    type: Boolean,
    default: false,
  },
  receivedAt: {
    type: Date,
    default: Date.now,
  },
  resendId: {
    type: String, // ID from Resend
    unique: true,
    sparse: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.ReceivedEmail || mongoose.model("ReceivedEmail", ReceivedEmailSchema);
