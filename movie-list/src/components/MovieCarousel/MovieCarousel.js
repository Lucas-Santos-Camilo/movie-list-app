import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MovieCarousel.css';

const MovieCarousel = ({ title, apiUrl }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get(apiUrl);
                setMovies(response.data.results);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        }
        fetchMovies();
    }, [apiUrl]);

    return (
        <div className="carousel">
            <h2>{title}</h2>
            <div className="carousel__container">
                {movies.map(movie => {
                    // Arredonda a nota para o número inteiro mais próximo
                    const roundedVote = Math.round(movie.vote_average * 10); // Nota arredondada como porcentagem

                    return (
                        <div key={movie.id} className="carousel__item">
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    className="carousel__image"
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </Link>
                            <div className="carousel__details">
                                <Link to={`/movie/${movie.id}`} className="carousel__title">
                                    {movie.title}
                                </Link>
                                <div className="carousel__rating-container">
                                    <div
                                        className="carousel__progress-circle"
                                        style={{ '--percent': roundedVote }}
                                    >
                                        <span className="carousel__rating">{`${roundedVote}%`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MovieCarousel;
