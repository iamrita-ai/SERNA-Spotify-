import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async () => {
    try {
      const { data } = await axios.get(`/api/youtube/suggestions?query=${query}`, {
        withCredentials: true,
      });
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Suggestions error:', error);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setShowSuggestions(false);
    onSearch(searchQuery);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder="Search for songs, artists..."
          className="w-full px-6 py-4 pl-14 rounded-full bg-white/80 backdrop-blur-sm border-2 border-primary/30 focus:border-primary focus:outline-none text-gray-800 text-lg shadow-lg"
        />
        <FiSearch
          className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={24}
        />
        <button
          onClick={() => handleSearch(query)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition"
        >
          Search
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSearch(suggestion)}
              className="px-6 py-3 hover:bg-primary/20 cursor-pointer transition text-gray-800 border-b border-gray-100 last:border-b-0"
            >
              <FiSearch className="inline mr-3 text-gray-500" />
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
