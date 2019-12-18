export const SET_FILM = 'SET_FILMS';
export const CLEAR_FILM = 'CLEAR_FILMS';

export const setFilm = (data) => ({
  type: SET_FILM,
  payload: data,
});

export const clearFilm = () => ({
  type: CLEAR_FILM,
});
