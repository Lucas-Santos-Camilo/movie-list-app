import React, { useEffect, useState } from 'react';
import FavoriteButton from './FavoriteButton';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('/api/movies/');
      const data = await response.json();
      setMovies(data);
    };

    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorite-movies/your-list/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFavorites(data.map(fav => fav.movie_id));
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchMovies();
    fetchFavorites();
  }, []);

  const handleFavoriteToggle = () => {
    fetchFavorites(); // Atualiza a lista de favoritos
  };

  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <FavoriteButton
            movieId={movie.id}
            isFavorite={favorites.includes(movie.id)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
