import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CastCarousel from '../CastCarousel/CastCarousel';
import MovieCrew from '../MovieCrew/MovieCrew'; // Importa o componente MovieCrew
import ColorThief from 'color-thief-browser'; // Biblioteca para extração de cor
import Color from 'color'; // Biblioteca para manipulação de cores
import './MovieDetails.css';

const API_KEY = 'c1270f490dff37ccb01ff7fbe275ec99';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [overlayColor, setOverlayColor] = useState('rgba(0, 0, 0, 0.9)');
    const [textColor, setTextColor] = useState('#ffffff');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Requisição para obter os detalhes do filme
                const movieResponse = await axios.get(`${BASE_URL}/movie/${id}`, {
                    params: { 
                        api_key: API_KEY, 
                        language: 'pt-BR' 
                    }
                });

                // Requisição para obter o elenco
                const castResponse = await axios.get(`${BASE_URL}/movie/${id}/credits`, { params: { api_key: API_KEY } });

                setMovie(movieResponse.data);
                setCast(castResponse.data.cast);

                // Obter a URL da imagem
                const imageUrl = `https://image.tmdb.org/t/p/original${movieResponse.data.backdrop_path}`;
                const image = new Image();
                image.crossOrigin = 'Anonymous'; // Importante para evitar problemas de CORS
                image.src = imageUrl;

                image.onload = () => {
                    try {
                        const colorThief = new ColorThief();
                        const dominantColor = colorThief.getColor(image);
                        const rgbaColor = `rgba(${dominantColor.join(',')}, 0.5)`; // Adiciona opacidade
                        setOverlayColor(rgbaColor);

                        // Calcula a cor do texto baseado na luminosidade
                        const color = Color(`rgb(${dominantColor.join(',')})`);
                        const luminance = color.luminosity(); // Luminosidade do fundo
                        setTextColor(luminance > 0.5 ? '#000000' : '#ffffff'); // Preto para fundo claro, branco para fundo escuro
                    } catch (error) {
                        console.error('Erro ao extrair a cor dominante:', error);
                        // Fallback para uma cor padrão
                        setOverlayColor('rgba(0, 0, 0, 0.5)');
                        setTextColor('#ffffff');
                    }
                };

                image.onerror = () => {
                    console.error('Erro ao carregar a imagem para extração de cor');
                    // Fallback para uma cor padrão
                    setOverlayColor('rgba(0, 0, 0, 0.5)');
                    setTextColor('#ffffff');
                };
            } catch (error) {
                console.error('Erro ao buscar os detalhes do filme:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleFavoriteClick = () => {
        setIsFavorite(prev => !prev);
    };

    // Função para converter minutos em horas e minutos
    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    if (!movie) return <div>Loading...</div>;

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
                            {movie.title} ({new Date(movie.release_date).getFullYear()})
                        </h1>
                        <div className="movie-more-details">
                            <p className="movie-details__release-date">{new Date(movie.release_date).toLocaleDateString()}</p>
                            <p className="movie-details__genres">
                                {movie.genres.map(genre => genre.name).join(', ')}
                            </p>
                            <p className="movie-details__duration">{formatRuntime(movie.runtime)}</p>
                        </div>
                        <div
                            className="movie-details__progress-circle"
                            style={{ '--percent': Math.round(movie.vote_average * 10) / 100 }}
                        >
                            <span className="movie-details__rating">
                                {Math.round(movie.vote_average * 10)}%
                            </span>
                        </div>
                        <button className="movie-details__favorite" onClick={handleFavoriteClick}>
                            {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                        </button>
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
