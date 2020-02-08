import {
  UPDATE_FILM_DESCRIPTION,
  UPDATE_SUGGESTED_FILMS,
  START_LOADING_FILM,
  END_LOADING_FILM,
} from 'src/redux/actions/filmPage';

const initialState = {
  filmDescription: {},
  suggestedFilms: [],
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILM_DESCRIPTION:
      return {
        ...state,
        filmDescription: action.payload,
      };
    case UPDATE_SUGGESTED_FILMS:
      return {
        ...state,
        suggestedFilms: action.payload,
      };
    case START_LOADING_FILM:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING_FILM:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
