import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import Player from '../components/Player';
import Footer from '../components/Footer';
import { usePlayer } from '../context/PlayerContext';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setPlayerPlaylist } = usePlayer();

  useEffect(() => {
    fetchRecentlyPlayed();
  }, []);

  const fetchRecentlyPlayed = async () => {
    try {
      const { data } = await axios.get('/api/user/recently-played', {
        withCredentials: true,
      });
      setRecentlyPlayed(data.recentlyPlayed || []);
    } catch (error) {
      console.error('Error fetching recently played:', error);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`/api/youtube/search?query=${query}`, {
        withCredentials: true,
      });
      setSongs(data.songs || []);
      if (data.songs.length === 0) {
        toast.error('No songs found');
      }
    } catch (error) {
      toast.error('Error searching songs');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (song, index) => {
    setPlayerPlaylist(songs, index);
  };

  const handlePlayRecent = (song) => {
    setPlayerPlaylist([song], 0);
  };

  return (
    <div className="min-h-screen pb-32">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Search for Music
          </h2>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
          </div>
        )}

        {/* Search Results */}
        {songs.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Search Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {songs.map((song, index) => (
                <SongCard
                  key={song.videoId}
                  song={song}
                  onPlay={() => handlePlay(song, index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recently Played */}
        {recentlyPlayed.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Recently Played
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentlyPlayed.slice(0, 8).map((song) => (
                <SongCard
                  key={song.videoId}
                  song={song}
                  onPlay={() => handlePlayRecent(song)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && songs.length === 0 && recentlyPlayed.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Start Searching for Music
            </h3>
            <p className="text-gray-600">
              Use the search bar above to find your favorite songs
            </p>
          </div>
        )}
      </div>

      <Player />
      <Footer />
    </div>
  );
};

export default Home;
