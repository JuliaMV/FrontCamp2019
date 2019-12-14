export const GET_SORT = 'GET_SORT';
export const SET_SORT = 'SET_SORT';

export const getSort = () => ({
  type: GET_SORT,
});

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort,
});
