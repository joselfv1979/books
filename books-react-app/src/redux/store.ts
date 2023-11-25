import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import reducers from './reducers/combine';

const persistedState = loadFromLocalStorage();

const store = createStore(reducers, persistedState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => saveToLocalStorage(store.getState()));

export { store };
