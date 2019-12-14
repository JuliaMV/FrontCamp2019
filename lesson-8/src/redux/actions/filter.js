export const GET_FILTER = 'GET_FILTER';
export const SET_FILTER = 'SET_FILTER';

export const getFilter = () => ({
  type: GET_FILTER,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
