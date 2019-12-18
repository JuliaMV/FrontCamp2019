import { SET_FILMS, SET_AMOUNT, CLEAR_FILMS, CLEAR_AMOUNT } from 'src/redux/actions/films';

const initialState = {
  films: [],
  amount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILMS:
      return {
        ...state,
        films: action.payload,
      };
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    case CLEAR_FILMS:
      return {
        ...state,
        films: [],
      };
    case CLEAR_AMOUNT:
      return {
        ...state,
        amount: 0,
      };
    default:
      return state;
  }
};
