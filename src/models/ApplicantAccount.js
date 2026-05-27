import mongoose from "mongoose";

const ApplicantAccountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, "Please provide a valid email address"],
  },
  passwordHash: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ApplicantAccount = mongoose.models.ApplicantAccount || mongoose.model("ApplicantAccount", ApplicantAccountSchema);

export default ApplicantAccount;
