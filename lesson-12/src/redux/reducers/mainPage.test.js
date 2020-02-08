import {
  UPDATE_SORT,
  UPDATE_FILTER,
  UPDATE_AMOUNT,
  START_LOADING,
  END_LOADING,
  UPDATE_FILMS,
} from 'src/redux/actions/mainPage';

import reducer from './mainPage';

const initialState = {
  sort: 'release date',
  filter: 'title',
  filmsData: [],
  amount: 0,
  limit: 6,
  isLoading: false,
};


describe('mainPage reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_SORT', () => {
    expect(
      reducer(initialState, {
        type: UPDATE_SORT,
        payload: 'raiting',
      }),
    ).toEqual({
      sort: 'raiting',
      filter: 'title',
      filmsData: [],
      amount: 0,
      limit: 6,
      isLoading: false,
    });

    expect(
      reducer({
        sort: 'raiting',
        filter: 'title',
        filmsData: [],
        amount: 0,
        limit: 6,
        isLoading: false,
      }, {
        type: UPDATE_SORT,
        payload: 'release date',
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [],
      amount: 0,
      limit: 6,
      isLoading: false,
    });
  });

  it('should handle UPDATE_FILTER', () => {
    expect(
      reducer(initialState, {
        type: UPDATE_FILTER,
        payload: 'genres',
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'genres',
      filmsData: [],
      amount: 0,
      limit: 6,
      isLoading: false,
    });

    expect(
      reducer({
        sort: 'release date',
        filter: 'genres',
        filmsData: [],
        amount: 0,
        limit: 6,
        isLoading: false,
      }, {
        type: UPDATE_FILTER,
        payload: 'title',
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [],
      amount: 0,
      limit: 6,
      isLoading: false,
    });
  });

  it('should handle UPDATE_AMOUNT', () => {
    expect(
      reducer(initialState, {
        type: UPDATE_AMOUNT,
        payload: 10,
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [],
      amount: 10,
      limit: 6,
      isLoading: false,
    });

    expect(
      reducer({
        sort: 'release date',
        filter: 'title',
        filmsData: [],
        amount: 10,
        limit: 6,
        isLoading: false,
      }, {
        type: UPDATE_AMOUNT,
        payload: 3000,
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [],
      amount: 3000,
      limit: 6,
      isLoading: false,
    });
  });

  it('should handle START_LOADING', () => {
    expect(
      reducer({
        sort: 'release date',
        filter: 'title',
        filmsData: [],
        amount: 0,
        limit: 6,
        isLoading: false,
      }, {
        type: START_LOADING,
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [],
      amount: 0,
      limit: 6,
      isLoading: true,
    });

    expect(
      reducer({
        sort: 'release date',
        filter: 'title',
        filmsData: [],
        amount: 0,
        limit: 6,
        isLoading: true,
      }, {
        type: START_LOADING,
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [],
      amount: 0,
      limit: 6,
      isLoading: true,
    });
  });

  it('should handle END_LOADING', () => {
    expect(
      reducer({
        sort: 'release date',
        filter: 'title',
        filmsData: [],
        amount: 0,
        limit: 6,
        isLoading: true,
      }, {
        type: END_LOADING,
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [],
      amount: 0,
      limit: 6,
      isLoading: false,
    });

    expect(
      reducer({
        sort: 'release date',
        filter: 'title',
        filmsData: [],
        amount: 0,
        limit: 6,
        isLoading: false,
      }, {
        type: END_LOADING,
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [],
      amount: 0,
      limit: 6,
      isLoading: false,
    });
  });

  it('should handle UPDATE_FILMS', () => {
    expect(
      reducer({
        sort: 'release date',
        filter: 'title',
        filmsData: [],
        amount: 0,
        limit: 6,
        isLoading: true,
      }, {
        type: UPDATE_FILMS,
        payload: [{ title: 'Film 1' }, { title: 'Film 2' }],
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [{ title: 'Film 1' }, { title: 'Film 2' }],
      amount: 0,
      limit: 6,
      isLoading: true,
    });

    expect(
      reducer({
        sort: 'release date',
        filter: 'title',
        filmsData: [{ title: 'Film 1' }, { title: 'Film 2' }],
        amount: 0,
        limit: 6,
        isLoading: true,
      }, {
        type: UPDATE_FILMS,
        payload: [{ title: 'Film 3' }],
      }),
    ).toEqual({
      sort: 'release date',
      filter: 'title',
      filmsData: [{ title: 'Film 3' }],
      amount: 0,
      limit: 6,
      isLoading: true,
    });
  });
});
