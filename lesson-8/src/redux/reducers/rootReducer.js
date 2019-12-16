import { combineReducers } from 'redux';
import films from './films';
import filter from './filter';
import sort from './sort';
import film from './film';

export default combineReducers({
  films,
  filter,
  sort,
  film
});
