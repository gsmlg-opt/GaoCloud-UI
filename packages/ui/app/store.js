import { fromJS } from 'immutable';
import history from './utils/history.js';
import persistentSubState from './persistentSubState.js';

import configureStore from './configureStore.js';

// Create redux store with history
const initialState = {};

const store = configureStore(initialState, history);

export default store;
