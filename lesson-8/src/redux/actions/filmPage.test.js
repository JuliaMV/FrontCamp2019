import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import { API_URL } from 'src/config';

import {
  START_LOADING_FILM, END_LOADING_FILM,
  UPDATE_FILM_DESCRIPTION, UPDATE_SUGGESTED_FILMS,
  startLoading, endLoading,
  updateFilmDescription, updateSuggestedFilms,
  loadFilmDescription, loadSuggestedFilms,
} from './filmPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions for FilmPage', () => {
  it('should create an action to indicate start loading', () => {
    const expectedAction = {
      type: START_LOADING_FILM,
    };
    expect(startLoading()).toEqual(expectedAction);
  });

  it('should create an action to indicate end loading', () => {
    const expectedAction = {
      type: END_LOADING_FILM,
    };
    expect(endLoading()).toEqual(expectedAction);
  });

  it('should create an action to update film description', () => {
    const data = {
      title: 'Some title',
      description: 'Lorem ipsum dolor sit amet',
    };
    const expectedAction = {
      type: UPDATE_FILM_DESCRIPTION,
      payload: data,
    };
    expect(updateFilmDescription(data)).toEqual(expectedAction);
  });

  it('should create an action to update suggested films', () => {
    const data = [
      {
        title: '1 Some title',
        description: '1 Lorem ipsum dolor sit amet',
      },
      {
        title: '2 Some title',
        description: '2 Lorem ipsum dolor sit amet',
      },
    ];
    const expectedAction = {
      type: UPDATE_SUGGESTED_FILMS,
      payload: data,
    };
    expect(updateSuggestedFilms(data)).toEqual(expectedAction);
  });
});

describe('async actions for FilmPage', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates all necessari actions when fetching suggested films has been done', () => {
    fetchMock.getOnce(`${API_URL}/movies?search=comedy&searchBy=genres&sortBy=raiting&sortOrder=desc&limit=9`, {
      body: { data: [{ title: 'title', genres: ['comedy'] }] },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: UPDATE_SUGGESTED_FILMS, payload: [{ title: 'title', genres: ['comedy'] }] },
      { type: END_LOADING_FILM },
    ];
    const store = mockStore({ filmPage: {} });
    return store.dispatch(loadSuggestedFilms({ genres: ['comedy'], sort: 'raiting' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  
  it('creates all necessari actions when fetching film description has been done', () => {
    fetchMock.getOnce(`${API_URL}/movies/123`, {
      body: { title: 'title', genres: ['comedy'] },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: START_LOADING_FILM },
      { type: UPDATE_FILM_DESCRIPTION, payload: { title: 'title', genres: ['comedy'] } },
    ];
    const store = mockStore({ filmPage: {} });
    return store.dispatch(loadFilmDescription({ id: 123, filter: 'title', sort: 'raiting' }))
      .then(() => {
        console.log(store.getActions());
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
