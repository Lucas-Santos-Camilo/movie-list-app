import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './MovieCarousel.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import Cookies from 'js-cookie';

const MovieCarousel = ({ title, apiUrl }) => {
    const [movies, setMovies] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get(apiUrl);
                console.log('API Response:', response.data); // Debugging
                setMovies(response.data.results);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        }
        fetchMovies();
    }, [apiUrl]);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleFavoriteToggle = (movie) => {
        const cookiesFavorites = Cookies.get('favoriteMovies');
        let favoriteMovies = cookiesFavorites ? JSON.parse(cookiesFavorites) : [];
        let updatedFavorites;
        if (favoriteMovies.some(fav => fav.id === movie.id)) {
            updatedFavorites = favoriteMovies.filter(fav => fav.id !== movie.id);
        } else {
            updatedFavorites = [...favoriteMovies, movie];
        }
        Cookies.set('favoriteMovies', JSON.stringify(updatedFavorites));
    };

    const getColorForVote = (vote) => {
        if (vote <= 25) return 'red';
        if (vote <= 50) return 'yellow';
        if (vote <= 75) return 'blue';
        return 'green';
    };

    const truncateTitle = (title) => {
        return title.length > 31 ? `${title.slice(0, 28)}...` : title;
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
                        console.log('Movie Data:', movie); // Debugging
                        const roundedVote = Math.round(movie.vote_average * 10);
                        const releaseDate = new Date(movie.release_date).toLocaleDateString();
                        const voteColor = getColorForVote(roundedVote);

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
                                        {truncateTitle(movie.title)}
                                    </Link>
                                    <div className="carousel__release-date">
                                        {releaseDate}
                                    </div>
                                    <div className="carousel__before-circle">
                                        <div
                                            className="carousel__progress-circle"
                                            style={{ '--percent': roundedVote / 100, '--circle-color': voteColor }}
                                        >
                                            <span className="carousel__rating">{`${roundedVote}%`}</span>
                                        </div>
                                    </div>
                                    <FavoriteButton 
                                        movie={movie}
                                        onFavoriteToggle={() => handleFavoriteToggle(movie)}
                                    />
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
