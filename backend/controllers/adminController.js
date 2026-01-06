import User from '../models/User.js';
import Search from '../models/Search.js';

export const getDashboardStats = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Total searches
    const totalSearches = await Search.countDocuments();

    // Trending songs (most searched)
    const trending = await Search.aggregate([
      {
        $group: {
          _id: '$query',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    // Recent activity
    const recentSearches = await Search.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('userId', 'name email');

    // User growth (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json({
      totalUsers,
      totalSearches,
      newUsers,
      trending: trending.map(t => ({ query: t._id, count: t.count })),
      recentActivity: recentSearches,
    });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('name email avatar createdAt')
      .sort({ createdAt: -1 });
    
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};
