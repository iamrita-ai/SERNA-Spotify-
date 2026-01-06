import axios from 'axios';
import User from '../models/User.js';
import Search from '../models/Search.js';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export const searchSongs = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user._id;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Search YouTube
    const response = await axios.get(`${YOUTUBE_API_BASE}/search`, {
      params: {
        part: 'snippet',
        q: `${query} official music video`,
        type: 'video',
        videoCategoryId: '10', // Music category
        maxResults: 20,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    // Save search history
    await Search.create({
      query,
      userId,
      results: response.data.items.length,
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        searchHistory: {
          $each: [{ query, timestamp: new Date() }],
          $slice: -50, // Keep last 50 searches
        },
      },
    });

    const songs = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));

    res.json({ success: true, songs });
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error searching songs', 
      error: error.message 
    });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.json({ suggestions: [] });
    }

    const response = await axios.get(
      `https://suggestqueries.google.com/complete/search`,
      {
        params: {
          client: 'firefox',
          ds: 'yt',
          q: query,
        },
      }
    );

    const suggestions = response.data[1].slice(0, 8);
    res.json({ suggestions });
  } catch (error) {
    console.error('Suggestions Error:', error.message);
    res.json({ suggestions: [] });
  }
};

export const getVideoDetails = async (req, res) => {
  try {
    const { videoId } = req.params;

    const response = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        part: 'snippet,contentDetails',
        id: videoId,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    if (response.data.items.length === 0) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const video = response.data.items[0];
    res.json({
      videoId: video.id,
      title: video.snippet.title,
      artist: video.snippet.channelTitle,
      thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
      duration: video.contentDetails.duration,
    });
  } catch (error) {
    console.error('Video Details Error:', error.message);
    res.status(500).json({ message: 'Error fetching video details' });
  }
};
