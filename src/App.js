import './App.css';
import { Cast } from './components/Cast';
import { HomePage } from './components/HomePage';
import { MovieDetailsPage } from './components/MovieDetailsPage';
import { MoviesPage } from './components/MoviesPage';
import { Reviews } from './components/Reviews';

function App() {
  return (
    <div className="App">
      <HomePage />
      <MoviesPage />
      <MovieDetailsPage />
      <Cast />
      <Reviews />
    </div>
  );
}

export default App;
