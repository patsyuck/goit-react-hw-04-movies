import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import './App.css';
import { Cast } from './components/Cast';
import { HomePage } from './components/HomePage';
import { MovieDetailsPage } from './components/MovieDetailsPage';
import { MoviesPage } from './components/MoviesPage';
import { Reviews } from './components/Reviews';
import {
  endpointPopularFilms,
  endpointSearchFilms,
  endpointFilmInfo,
  tailFilmInfo,
} from './components/API';

export class App extends Component {
  state = {
    loading: false,
    home: true,
    /*home: false,*/
    query: '',
    /*query: 'Tomorrow',*/
    films: [],
    filmId: null,
    /*ilmId: 588288,*/
    cast: false,
    review: false,
  };

  async handleRequest() {
    this.setState({ loading: true });
    console.log(this.state);
    try {
      if (this.state.home === true) {
        const response = await fetch(endpointPopularFilms);
        const data = await response.json();
        /*console.log(data.results);*/
        const films = data.results.map(result => ({
          id: result.id,
          title: result.media_type === 'movie' ? result.title : result.name,
        }));
        this.setState({ films: films });
      } else if (this.state.query !== '') {
        const response = await fetch(
          endpointSearchFilms + `&query=${this.state.query}`,
        );
        const data = await response.json();
        console.log(data.results);
      } else if (this.state.filmId !== null) {
        const response = await fetch(
          endpointFilmInfo + `${this.state.filmId}` + tailFilmInfo,
        );
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
    console.log(this.state);
  }

  async componentDidMount() {
    this.handleRequest();
  }

  render() {
    return (
      /*<div className="App">*/
      <Router>
        <header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </header>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <HomePage {...props} films={this.state.films} />}
          />
          <Route path="/movies" exact component={MoviesPage} />
          <Route path="/movies/:movieId" exact component={MovieDetailsPage} />
          <Route path="/movies/:movieId/cast" exact component={Cast} />
          <Route path="/movies/:movieId/reviews" exact component={Reviews} />
          <Redirect to="/" />
        </Switch>
      </Router>
      /*</div>*/
    );
  }
}

export default App;
