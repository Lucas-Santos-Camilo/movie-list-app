import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    // Buscar filmes usando a API TMDb
    const handleSearch = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: 'c1270f490dff37ccb01ff7fbe275ec99',
                    query: query
                }
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // Navegar para a página de detalhes do filme
    const viewDetails = (id) => {
        navigate(`/movie/${id}`);
    };

    // Adicionar filme aos favoritos
    const handleAddFavorite = async (movieId) => {
        try {
            await axios.post(`http://localhost:8000/api/favorites/${movieId}/add_favorite/`);
            alert('Movie added to favorites!');
        } catch (error) {
            console.error('Error adding movie to favorites:', error);
        }
    };

    // Remover filme dos favoritos
    const handleRemoveFavorite = async (movieId) => {
        try {
            await axios.delete(`http://localhost:8000/api/favorites/${movieId}/remove_favorite/`);
            alert('Movie removed from favorites!');
        } catch (error) {
            console.error('Error removing movie from favorites:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie"
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <span>{movie.title}</span>
                        <button onClick={() => viewDetails(movie.id)}>View Details</button>
                        <button onClick={() => handleAddFavorite(movie.id)}>Add to Favorites</button>
                        <button onClick={() => handleRemoveFavorite(movie.id)}>Remove from Favorites</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
