import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/'; 

const Search = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [showResults, setShowResults] = useState(false); 
    const navigate = useNavigate();
    const resultsRef = useRef(null); 

    const handleSearch = useCallback(async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: API_KEY,
                    query: query
                }
            });
            setMovies(response.data.results);
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }, [query]);

    useEffect(() => {
        if (query.length >= 4) {
            handleSearch();
        } else {
            setMovies([]);
            setShowResults(false); 
        }
    }, [query, handleSearch]);

    const handleAddFavorite = async (movieId) => {
        try {
            await axios.post(`http://localhost:8000/api/favorites/${movieId}/add_favorite/`);
            alert('Movie added to favorites!');
        } catch (error) {
            console.error('Error adding movie to favorites:', error);
        }
    };

    const handleRemoveFavorite = async (movieId) => {
        try {
            await axios.delete(`http://localhost:8000/api/favorites/${movieId}/remove_favorite/`);
            alert('Movie removed from favorites!');
        } catch (error) {
            console.error('Error removing movie from favorites:', error);
        }
    };

    const viewDetails = (id) => {
        navigate(`/movie/${id}`);
        setQuery('');
        setMovies([]); 
        setShowResults(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='search-bar'>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown} 
                placeholder="Buscar filme"
            />
            <button className="btn-buscar" onClick={handleSearch}>BUSCAR</button>
            <ul className={`movie-results ${showResults ? '' : 'hidden'}`} ref={resultsRef}>
                {movies.map(movie => (
                    <li
                        key={movie.id}
                        className="movie-item"
                        onClick={() => viewDetails(movie.id)}
                    >
                        <img
                            className="movie-poster"
                            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <span className="movie-title">{movie.title}</span>
                        <div className="btn-filmes-busca hidden">
                            <button onClick={(e) => { e.stopPropagation(); viewDetails(movie.id); }}>Detalhes</button>
                            <button onClick={(e) => { e.stopPropagation(); handleAddFavorite(movie.id); }}>Favorito</button>
                            <button onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(movie.id); }}>Remover</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
