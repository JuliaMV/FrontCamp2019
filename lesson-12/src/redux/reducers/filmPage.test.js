import {
  UPDATE_FILM_DESCRIPTION,
  UPDATE_SUGGESTED_FILMS,
  START_LOADING_FILM,
  END_LOADING_FILM,
} from 'src/redux/actions/filmPage';

import reducer from './filmPage';

const initialState = {
  filmDescription: {},
  suggestedFilms: [],
  isLoading: true,
};

describe('filmPage reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_FILM_DESCRIPTION', () => {
    expect(
      reducer(initialState, {
        type: UPDATE_FILM_DESCRIPTION,
        payload: { title: 'Title' },
      }),
    ).toEqual({
      filmDescription: { title: 'Title' },
      suggestedFilms: [],
      isLoading: true,
    });

    expect(
      reducer({
        filmDescription: { title: 'Title' },
        suggestedFilms: [],
        isLoading: true,
      }, {
        type: UPDATE_FILM_DESCRIPTION,
        payload: { title: 'Other title' },
      }),
    ).toEqual({
      filmDescription: { title: 'Other title' },
      suggestedFilms: [],
      isLoading: true,
    });
  });

  it('should handle UPDATE_SUGGESTED_FILMS', () => {
    expect(
      reducer(initialState, {
        type: UPDATE_SUGGESTED_FILMS,
        payload: [{ title: 'Title' }],
      }),
    ).toEqual({
      filmDescription: {},
      suggestedFilms: [{ title: 'Title' }],
      isLoading: true,
    });

    expect(
      reducer({
        filmDescription: {},
        suggestedFilms: [{ title: 'Title' }],
        isLoading: true,
      }, {
        type: UPDATE_SUGGESTED_FILMS,
        payload: [{ title: 'Other title' }, { title: 'Diff title' }],
      }),
    ).toEqual({
      filmDescription: {},
      suggestedFilms: [{ title: 'Other title' }, { title: 'Diff title' }],
      isLoading: true,
    });
  });

  it('should handle START_LOADING_FILM', () => {
    expect(
      reducer({
        filmDescription: {},
        suggestedFilms: [{ title: 'Title' }],
        isLoading: false,
      }, {
        type: START_LOADING_FILM,
      }),
    ).toEqual({
      filmDescription: {},
      suggestedFilms: [{ title: 'Title' }],
      isLoading: true,
    });

    expect(
      reducer({
        filmDescription: {},
        suggestedFilms: [{ title: 'Title' }],
        isLoading: true,
      }, {
        type: START_LOADING_FILM,
      }),
    ).toEqual({
      filmDescription: {},
      suggestedFilms: [{ title: 'Title' }],
      isLoading: true,
    });
  });

  it('should handle END_LOADING_FILM', () => {
    expect(
      reducer({
        filmDescription: {},
        suggestedFilms: [{ title: 'Title' }],
        isLoading: true,
      }, {
        type: END_LOADING_FILM,
      }),
    ).toEqual({
      filmDescription: {},
      suggestedFilms: [{ title: 'Title' }],
      isLoading: false,
    });

    expect(
      reducer({
        filmDescription: {},
        suggestedFilms: [{ title: 'Title' }],
        isLoading: false,
      }, {
        type: END_LOADING_FILM,
      }),
    ).toEqual({
      filmDescription: {},
      suggestedFilms: [{ title: 'Title' }],
      isLoading: false,
    });
  });
});
