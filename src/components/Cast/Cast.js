import { Component } from 'react';
import { endpointFilmInfo, tailFilmActors } from '../API';
import './Cast.css';

export class Cast extends Component {
  state = {
    actors: [],
  };

  async componentDidMount() {
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
        <ol className="filmActors">
          {this.state.actors.map(actor => (
            <li key={actor.id} id={actor.cast_id}>
              <img
                src={actor.image}
                alt="Sorry, we don't have any photo of this actor"
              ></img>
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
