import mongoose from 'mongoose';

const InterviewSlotSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime:   { type: Date, required: true },
  isBooked:  { type: Boolean, default: false },
  bookedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication', default: null },
  googleEventId: { type: String, default: null },
  meetLink:      { type: String, default: null },
}, { timestamps: true });

const InterviewSlot = mongoose.models.InterviewSlot || mongoose.model('InterviewSlot', InterviewSlotSchema);

export default InterviewSlot;
