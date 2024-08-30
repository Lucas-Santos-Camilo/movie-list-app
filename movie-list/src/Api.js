import axios from 'axios';

// Cria uma instância do Axios com configuração base
const api = axios.create({
    baseURL: 'http://localhost:8000/api/',  // Certifique-se de que a URL base está correta
});

// Adiciona um interceptor para incluir o token em todas as solicitações
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');  // Obtém o token do armazenamento local
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;  // Adiciona o token ao cabeçalho Authorization
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
