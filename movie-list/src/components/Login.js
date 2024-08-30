import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useAuth } from '../context/AuthContext'; // Importa o contexto de autenticação

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate
    const { login } = useAuth(); // Obtém a função login do contexto

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            const { access, refresh } = response.data;

            // Armazena os tokens no localStorage
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            // Atualiza o estado de autenticação no contexto
            login(access); // Atualiza o estado com o token

            // Redireciona para a página de favoritos após login bem-sucedido
            navigate('/your-list'); // Substitua '/your-list' pela sua rota desejada
        } catch (error) {
            console.error('Login falhou:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
