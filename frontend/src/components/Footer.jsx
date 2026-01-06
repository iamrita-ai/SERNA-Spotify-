import React from 'react';
import { FiGithub, FiSend } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">
              🎵 Spotify Clone
            </h3>
            <p className="text-gray-400">
              Stream your favorite music online with our modern music player.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-primary transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/admin/login" className="hover:text-primary transition">
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Developer</h4>
            <div className="space-y-2 text-gray-400">
              <p className="font-semibold text-primary">@serenaXdev</p>
              <p>📍 Seoul, South Korea 🇰🇷</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://github.com/serenaXdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  <FiGithub size={24} />
                </a>
                <a
                  href="https://t.me/prince572002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  <FiSend size={24} />
                </a>
              </div>
              <p className="text-sm mt-2">Username: prince572002</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>
            © 2024 Spotify Clone. Developed by{' '}
            <span className="text-primary font-semibold">@serenaXdev</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
