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

const API_KEY = '467d5570ee3cf60e90370c1786a53e75';
const endpointPopularFilms = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

export class App extends Component {
  state = {
    loading: false,
  };

  async handleRequest(endpoint) {
    this.setState({ loading: true });
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data.results);
      /*const cards = data.hits.map(hit => ({
        id: hit.id,
        image: hit.webformatURL,
        bigImage: hit.largeImageURL,
      }));
      this.setState({ cards: [...this.state.cards, ...cards] });*/
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    this.handleRequest(endpointPopularFilms);
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
          <Route path="/" exact component={HomePage} />
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
