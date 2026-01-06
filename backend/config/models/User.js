import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    searchHistory: [
      {
        query: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    recentlyPlayed: [
      {
        videoId: String,
        title: String,
        thumbnail: String,
        artist: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
