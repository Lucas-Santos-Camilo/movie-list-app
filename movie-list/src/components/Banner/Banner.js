import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.css';

const API_KEY = 'c1270f490dff37ccb01ff7fbe275ec99';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_ENDPOINT = '/movie/popular'; // Endpoint para filmes populares
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';

const Banner = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${POPULAR_ENDPOINT}`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                        page: 1
                    }
                });
                setMovies(response.data.results.slice(0, 3)); // Pega os top 3 filmes populares
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
            }, 15000);

            return () => clearInterval(interval);
        }
    }, [movies]);

    const handlePagerClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <header 
            className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: movies.length > 0 ? `url(${IMAGE_BASE_URL}${movies[currentIndex].backdrop_path})` : ''
            }}
        >
            <div className="banner__contents">
                {movies.length > 0 && (
                    <div className="banner__item fade-up">
                        <h1 className="banner__title">{movies[currentIndex].title}</h1>
                    </div>
                )}
            </div>
            <div className="banner__fadeBottom"></div>
            <div className="banner__pager">
                {movies.map((_, index) => (
                    <span
                        key={index}
                        className={`banner__pagerDot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handlePagerClick(index)}
                    />
                ))}
            </div>
        </header>
    );
};

export default Banner;
