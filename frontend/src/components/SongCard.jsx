import React from 'react';
import { FiPlay } from 'react-icons/fi';

const SongCard = ({ song, onPlay }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group">
      <div className="relative">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onPlay(song)}
            className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform"
          >
            <FiPlay size={28} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 truncate mb-1">
          {song.title}
        </h3>
        <p className="text-gray-600 text-sm truncate">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
