import React from 'react';
import axios from 'axios';

const FavoriteButton = ({ movieId, isFavorite, onFavoriteToggle }) => {
    const handleToggleFavorite = async () => {
        try {
            const method = isFavorite ? 'delete' : 'post';
            const url = `http://localhost:8000/api/favorite-movies/${movieId}/${isFavorite ? 'remove_favorite' : 'add_favorite'}/`;
            
            await axios({ method, url });
            onFavoriteToggle();
        } catch (error) {
            console.error('Failed to toggle favorite', error);
        }
    };

    return (
        <button onClick={handleToggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
};

export default FavoriteButton;
