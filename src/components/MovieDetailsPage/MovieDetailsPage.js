import { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { endpointFilmInfo, tailFilmInfo } from '../API';
import { Cast } from '../Cast';
import { Reviews } from '../Reviews';
import './MovieDetailsPage.css';

export class MovieDetailsPage extends Component {
  state = {
    image: '',
    title: '',
    year: null,
    score: null,
    overview: '',
    genres: [],
  };

  async componentDidMount() {
    try {
      const response = await fetch(
        endpointFilmInfo + `${this.props.match.params.movieId}` + tailFilmInfo,
      );
      const data = await response.json();
      this.setState({
        image: 'https://image.tmdb.org/t/p/w300' + data.poster_path,
        title: data.title,
        year: Number.parseInt(data.release_date),
        score: data.vote_average * 10,
        overview: data.overview,
        /*genres: data.genres.map(genre => genre.name)*/
        genres: data.genres.map(genre => ({
          id: genre.id,
          name: genre.name,
        })),
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { image, title, year, score, overview, genres } = this.state;
    return (
      <div>
        <button onClick={this.props.history.goBack}>&larr; Go back</button>
        <div className="filmInfo">
          <img src={image} alt=""></img>
          <div>
            <h1>
              {title} ({year})
            </h1>
            <p>User score: {score}%</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <ul className="filmGenres">
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3>Additional information</h3>
          <ul>
            <li>
              <Link to={`${this.props.match.url}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`${this.props.match.url}/reviews`}>Reviews</Link>
            </li>
          </ul>
        </div>
        <Route path={`${this.props.match.path}/cast`} exact component={Cast} />
        <Route
          path={`${this.props.match.path}/reviews`}
          exact
          component={Reviews}
        />
      </div>
    );
  }
}
