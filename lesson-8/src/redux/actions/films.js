export const GET_FILMS = 'GET_FILMS';

export const getFilms = (data) => ({
  type: GET_FILMS,
  payload: data,
});
