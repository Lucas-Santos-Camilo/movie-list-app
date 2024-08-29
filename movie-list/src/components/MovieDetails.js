import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetails.css'; // Adicione o CSS correspondente

const API_KEY = 'c1270f490dff37ccb01ff7fbe275ec99';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const [movieResponse, castResponse] = await Promise.all([
                    axios.get(`${BASE_URL}/movie/${id}`, { params: { api_key: API_KEY, language: 'en-US' } }),
                    axios.get(`${BASE_URL}/movie/${id}/credits`, { params: { api_key: API_KEY } })
                ]);
                setMovie(movieResponse.data);
                setCast(castResponse.data.cast);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleFavoriteClick = () => {
        // Lógica para adicionar/remover favoritos
        // Exemplo:
        setIsFavorite(prev => !prev);
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-details">
            <div
                className="movie-details__background"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            >
                <div className="movie-details__content">
                    <div className="movie-details__cover">
                        <img
                            className="movie-details__poster"
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className="movie-details__info">
                        <h1 className="movie-details__title">{movie.title}</h1>
                        <p className="movie-details__release-date">{new Date(movie.release_date).toLocaleDateString()}</p>
                        <p className="movie-details__genres">
                            {movie.genres.map(genre => genre.name).join(', ')}
                        </p>
                        <p className="movie-details__duration">{movie.runtime} minutes</p>
                        <div
                            className="movie-details__progress-circle"
                            style={{ '--percent': Math.round(movie.vote_average * 10) / 100 }}
                        >
                            <span className="movie-details__rating">
                                {Math.round(movie.vote_average * 10)}%
                            </span>
                        </div>
                        <button className="movie-details__favorite" onClick={handleFavoriteClick}>
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                        <div className="movie-details__synopsis">
                            <h2>Synopsis</h2>
                            <p>{movie.overview}</p>
                            <p><strong>Director:</strong> {movie.credits.crew.find(member => member.job === 'Director')?.name}</p>
                            <p><strong>Writer:</strong> {movie.credits.crew.find(member => member.job === 'Writer')?.name}</p>
                        </div>
                        <div className="movie-details__cast">
                            <h2>Cast</h2>
                            <div className="movie-details__cast-container">
                                {cast.slice(0, 10).map(actor => (
                                    <div key={actor.id} className="movie-details__cast-item">
                                        <img
                                            className="movie-details__cast-image"
                                            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                                            alt={actor.name}
                                        />
                                        <p>{actor.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
