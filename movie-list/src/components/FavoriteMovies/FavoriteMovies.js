import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './FavoriteMovies.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const location = useLocation();

  const truncateTitle = (title) => {
    return title.length > 31 ? `${title.slice(0, 28)}...` : title;
  };

  const getColorForVote = (percentage) => {
    if (percentage <= 25) return '#ff0000'; 
    if (percentage <= 50) return '#ffd700'; 
    if (percentage <= 75) return '#0000ff'; 
    return '#00ff00'; 
  };

  
  const copyToClipboard = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/your-list?favorites=${encodeURIComponent(JSON.stringify(favoriteMovies))}`;
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copiado para a área de transferência!'))
      .catch((error) => console.error('Erro ao copiar o link:', error));
  };

  useEffect(() => {
    
    const loadFavoriteMovies = () => {
      const params = new URLSearchParams(location.search);
      const favoritesParam = params.get('favorites');

      if (favoritesParam) {
        try {
          const parsedMovies = JSON.parse(decodeURIComponent(favoritesParam));
          setFavoriteMovies(parsedMovies);
        } catch (error) {
          console.error('Erro ao analisar favoritos da URL:', error);
          setFavoriteMovies([]);
        }
      } else {
        
        const localFavorites = localStorage.getItem('favoriteMovies');
        if (localFavorites) {
          try {
            const parsedMovies = JSON.parse(localFavorites);
            setFavoriteMovies(parsedMovies);
          } catch (error) {
            console.error('Erro ao analisar favoritos do localStorage:', error);
            setFavoriteMovies([]);
          }
        }
      }
    };

    loadFavoriteMovies();
  }, [location.search]); 

  return (
    <div className="favorite-movies">
      <h1 className="favorite-movies-supertitle">Filmes Favoritos</h1>
      <button className="share-button" onClick={copyToClipboard}>
        <FontAwesomeIcon icon={faShare} /> Compartilhar Lista de Favoritos
      </button>
      <ul className="favorite-movies-list">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => {
            const percentageVote = movie.vote_average * 10;
            const voteColor = getColorForVote(percentageVote);
            const roundedVote = Math.round(percentageVote);
            return (
              <li key={movie.id} className="favorite-movie-item">
                <img
                  className="favorite-movie-poster"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="favorite-movie-details">
                  <h2 className="favorite-movie-title">
                    {truncateTitle(movie.title)}
                  </h2>
                  <p className="favorite-movie-release-date">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </p>
                  <div className="favorite-movie-rating-container">
                    <div
                      className="favorite-movie-rating-circle"
                      style={{ 
                        '--circle-color': voteColor,
                        background: `conic-gradient(${voteColor} ${percentageVote}%, transparent 0%)`
                      }}
                    >
                      <span className="favorite-movie-rating-text">
                        {`${roundedVote}%`}
                      </span>
                    </div>
                  </div>
                  <FavoriteButton
                    movie={movie}
                    onFavoriteToggle={() => {}}
                  />
                </div>
              </li>
            );
          })
        ) : (
          <p>Nenhum filme favorito encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default FavoriteMovies;
