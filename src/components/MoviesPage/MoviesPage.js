import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { endpointSearchFilms } from '../API';

export class MoviesPage extends Component {
  state = {
    query: '',
    films: [],
  };

  async handleSubmit() {
    this.setState({ query: 'Tomorrow' });
    try {
      const response = await fetch(
        endpointSearchFilms + `&query=${this.state.query}`,
      );
      const data = await response.json();
      const films = data.results.map(result => ({
        id: result.id,
        title: result.title,
      }));
      this.setState({ films: films });
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    /*try {
      const response = await fetch(endpointSearchFilms + `&query=${query}`);
      const data = await response.json();
      const films = data.results.map(result => ({
        id: result.id,
        title: result.title,
      }));
      this.setState({ films: films });
    } catch (error) {
      console.error(error);
    }*/
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter key words for search" />
          <button type="submit">Search</button>
        </form>
        {this.state.films.length > 0 && (
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
        )}
      </div>
    );
  }

  async componentDidUpdate() {
    /*try {
      const response = await fetch(endpointSearchFilms + `&query=${this.state.query}`);
      const data = await response.json();
      const films = data.results.map(result => ({
        id: result.id,
        title: result.title,
      }));
      this.setState({ films: films });
    } catch (error) {
      console.error(error);
    }*/
  }
}
