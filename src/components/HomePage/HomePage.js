export const HomePage = ({ films }) => {
  return (
    <div>
      <h1>Trending Today</h1>
      <ul>
        {films.map(film => (
          <li key={film.id}>{film.title}</li>
        ))}
      </ul>
    </div>
  );
};
