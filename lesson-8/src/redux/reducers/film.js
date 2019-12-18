import { SET_FILM, CLEAR_FILM } from 'src/redux/actions/film';

const initialState = {
  film: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILM:
      return {
        ...state,
        film: action.payload,
      };
    case CLEAR_FILM:
      return {
        ...state,
        film: null,
      };
    default:
      return state;
  }
};
