/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';

import DataReducer from './DataReducer';

const appReducer = combineReducers({
  data: DataReducer,
});

const RootReducer = (state: any, action: any) => {
  if (action.type === 'DESTROY_SESSION') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default RootReducer;
