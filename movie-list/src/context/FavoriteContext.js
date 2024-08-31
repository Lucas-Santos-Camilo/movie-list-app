import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const cookiesFavorites = Cookies.get('favoriteMovies');
        if (cookiesFavorites) {
            setFavoriteMovies(JSON.parse(cookiesFavorites));
        }
    }, []);

    const toggleFavorite = (movie) => {
        const cookiesFavorites = Cookies.get('favoriteMovies');
        let favoriteMoviesList = cookiesFavorites ? JSON.parse(cookiesFavorites) : [];

        if (favoriteMoviesList.some(fav => fav.id === movie.id)) {
            favoriteMoviesList = favoriteMoviesList.filter(fav => fav.id !== movie.id);
        } else {
            favoriteMoviesList.push(movie);
        }

        Cookies.set('favoriteMovies', JSON.stringify(favoriteMoviesList), { expires: 7 });
        setFavoriteMovies(favoriteMoviesList);
    };

    return (
        <FavoriteContext.Provider value={{ favoriteMovies, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export { FavoriteContext, FavoriteProvider };
