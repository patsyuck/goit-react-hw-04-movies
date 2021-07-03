import { Component } from 'react';
import { endpointFilmInfo, tailFilmActors } from '../API';

const API_KEY = '467d5570ee3cf60e90370c1786a53e75';

export class Cast extends Component {
  state = {
    actors: [],
  };

  async componentDidMount() {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`,
      );
      const config = await resp.json();
      console.log(config);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetch(
        endpointFilmInfo +
          `${this.props.match.params.movieId}` +
          tailFilmActors,
      );
      const data = await response.json();
      const actors = data.cast.map(actor => ({
        id: actor.id,
        cast_id: actor.cast_id,
        image: 'https://image.tmdb.org/t/p/w185' + actor.profile_path,
        name: actor.name,
        character: actor.character,
      }));
      this.setState({ actors: actors });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.actors.map(actor => (
            <li key={actor.id} id={actor.cast_id}>
              <img src={actor.image} alt=""></img>
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
