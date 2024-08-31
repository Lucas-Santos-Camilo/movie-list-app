import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import MovieCarousel from './components/MovieCarousel/MovieCarousel';
import Footer from './components/Footer/Footer';
import MovieDetails from './components/MovieDetails/MovieDetails';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/PrivateRoute'; // Atualize o caminho conforme necessário

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isMovieDetailsPage = location.pathname.startsWith('/movie/');
  const isYourListPage = location.pathname.startsWith('/your-list');
  return (
    <>
      <header>
        <Navbar />
        {!isMovieDetailsPage && !isYourListPage && <Banner />}
      </header>
      <main>
        {!isMovieDetailsPage && !isYourListPage && (
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

  return (
    <Routes>
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
