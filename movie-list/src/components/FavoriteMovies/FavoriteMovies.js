import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './FavoriteMovies.css'; // Adicione um arquivo CSS para estilizar a lista se necessário
import FavoriteButton from '../FavoriteButton/FavoriteButton'; // Importe o componente FavoriteButton

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const cookiesFavorites = Cookies.get('favoriteMovies');
    if (cookiesFavorites) {
      setFavoriteMovies(JSON.parse(cookiesFavorites));
    }
  }, []);

  const handleFavoriteToggle = (movie) => {
    const cookiesFavorites = Cookies.get('favoriteMovies');
    let favoriteMovies = cookiesFavorites ? JSON.parse(cookiesFavorites) : [];

    if (favoriteMovies.some(fav => fav.id === movie.id)) {
      favoriteMovies = favoriteMovies.filter(fav => fav.id !== movie.id);
    } else {
      favoriteMovies.push(movie);
    }

    Cookies.set('favoriteMovies', JSON.stringify(favoriteMovies), { expires: 7 });
    setFavoriteMovies(favoriteMovies);
  };

  return (
    <div className="favorite-movies">
      <h1>Favorite Movies</h1>
      <ul className="favorite-movies-list">
        {favoriteMovies.map(movie => (
          <li key={movie.id} className="favorite-movie-item">
            <img
              className="favorite-movie-poster"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="favorite-movie-details">
              <h2 className="favorite-movie-title">{movie.title}</h2>
              <p className="favorite-movie-release-date">
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
              <p className="favorite-movie-rating">
                Rating: {movie.vote_average}
              </p>
              <FavoriteButton
                movie={movie}
                onFavoriteToggle={() => handleFavoriteToggle(movie)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteMovies;
