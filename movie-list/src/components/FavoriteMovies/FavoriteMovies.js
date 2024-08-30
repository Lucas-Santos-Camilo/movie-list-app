import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Certifique-se de que o caminho está correto

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);
  const { userToken } = useAuth(); // Obtendo o token do contexto

  useEffect(() => {
    fetch('/api/your-list/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}` // Usando o token fixo
      }
    })
    .then(response => response.json())
    .then(data => {
      setFavorites(data);
    });
  }, [userToken]);

  return (
    <div>
      <h2>Meus Filmes Favoritos</h2>
      {favorites.length > 0 ? (
        favorites.map(movie => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
          </div>
        ))
      ) : (
        <p>Você ainda não favoritou nenhum filme.</p>
      )}
    </div>
  );
};

export default FavoriteMovies;
