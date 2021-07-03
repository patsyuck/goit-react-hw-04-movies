import { Component } from 'react';
import { endpointFilmInfo, tailFilmInfo } from '../API';

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
        image: 'https://image.tmdb.org/t/p/w500/' + data.poster_path,
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
        <button onClick={this.props.history.goBack}>Go back</button>
        <div>
          <img src={image} alt=""></img>
          <div>
            <h1>
              {title} ({year})
            </h1>
            <p>User score: {score} %</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <ul>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
