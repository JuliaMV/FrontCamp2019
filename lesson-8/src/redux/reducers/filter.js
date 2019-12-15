import { GET_FILTER, SET_FILTER } from 'src/redux/actions/filter';

const initialState = {
  filter: 'title',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case GET_FILTER:
      return state;
    default:
      return state;
  }
};
