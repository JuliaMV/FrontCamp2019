import { API_URL } from 'src/config';

export const START_LOADING_FILM = 'START_LOADING_FILM';
export const END_LOADING_FILM = 'END_LOADING_FILM';
export const UPDATE_FILM_DESCRIPTION = 'UPDATE_FILM_DESCRIPTION';

export const UPDATE_SUGGESTED_FILMS = 'UPDATE_SUGGESTED_FILMS';

export const startLoading = () => ({
  type: START_LOADING_FILM,
});

export const endLoading = () => ({
  type: END_LOADING_FILM,
});

export const updateFilmDescription = (data) => ({
  type: UPDATE_FILM_DESCRIPTION,
  payload: data,
});

export const updateSuggestedFilms = (data) => ({
  type: UPDATE_SUGGESTED_FILMS,
  payload: data,
});

export const loadSuggestedFilms = (({ genres, sort }) => (dispatch) => fetch(`${API_URL}/movies?search=${genres.join('&')}&searchBy=genres&sortBy=${sort.split(' ').join('_')}&sortOrder=desc&limit=9`)
  .then((response) => response.json())
  .then((data) => {
    dispatch(updateSuggestedFilms(data.data));
    dispatch(endLoading());
  })
  .catch((error) => console.log(error))
);

export const loadFilmDescription = (({ id, filter, sort }) => (dispatch) => {
  dispatch(startLoading());
  return fetch(`${API_URL}/movies/${id}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch(updateFilmDescription(data));
      dispatch(loadSuggestedFilms({ genres: data.genres, filter, sort }));
    })
    .catch((error) => console.log(error));
});
