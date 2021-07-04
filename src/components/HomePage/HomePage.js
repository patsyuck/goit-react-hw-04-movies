import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { endpointPopularFilms } from '../API';

export default class HomePage extends Component {
  state = {
    films: [],
  };

  async componentDidMount() {
    try {
      const response = await fetch(endpointPopularFilms);
      const data = await response.json();
      /*console.log(data.results);*/
      const films = data.results.map(result => ({
        id: result.id,
        title: result.media_type === 'movie' ? result.title : result.name,
      }));
      this.setState({ films: films });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Trending Today</h1>
        <ul>
          {this.state.films.map(film => (
            <li key={film.id}>
              <Link
                to={{
                  pathname: `${this.props.match.url}movies/${film.id}`,
                  state: { from: this.props.location },
                }}
              >
                {film.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
