import React, { Component, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import './App.css';
import { MyLoader } from './components/Loader';
/*import { HomePage } from './components/HomePage';
import { MovieDetailsPage } from './components/MovieDetailsPage';
import { MoviesPage } from './components/MoviesPage';*/

const HomePage = lazy(() =>
  import(
    './components/HomePage/HomePage.js' /* webpackChunkName: "home-page"*/
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movie-details-page"*/
  ),
);
const MoviesPage = lazy(() =>
  import(
    './components/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-page"*/
  ),
);

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
        <Suspense fallback={<MyLoader />}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies/:movieId" component={MovieDetailsPage} />
            <Route path="/movies" component={MoviesPage} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
