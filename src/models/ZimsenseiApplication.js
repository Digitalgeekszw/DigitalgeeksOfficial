import mongoose from "mongoose";

const ZimsenseiApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  school: {
    type: String,
    required: [true, "School name is required"],
  },
  qualifications: {
    type: String,
    required: [true, "Qualifications level is required"],
    enum: ["O Level", "A Level"],
  },
  examBoard: {
    type: String,
    required: [true, "Exam board is required"],
    enum: ["ZIMSEC", "Cambridge", "Both"],
  },
  results: {
    type: String,
    required: [true, "Results / target grades are required"],
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Reviewed", "Selected", "Waitlisted", "Rejected"],
  },
  adminNotes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ZimsenseiApplication ||
  mongoose.model("ZimsenseiApplication", ZimsenseiApplicationSchema);
