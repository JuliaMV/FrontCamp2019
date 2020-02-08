import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import filmPage from './filmPage';
import mainPage from './mainPage';

export default combineReducers({
  routing: routerReducer,
  mainPage,
  filmPage,
});
