import { combineReducers } from 'redux';
import bookReducer from './book';
import userReducer from './user';

const reducers = combineReducers({
    books: bookReducer,
    users: userReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
