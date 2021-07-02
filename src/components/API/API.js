const API_KEY = '467d5570ee3cf60e90370c1786a53e75';
export const endpointPopularFilms = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
export const endpointSearchFilms = `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&api_key=${API_KEY}`;
export const endpointFilmInfo = 'https://api.themoviedb.org/3/movie/';
export const tailFilmInfo = `?language=en-US&api_key=${API_KEY}`;
export const tailFilmActors = `/credits?language=en-US&api_key=${API_KEY}`;
export const tailFilmReviews = `/reviews?language=en-US&page=1&api_key=${API_KEY}`;
