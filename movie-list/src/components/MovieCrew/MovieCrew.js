import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieCrew.css'; // Importe seu CSS se necessário


const API_KEY = 'c1270f490dff37ccb01ff7fbe275ec99';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieCrew = ({ movieId }) => {
    const [director, setDirector] = useState(null);
    const [writer, setWriter] = useState(null);

    useEffect(() => {
        const fetchCrew = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
                    params: { api_key: API_KEY }
                });
                const crew = response.data.crew;

                const director = crew.find(person => person.job === 'Director');
                const writer = crew.find(person => person.job === 'Writer');

                setDirector(director || { name: 'Not Available' });
                setWriter(writer || { name: 'Not Available' });
            } catch (error) {
                console.error('Error fetching movie crew:', error);
            }
        };

        fetchCrew();
    }, [movieId]);

    return (
        <div className="movie-crew">
            <ul className="movie-crew__list">
                {director && (
                    <li className="movie-crew__item">
                        <p>{director.name}</p>
                        <p className="movie-crew__role">Diretor</p>
                    </li>
                )}
                {writer && writer.name !== 'Not Available' && (
                    <li className="movie-crew__item">
                        <p>{writer.name}</p>
                        <p className="movie-crew__role">Roteiro</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MovieCrew;