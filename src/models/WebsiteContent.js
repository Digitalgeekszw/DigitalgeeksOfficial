import mongoose from 'mongoose';

const WebsiteContentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Content key is required'],
    unique: true,
    trim: true,
  },
  value: {
    type: String,
    required: [true, 'Content value is required'],
  },
  type: {
    type: String,
    enum: ['image', 'video', 'text'],
    default: 'image',
  },
  label: {
    type: String,
    required: [true, 'Content label is required'],
  }
}, { timestamps: true });

const WebsiteContent = mongoose.models.WebsiteContent || mongoose.model('WebsiteContent', WebsiteContentSchema);

export default WebsiteContent;
