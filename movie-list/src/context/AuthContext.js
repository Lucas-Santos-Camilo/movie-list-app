import React, { createContext, useContext, useState, useEffect } from 'react';

// Contexto para autenticação
const AuthContext = createContext();

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            const token = localStorage.getItem('userToken');
            setUserToken(token);
        };

        fetchToken();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};