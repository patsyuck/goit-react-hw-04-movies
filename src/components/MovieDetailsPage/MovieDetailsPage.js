import { Component } from 'react';

export class MovieDetailsPage extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.history.goBack}>Go back</button>
        Movie Details Page
      </div>
    );
  }
}
