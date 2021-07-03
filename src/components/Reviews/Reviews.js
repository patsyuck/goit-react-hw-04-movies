import { Component } from 'react';
import { endpointFilmInfo, tailFilmReviews } from '../API';

export class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    try {
      const response = await fetch(
        endpointFilmInfo +
          `${this.props.match.params.movieId}` +
          tailFilmReviews,
      );
      const data = await response.json();
      const reviews = data.results.map(review => ({
        author: review.author,
        content: review.content,
      }));
      this.setState({ reviews: reviews });
      console.log(this.state);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.reviews.map(review => (
            <li>
              <p>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
