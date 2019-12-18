export const SET_FILMS = 'SET_FILMS';
export const SET_AMOUNT = 'SET_AMOUNT';

export const CLEAR_FILMS = 'CLEAR_FILMS';
export const CLEAR_AMOUNT = 'CLEAR_AMOUNT';

export const setFilms = (data) => ({
  type: SET_FILMS,
  payload: data,
});

export const setAmount = (data) => ({
  type: SET_AMOUNT,
  payload: data,
});

export const clearFilms = () => ({
  type: CLEAR_FILMS,
});

export const clearAmount = () => ({
  type: CLEAR_AMOUNT,
});
