import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { usePlayer } from '../context/PlayerContext';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2 } from 'react-icons/fi';

const Player = () => {
  const {
    currentSong,
    isPlaying,
    pauseSong,
    resumeSong,
    nextSong,
    previousSong,
    playerRef,
  } = usePlayer();

  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
    if (isPlaying) {
      playerRef.current.playVideo();
    }
  };

  const onEnd = () => {
    nextSong();
  };

  if (!currentSong) return null;

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl z-50">
      <YouTube
        videoId={currentSong.videoId}
        opts={opts}
        onReady={onReady}
        onEnd={onEnd}
      />
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center space-x-4 flex-1">
            <img
              src={currentSong.thumbnail}
              alt={currentSong.title}
              className="w-16 h-16 rounded-lg shadow-md"
            />
            <div className="hidden sm:block">
              <h4 className="font-bold text-gray-800 truncate max-w-xs">
                {currentSong.title}
              </h4>
              <p className="text-gray-600 text-sm truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6">
            <button
              onClick={previousSong}
              className="text-gray-700 hover:text-primary transition"
            >
              <FiSkipBack size={24} />
            </button>
            <button
              onClick={isPlaying ? pauseSong : resumeSong}
              className="bg-primary hover:bg-primary-dark text-white p-3 rounded-full transition"
            >
              {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
            </button>
            <button
              onClick={nextSong}
              className="text-gray-700 hover:text-primary transition"
            >
              <FiSkipForward size={24} />
            </button>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-end">
            <FiVolume2 className="text-gray-700" size={20} />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
