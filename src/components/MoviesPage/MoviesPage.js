import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { endpointSearchFilms } from '../API';

export default class MoviesPage extends Component {
  state = {
    query: '',
    films: [],
  };

  _isMounted = false;

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ query: event.target[0].value });
  };

  /*async*/ componentDidMount() {
    this._isMounted = true;
    this.setState({
      films: JSON.parse(sessionStorage.getItem('films')) || [],
      /*query: JSON.parse(sessionStorage.getItem('query')) || '',*/
    });
    /*if (this.state.query !== '') {
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
    if (this.state.query !== '') {
      try {
        const response = await fetch(
          endpointSearchFilms + `&query=${this.state.query}`,
        );
        const data = await response.json();
        if (this._isMounted) {
          /* попереджає витік пам'яті */
          const films = data.results.map(result => ({
            id: result.id,
            title: result.title,
          }));
          this.setState({ films: films });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  componentWillUnmount() {
    sessionStorage.setItem('films', JSON.stringify(this.state.films));
    /*sessionStorage.setItem('query', JSON.stringify(this.state.query));*/
    this._isMounted = false;
  }
}
