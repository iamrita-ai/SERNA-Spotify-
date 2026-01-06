import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUsers, FiSearch, FiTrendingUp, FiLogOut } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.post(
        '/api/admin/stats',
        { password: '572002' },
        { withCredentials: true }
      );
      setStats(data);
    } catch (error) {
      toast.error('Error fetching stats');
      console.error('Stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Total Users</p>
                <p className="text-4xl font-bold text-gray-800">
                  {stats?.totalUsers || 0}
                </p>
              </div>
              <FiUsers className="text-primary" size={48} />
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Total Searches</p>
                <p className="text-4xl font-bold text-gray-800">
                  {stats?.totalSearches || 0}
                </p>
              </div>
              <FiSearch className="text-primary" size={48} />
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">New Users (7d)</p>
                <p className="text-4xl font-bold text-gray-800">
                  {stats?.newUsers || 0}
                </p>
              </div>
              <FiTrendingUp className="text-primary" size={48} />
            </div>
          </div>
        </div>

        {/* Trending Songs */}
        <div className="glass-effect rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Trending Searches
          </h2>
          <div className="space-y-3">
            {stats?.trending.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white/50 p-4 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-primary">
                    #{index + 1}
                  </span>
                  <span className="text-gray-800 font-medium">
                    {item.query}
                  </span>
                </div>
                <span className="bg-primary/20 text-primary-dark px-4 py-1 rounded-full font-semibold">
                  {item.count} searches
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-effect rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {stats?.recentActivity.slice(0, 10).map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white/50 p-4 rounded-xl"
              >
                <div>
                  <p className="text-gray-800 font-medium">{activity.query}</p>
                  <p className="text-gray-600 text-sm">
                    {activity.userId?.name || 'Unknown User'}
                  </p>
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(activity.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-8 text-center glass-effect rounded-2xl p-6">
          <p className="text-gray-700">
            Developed by{' '}
            <span className="font-bold text-primary">@serenaXdev</span>
          </p>
          <p className="text-gray-600 mt-2">Seoul, South Korea 🇰🇷</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://github.com/serenaXdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition"
            >
              GitHub
            </a>
            <a
              href="https://t.me/prince572002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
