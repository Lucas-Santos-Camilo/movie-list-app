import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className="carousel__image"
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieCarousel;
