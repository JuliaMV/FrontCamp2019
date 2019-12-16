import { SET_FILMS, SET_AMOUNT } from 'src/redux/actions/films';

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
    default:
      return state;
  }
};
