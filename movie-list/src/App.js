import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import MovieCarousel from './components/MovieCarousel/MovieCarousel';
import Footer from './components/Footer/Footer';
import MovieDetails from './components/MovieDetails/MovieDetails';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/PrivateRoute'; 

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isMovieDetailsPage = location.pathname.startsWith('/movie/');
  const isYourListPage = location.pathname.startsWith('/your-list');
  const isLoginPage = location.pathname.startsWith('/login');
  return (
    <>
      <header>
        <Navbar />
        {!isMovieDetailsPage && !isYourListPage && !isLoginPage && <Banner />}
      </header>
      <main>
        {!isMovieDetailsPage && !isYourListPage && !isLoginPage && (
          <>
            <MovieCarousel
              title="Filmes Populares"
              apiUrl={`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`}
            />
            <MovieCarousel
              title="Tendências"
              apiUrl={`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`}
            />
            <MovieCarousel
              title="Mais votados"
              apiUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`}
            />
          </>
        )}
        {children}
      </main>
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/your-list" />} />
      <Route path="/movie/:id" element={<ProtectedRoute element={<MovieDetails />} />} />
      <Route path="/your-list" element={<ProtectedRoute element={<FavoriteMovies />} />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </AuthProvider>
  );
};

export default App;
