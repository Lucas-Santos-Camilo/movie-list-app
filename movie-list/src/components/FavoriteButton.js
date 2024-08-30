import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Caminho atualizado

const FavoriteButton = ({ movieId, isFavorite, onFavoriteToggle }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const { userToken } = useAuth(); // Obtém o token do contexto

  const handleToggleFavorite = async () => {
    try {
      const method = favorite ? 'DELETE' : 'POST';
      const action = favorite ? 'remove_favorite' : 'add_favorite'; // Determina a ação baseada no estado
      const response = await fetch(`/api/favorite-movies/${movieId}/${action}/`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`, // Inclui o token de autenticação
        },
      });

      if (response.ok) {
        setFavorite(!favorite);
        onFavoriteToggle();
      } else {
        console.error('Failed to toggle favorite');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleToggleFavorite}>
      {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
