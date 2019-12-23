import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import { API_URL } from 'src/config';

import {
  UPDATE_SORT, UPDATE_FILTER, UPDATE_AMOUNT, UPDATE_LIMIT,
  START_LOADING, END_LOADING, UPDATE_FILMS,
  updateSort, updateFilter, updateAmount, updateLimit,
  startLoading, endLoading, updateFilms, loadFilms,
} from './mainPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions for MainPage', () => {
  it('should create an action to indicate start loading', () => {
    const expectedAction = {
      type: START_LOADING,
    };
    expect(startLoading()).toEqual(expectedAction);
  });

  it('should create an action to indicate end loading', () => {
    const expectedAction = {
      type: END_LOADING,
    };
    expect(endLoading()).toEqual(expectedAction);
  });

  it('should create an action to update sort', () => {
    const data = 'raiting';
    const expectedAction = {
      type: UPDATE_SORT,
      payload: data,
    };
    expect(updateSort(data)).toEqual(expectedAction);
  });

  it('should create an action to update filter', () => {
    const data = 'genre';
    const expectedAction = {
      type: UPDATE_FILTER,
      payload: data,
    };
    expect(updateFilter(data)).toEqual(expectedAction);
  });

  it('should create an action to update amount', () => {
    const data = 300;
    const expectedAction = {
      type: UPDATE_AMOUNT,
      payload: data,
    };
    expect(updateAmount(data)).toEqual(expectedAction);
  });

  it('should create an action to update limit', () => {
    const data = 5;
    const expectedAction = {
      type: UPDATE_LIMIT,
      payload: data,
    };
    expect(updateLimit(data)).toEqual(expectedAction);
  });

  it('should create an action to update films', () => {
    const data = [
      {
        title: 'Some title',
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        title: '2 Some title',
        description: '2 Lorem ipsum dolor sit amet',
      },
      {
        title: '3 Some title',
        description: '3 Lorem ipsum dolor sit amet',
      },
      {
        title: '4 Some title',
        description: '4 Lorem ipsum dolor sit amet',
      },
    ];
    const expectedAction = {
      type: UPDATE_FILMS,
      payload: data,
    };
    expect(updateFilms(data)).toEqual(expectedAction);
  });
});

describe('async actions for MainPage', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates all necessari actions when fetching films has been done', () => {
    const searchQuery = 'search=santa&searchBy=title&sortBy=release_date&sortOrder=desc&limit=6';
    fetchMock.getOnce(`${API_URL}/movies?${searchQuery}`, {
      body: {
        data: [{ title: 'Santa', description: 'Happy New Year!', genres: ['comedy'] }],
        total: 1,
      },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: START_LOADING },
      { type: UPDATE_AMOUNT, payload: 1 },
      { type: UPDATE_FILMS, payload: [{ title: 'Santa', description: 'Happy New Year!', genres: ['comedy'] }] },
      { type: END_LOADING },
    ];
    const store = mockStore({ mainPage: {} });
    return store.dispatch(loadFilms(searchQuery))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
