import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: 'c1270f490dff37ccb01ff7fbe275ec99', 
          query: query
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const viewDetails = (id) => {
    history.push(`/movie/${id}`);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <span>{movie.title}</span>
            <button onClick={() => viewDetails(movie.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
