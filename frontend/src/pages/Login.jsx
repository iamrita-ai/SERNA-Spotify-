import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl animate-fadeIn">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎵</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Spotify Clone
          </h1>
          <p className="text-gray-600">Stream unlimited music</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 border-2 border-gray-200 hover:border-primary"
        >
          <FcGoogle size={28} />
          <span>Continue with Google</span>
        </button>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>By continuing, you agree to our Terms of Service</p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300 text-center text-gray-700">
          <p className="text-sm">
            Developed by{' '}
            <span className="font-bold text-primary">@serenaXdev</span>
          </p>
          <p className="text-xs mt-1">Seoul, South Korea 🇰🇷</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
