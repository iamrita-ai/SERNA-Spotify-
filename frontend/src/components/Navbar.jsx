import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass-effect sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-3xl">🎵</div>
            <h1 className="text-2xl font-bold text-gray-800">
              Spotify Clone
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/50 px-4 py-2 rounded-full">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-800 font-medium hidden sm:block">
                {user?.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
