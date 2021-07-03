import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
/*import queryString from 'query-string';*/
import './App.css';
/*import { Cast } from './components/Cast';*/
import { HomePage } from './components/HomePage';
import { MovieDetailsPage } from './components/MovieDetailsPage';
import { MoviesPage } from './components/MoviesPage';
/*import { Reviews } from './components/Reviews';*/

/*const getLocation = (props) => {
  console.log(queryString.parse(props.location.search))
};*/

export class App extends Component {
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
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
      /*</div>*/
    );
  }
}

export default App;
