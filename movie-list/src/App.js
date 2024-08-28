import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import MovieCarousel from './components/MovieCarousel/MovieCarousel';
import MovieDetails from './components/MovieDetails';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Banner />
            <Routes>
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
            <MovieCarousel 
                title="Popular Movies" 
                apiUrl="https://api.themoviedb.org/3/movie/popular?api_key=c1270f490dff37ccb01ff7fbe275ec99" 
            />
            <MovieCarousel 
                title="Trending Now" 
                apiUrl="https://api.themoviedb.org/3/trending/movie/day?api_key=c1270f490dff37ccb01ff7fbe275ec99" 
            />
            <MovieCarousel 
                title="Top Rated" 
                apiUrl="https://api.themoviedb.org/3/movie/top_rated?api_key=c1270f490dff37ccb01ff7fbe275ec99" 
            />
        </Router>
    );
};

export default App;
