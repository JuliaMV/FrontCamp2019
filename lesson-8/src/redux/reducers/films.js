import { GET_FILMS } from 'redux/actions/films';

const initialState = {
  films: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILMS:
      return {
        ...state,
        films: action.payload.data,
      };
    default:
      return state;
  }
};
