import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { endpointSearchFilms } from '../API';

const query = 'Tomorrow';

export class MoviesPage extends Component {
  state = {
    films: [],
  };

  async componentDidMount() {
    try {
      const response = await fetch(endpointSearchFilms + `&query=${query}`);
      const data = await response.json();
      /*console.log(data.results);*/
      const films = data.results.map(result => ({
        id: result.id,
        title: result.title,
      }));
      this.setState({ films: films });
      /*console.log(this.state.films);*/
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Movies Page</h1>
        <ul>
          {this.state.films.map(film => (
            <li key={film.id}>
              <Link
                to={{
                  pathname: `${this.props.match.url}/${film.id}`,
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
