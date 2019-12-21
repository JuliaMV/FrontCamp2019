
const API_URL = 'https://reactjs-cdp.herokuapp.com';
const filmPageLimit = 9;

export function fetchFilmById(id) {
  return fetch(`${API_URL}/movies/${id}`)
    .then((response) => response.json());
}

export function fetchFilms(searchQuery) {
  return fetch(`${API_URL}/movies?${searchQuery}`)
    .then((response) => response.json());
}

export function fetchFilmsByGenre({ genres, sort }) {
  return fetch(`${API_URL}/movies?search=${genres.join('&')}&searchBy=genre&sortBy=${sort.split(' ').join('_')}&sortOrder=desc&limit=${filmPageLimit}`)
    .then((response) => response.json());
}
