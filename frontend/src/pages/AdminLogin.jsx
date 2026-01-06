import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '572002') {
      sessionStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl animate-fadeIn">
        <div className="text-center mb-8">
          <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiLock size={40} className="text-primary-dark" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-600">Enter password to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-6 py-4 rounded-full bg-white/80 border-2 border-primary/30 focus:border-primary focus:outline-none text-gray-800 mb-6"
            autoFocus
          />

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-full shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-primary hover:text-primary-dark transition">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
