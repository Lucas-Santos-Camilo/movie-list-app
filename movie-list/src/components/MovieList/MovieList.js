// src/components/MovieList/MovieList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieList.css'; // Importe o CSS se necessário

const MovieList = () => {
    // Define os estados
    const [movies, setMovies] = useState([]); // Para armazenar a lista de filmes
    const [loading, setLoading] = useState(true); // Para controlar o estado de carregamento
    const [error, setError] = useState(null); // Para armazenar erros

    // Função para buscar dados da API
    const fetchMovies = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                params: {
                    api_key: 'sua_chave_tmdb' // Substitua com sua chave de API TMDb
                }
            });
            setMovies(response.data.results); // Armazena os dados dos filmes
            setLoading(false); // Atualiza o estado de carregamento
        } catch (err) {
            setError(err); // Armazena o erro se ocorrer
            setLoading(false); // Atualiza o estado de carregamento
        }
    };

    // Use useEffect para buscar os dados quando o componente for montado
    useEffect(() => {
        fetchMovies();
    }, []); // O array vazio significa que o efeito será executado apenas na montagem do componente

    // Exiba o conteúdo com base no estado
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="movie-list">
            <h2>Popular Movies</h2>
            <div className="movie-list__container">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                        />
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
