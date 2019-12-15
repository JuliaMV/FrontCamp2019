import { combineReducers } from 'redux';
import films from './films';
import filter from './filter';
import sort from './sort';

export default combineReducers({
  films,
  filter,
  sort,
});
