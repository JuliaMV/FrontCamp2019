import { GET_SORT, SET_SORT } from 'src/redux/actions/sort';

const initialState = {
  sort: 'release_date',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT:
      return {
        ...state,
        SORT: action.payload,
      };
    case GET_SORT:
      return state;
    default:
      return state;
  }
};
