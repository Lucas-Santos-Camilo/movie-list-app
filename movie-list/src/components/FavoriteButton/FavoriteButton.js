import React from 'react';
import Cookies from 'js-cookie';
import './FavoriteButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

const FavoriteButton = ({ movie, onFavoriteToggle }) => {
    // Verifica se movie e movie.id estão definidos
    if (!movie || !movie.id) {
        console.error('Invalid movie object or movie id is missing');
        return null;
    }

    // Função para verificar se o filme é favorito
    const isMovieFavorite = () => {
        const cookiesFavorites = Cookies.get('favoriteMovies');
        if (cookiesFavorites) {
            const favoriteMovies = JSON.parse(cookiesFavorites);
            return favoriteMovies.some(fav => fav.id === movie.id);
        }
        return false;
    };

    // Função para adicionar ou remover o filme dos favoritos
    const handleToggleFavorite = () => {
        const cookiesFavorites = Cookies.get('favoriteMovies');
        let favoriteMovies = cookiesFavorites ? JSON.parse(cookiesFavorites) : [];

        if (isMovieFavorite()) {
            favoriteMovies = favoriteMovies.filter(fav => fav.id !== movie.id);
        } else {
            favoriteMovies.push(movie);
        }

        Cookies.set('favoriteMovies', JSON.stringify(favoriteMovies), { expires: 7 });
        onFavoriteToggle();
    };

    return (
        <button
            className={`favorite-button ${isMovieFavorite() ? 'favorite' : 'not-favorite'}`}
            onClick={handleToggleFavorite}
        >
            <FontAwesomeIcon icon={isMovieFavorite() ? faHeartBroken : faHeart} />
        </button>
    );
};

export default FavoriteButton;
