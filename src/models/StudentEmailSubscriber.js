import mongoose from "mongoose";

const StudentEmailSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, "Please provide a valid email address"],
  },
  name: {
    type: String,
    default: "",
    trim: true,
  },
  source: {
    type: String,
    enum: ["csv", "manual", "signup"],
    default: "manual",
  },
  subscribed: {
    type: Boolean,
    default: true,
  },
  accountCreatedAt: {
    type: Date,
    default: null,
  },
  lastOpportunityEmailAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

const StudentEmailSubscriber = mongoose.models.StudentEmailSubscriber || mongoose.model("StudentEmailSubscriber", StudentEmailSubscriberSchema);

export default StudentEmailSubscriber;
