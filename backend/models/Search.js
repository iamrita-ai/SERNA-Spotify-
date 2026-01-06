import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    results: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

searchSchema.index({ query: 'text' });

export default mongoose.model('Search', searchSchema);
