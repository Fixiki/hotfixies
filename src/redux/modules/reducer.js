import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import info from './info';
import widgets from './widgets';
import time from './time';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  info,
  widgets,
  time
});
