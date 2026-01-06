import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const addToRecentlyPlayed = async (req, res) => {
  try {
    const { videoId, title, thumbnail, artist } = req.body;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, {
      $push: {
        recentlyPlayed: {
          $each: [{ videoId, title, thumbnail, artist, timestamp: new Date() }],
          $position: 0,
          $slice: 30, // Keep last 30 songs
        },
      },
    });

    res.json({ success: true, message: 'Added to recently played' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recently played' });
  }
};

export const getRecentlyPlayed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ recentlyPlayed: user.recentlyPlayed });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recently played' });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ searchHistory: user.searchHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching search history' });
  }
};
