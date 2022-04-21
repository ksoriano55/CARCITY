import { createStore, combineReducers } from 'redux';
import reducers from '../reducers';
import { persistReducer } from 'redux-persist';
import localForage from 'localforage';

const persistConfig = {
  key: 'root',
  storage: localForage,
}

const combinedReducers = combineReducers({...reducers});

const persistedReducer = persistReducer(persistConfig,combinedReducers)

const store = createStore(persistedReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
