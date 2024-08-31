import React, { useState, useEffect } from 'react';
import './FavoriteMovies.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Função para truncar o título do filme
  const truncateTitle = (title) => {
    const truncated = title.length > 31 ? `${title.slice(0, 28)}...` : title;
    console.log('Truncated Title:', truncated); // Debugging
    return truncated;
  };

  // Função para determinar a cor com base na votação
  const getColorForVote = (percentage) => {
    if (percentage <= 25) return '#ff0000'; // Vermelho
    if (percentage <= 50) return '#ffd700'; // Amarelo
    if (percentage <= 75) return '#0000ff'; // Azul
    return '#00ff00'; // Verde
  };

  useEffect(() => {
    // Função para carregar filmes favoritos do localStorage
    const loadFavoriteMovies = () => {
      const localFavorites = localStorage.getItem('favoriteMovies');
      if (localFavorites) {
        try {
          const parsedMovies = JSON.parse(localFavorites);
          console.log('Filmes carregados do localStorage:', parsedMovies);
          setFavoriteMovies(parsedMovies);
        } catch (error) {
          console.error('Erro ao analisar favoritos do localStorage:', error);
          setFavoriteMovies([]);
        }
      }
    };

    loadFavoriteMovies();
  }, []);

  return (
    <div className="favorite-movies">
      <h1 className="favorite-movies-supertitle">Filmes Favoritos</h1>
      <ul className="favorite-movies-list">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => {
            const percentageVote = movie.vote_average * 10; // Converte de 0-10 para 0-100
            const voteColor = getColorForVote(percentageVote);
            const roundedVote = Math.round(percentageVote); // Arredonda para o formato percentual
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
