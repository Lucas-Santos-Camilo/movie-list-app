import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import MovieCarousel from './components/MovieCarousel/MovieCarousel';
import Footer from './components/Footer/Footer';
import MovieDetails from './components/MovieDetails/MovieDetails';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import { AuthProvider } from './context/AuthContext';

// Definindo o componente MainLayout
const MainLayout = ({ children }) => {
    const location = useLocation();
    const isMovieDetailsPage = location.pathname.startsWith('/movie/');
    const isFavoriteMoviesPage = location.pathname === '/your-list';

    return (
        <>
            <header>
                <Navbar />
                {!isMovieDetailsPage && !isFavoriteMoviesPage && <Banner />}
            </header>
            <main>
                {!isMovieDetailsPage && !isFavoriteMoviesPage && (
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
      <AuthProvider>
        <Router>
          <MainLayout>
            <Routes> 
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/your-list" element={<FavoriteMovies />} />
            </Routes>
          </MainLayout>
        </Router>
      </AuthProvider>
    );
  };

export default App;
