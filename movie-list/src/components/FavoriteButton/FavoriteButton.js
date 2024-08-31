import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './FavoriteButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const FavoriteButton = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Função para verificar se o filme é favorito
    const checkIfMovieIsFavorite = useCallback(() => {
        const localFavorites = localStorage.getItem('favoriteMovies');
        if (localFavorites) {
            try {
                const favoriteMovies = JSON.parse(localFavorites);
                return favoriteMovies.some(fav => fav.id === movie.id);
            } catch (error) {
                console.error('Erro ao analisar favoritos do localStorage:', error);
            }
        }
        return false;
    }, [movie.id]);

    // Função para buscar detalhes do filme
    const fetchMovieDetails = async (movieId) => {
        try {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                params: {
                    api_key: API_KEY,
                    language: 'pt-BR' // ou 'en-US' conforme necessário
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar detalhes do filme:', error);
            return null;
        }
    };

    // Atualiza o estado inicial de favorito
    useEffect(() => {
        setIsFavorite(checkIfMovieIsFavorite());
    }, [checkIfMovieIsFavorite]);

    // Lida com a mudança de estado de favorito
    const handleToggleFavorite = async () => {
        let favoriteMovies = localStorage.getItem('favoriteMovies');
        favoriteMovies = favoriteMovies ? JSON.parse(favoriteMovies) : [];

        if (isFavorite) {
            // Remove o filme dos favoritos
            favoriteMovies = favoriteMovies.filter(fav => fav.id !== movie.id);
            console.log(`Filme removido dos favoritos: ${movie.title}`);
        } else {
            // Busca detalhes do filme e adiciona aos favoritos
            const movieDetails = await fetchMovieDetails(movie.id);
            if (movieDetails) {
                favoriteMovies.push(movieDetails);
                console.log(`Filme adicionado aos favoritos: ${movie.title}`);
            }
        }

        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
        setIsFavorite(!isFavorite);
    };

    return (
        <button
            className={`favorite-button ${isFavorite ? 'favorite' : 'not-favorite'}`}
            onClick={handleToggleFavorite}
        >
            <FontAwesomeIcon icon={isFavorite ? faHeart : faHeart} />
        </button>
    );
};

export default FavoriteButton;
