import { START_LOADING_FILM, startLoading } from './filmPage';

describe('actions for FilmPage', () => {
  it('should create an action to indicate start loading', () => {
    const expectedAction = {
      type: START_LOADING_FILM,
    };
    expect(startLoading()).toEqual(expectedAction);
  });
});
