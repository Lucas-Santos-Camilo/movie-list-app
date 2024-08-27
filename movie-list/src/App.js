import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Movie List</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/movie/:id" component={MovieDetails} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
