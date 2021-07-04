import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import './App.css';
import { HomePage } from './components/HomePage';
import { MovieDetailsPage } from './components/MovieDetailsPage';
import { MoviesPage } from './components/MoviesPage';

export class App extends Component {
  render() {
    return (
      <Router>
        <header>
          <ul className="mainNav">
            <li>
              <Link className="mainNavLink" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="mainNavLink" to="/movies">
                Movies
              </Link>
            </li>
          </ul>
        </header>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route path="/movies" component={MoviesPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
