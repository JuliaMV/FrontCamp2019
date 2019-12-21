import { fetchFilms } from 'src/config';

export const UPDATE_SORT = 'UPDATE_SORT';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_AMOUNT = 'UPDATE_AMOUNT';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const UPDATE_FILMS = 'UPDATE_FILMS';
export const LOAD_FILMS = 'LOAD_FILMS';
export const UPDATE_LIMIT = 'UPDATE_LIMIT';

export const updateSort = (sort) => ({
  type: UPDATE_SORT,
  payload: sort,
});

export const updateLimit = (limit) => ({
  type: UPDATE_LIMIT,
  payload: limit,
});

export const updateFilter = (filter) => ({
  type: UPDATE_FILTER,
  payload: filter,
});

export const updateAmount = (data) => ({
  type: UPDATE_AMOUNT,
  payload: data,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});

export const updateFilms = (data) => ({
  type: UPDATE_FILMS,
  payload: data,
});


export const loadFilms = ((searchQuery) => (dispatch) => {
  dispatch(startLoading());
  fetchFilms(searchQuery)
    .then((data) => {
      dispatch(updateAmount(data.total));
      dispatch(updateFilms(data.data));
      dispatch(endLoading());
    })
    .catch((error) => console.log(error));
});
