import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './MovieCarousel.css';

const MovieCarousel = ({ title, apiUrl }) => {
    const [movies, setMovies] = useState([]);
    const carouselRef = useRef(null);

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

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200; // Ajuste o valor conforme necessário
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="carousel">
            <h2>{title}</h2>
            <div className="carousel__controls">
                <button className="carousel__control carousel__control--left" onClick={() => scroll('left')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="carousel__container" ref={carouselRef}>
                    {movies.map(movie => {
                        // Arredonda a nota para o número inteiro mais próximo e calcula a porcentagem
                        const roundedVote = Math.round(movie.vote_average * 10); // Nota arredondada como porcentagem

                        // Formata a data de lançamento
                        const releaseDate = new Date(movie.release_date).toLocaleDateString();

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
                                    <div className="carousel__release-date">
                                        {releaseDate}
                                    </div>
                                    <div class="carousel__before-circle">
                                        <div
                                            className="carousel__progress-circle"
                                            style={{ '--percent': roundedVote / 100 }} // Define o valor percentual para o preenchimento
                                        >
                                            <span className="carousel__rating">{`${roundedVote}%`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="carousel__control carousel__control--right" onClick={() => scroll('right')}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
};

export default MovieCarousel;
