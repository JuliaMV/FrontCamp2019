import {
  UPDATE_SORT,
  UPDATE_FILTER,
  UPDATE_AMOUNT,
  START_LOADING,
  END_LOADING,
  UPDATE_FILMS,
} from 'src/redux/actions/mainPage';


const initialState = {
  sort: 'release date',
  filter: 'title',
  filmsData: [],
  amount: 0,
  limit: 6,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case UPDATE_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_FILMS:
      return {
        ...state,
        filmsData: action.payload,
      };
    default:
      return state;
  }
};
