import React, { createContext, useState, useContext, useRef } from 'react';
import axios from 'axios';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef = useRef(null);

  const playSong = async (song) => {
    setCurrentSong(song);
    setIsPlaying(true);

    // Add to recently played
    try {
      await axios.post(
        '/api/user/recently-played',
        {
          videoId: song.videoId,
          title: song.title,
          thumbnail: song.thumbnail,
          artist: song.artist,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Failed to update recently played:', error);
    }
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const resumeSong = () => {
    setIsPlaying(true);
  };

  const nextSong = () => {
    if (currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      playSong(playlist[nextIndex]);
    }
  };

  const previousSong = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      playSong(playlist[prevIndex]);
    }
  };

  const setPlayerPlaylist = (songs, index = 0) => {
    setPlaylist(songs);
    setCurrentIndex(index);
    playSong(songs[index]);
  };

  const value = {
    currentSong,
    isPlaying,
    playlist,
    currentIndex,
    playerRef,
    playSong,
    pauseSong,
    resumeSong,
    nextSong,
    previousSong,
    setPlayerPlaylist,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
