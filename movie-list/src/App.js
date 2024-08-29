import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import MovieCarousel from './components/MovieCarousel/MovieCarousel';
import Footer from './components/Footer/Footer';
import MovieDetails from './components/MovieDetails/MovieDetails';

// Definindo o componente MainLayout
const MainLayout = ({ children }) => {
    const location = useLocation();
    const isMovieDetailsPage = location.pathname.startsWith('/movie/');

    return (
        <>
            <header>
                <Navbar />
                {!isMovieDetailsPage && <Banner />}
            </header>
            <main>
                {!isMovieDetailsPage && (
                    <>
                        <MovieCarousel 
                            title="Filmes Populares" 
                            apiUrl="https://api.themoviedb.org/3/movie/popular?api_key=c1270f490dff37ccb01ff7fbe275ec99&language=pt-BR" 
                        />
                        <MovieCarousel 
                            title="Tendências" 
                            apiUrl="https://api.themoviedb.org/3/trending/movie/day?api_key=c1270f490dff37ccb01ff7fbe275ec99&language=pt-BR" 
                        />
                        <MovieCarousel 
                            title="Mais votados" 
                            apiUrl="https://api.themoviedb.org/3/movie/top_rated?api_key=c1270f490dff37ccb01ff7fbe275ec99&language=pt-BR" 
                        />
                    </>
                )}
                {children}
            </main>
            <Footer />
        </>
    );
};

const App = () => {
    return (
        <Router>
            <MainLayout>
                <Routes> 
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default App;
