import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CastCarousel from '../CastCarousel/CastCarousel';
import MovieCrew from '../MovieCrew/MovieCrew'; 
import ColorThief from 'color-thief-browser'; 
import Color from 'color'; 
import './MovieDetails.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton'; 
import Cookies from 'js-cookie'; 

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [overlayColor, setOverlayColor] = useState('rgba(0, 0, 0, 0.9)');
    const [textColor, setTextColor] = useState('#ffffff');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                let movieResponse = await axios.get(`${BASE_URL}/movie/${id}`, {
                    params: { 
                        api_key: API_KEY, 
                        language: 'pt-BR' 
                    }
                });

                if (!movieResponse.data || !movieResponse.data.overview) {
                    movieResponse = await axios.get(`${BASE_URL}/movie/${id}`, {
                        params: { 
                            api_key: API_KEY, 
                            language: 'en-US' 
                        }
                    });
                }

                const castResponse = await axios.get(`${BASE_URL}/movie/${id}/credits`, { params: { api_key: API_KEY } });

                console.log('Movie Response:', movieResponse.data);
                console.log('Cast Response:', castResponse.data);

                setMovie(movieResponse.data);
                setCast(castResponse.data.cast);

                const image = new Image();
                image.crossOrigin = 'Anonymous';
                image.src = `https://image.tmdb.org/t/p/original${movieResponse.data.backdrop_path}`;
                image.onload = () => {
                    const colorThief = new ColorThief();
                    const dominantColor = colorThief.getColor(image);
                    const rgbaColor = `rgba(${dominantColor.join(',')}, 0.5)`; 
                    setOverlayColor(rgbaColor);

                    const color = Color(`rgb(${dominantColor.join(',')})`);
                    const luminance = color.luminosity(); 
                    setTextColor(luminance > 0.5 ? '#000000' : '#ffffff'); 
                };
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const getRatingColor = (rating) => {
        if (rating <= 25) return '#ff0000'; 
        if (rating <= 50) return '#ffd700'; 
        if (rating <= 75) return '#0000ff';
        return '#00ff00'; 
    };

    const toggleFavorite = (movie) => {
        const cookiesFavorites = Cookies.get('favoriteMovies');
        let favoriteMovies = cookiesFavorites ? JSON.parse(cookiesFavorites) : [];

        if (favoriteMovies.some(fav => fav.id === movie.id)) {
            favoriteMovies = favoriteMovies.filter(fav => fav.id !== movie.id);
        } else {
            favoriteMovies.push(movie);
        }

        Cookies.set('favoriteMovies', JSON.stringify(favoriteMovies), { expires: 7 });
    };

    if (!movie) return <div>CARREGANDO...</div>;

    return (
        <div className="movie-details">
            <div
                className="movie-details__background"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            >
                <div
                    className="movie-details__overlay"
                    style={{ backgroundColor: overlayColor }}
                ></div>
                <div className="movie-details__content">
                    <div className="movie-details__cover">
                        <img
                            className="movie-details__poster"
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className="movie-details__info" style={{ color: textColor }}>
                        <h1 className="movie-details__title">
                            {movie.title.length > 31 ? `${movie.title.slice(0, 31)}...` : movie.title} ({new Date(movie.release_date).getFullYear()})
                        </h1>
                        <div className="movie-more-details">
                            <p className="movie-details__release-date">{new Date(movie.release_date).toLocaleDateString()}</p>
                            <p className="movie-details__genres">
                                {movie.genres.map(genre => genre.name).join(', ')}
                            </p>
                            <p className="movie-details__duration">{formatRuntime(movie.runtime)}</p>
                            <FavoriteButton
                                movie={movie}
                                onFavoriteToggle={() => toggleFavorite(movie)}
                            />
                        </div>
                        <div
                            className="movie-details__progress-circle"
                            style={{ 
                                '--percent': Math.round(movie.vote_average * 10) / 100,
                                background: `conic-gradient(${getRatingColor(Math.round(movie.vote_average * 10))} calc(${Math.round(movie.vote_average * 10)}%), transparent 0%)`
                            }}
                        >
                            <span className="movie-details__rating">
                                {Math.round(movie.vote_average * 10)}%
                            </span>
                        </div>
                        <div className="movie-details__synopsis">
                            {movie.tagline && (
                                <h3 className="tagline" dir="auto">{movie.tagline}</h3>
                            )}
                            <h3 dir="auto">Sinopse</h3>
                            <div className="overview" dir="auto">
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                        <MovieCrew movieId={id} />
                    </div>
                </div>
            </div>
            <CastCarousel cast={cast} />
        </div>
    );
};

export default MovieDetails;
