import { Action, combineReducers, configureStore, PreloadedState, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as bookActions from './bookActions';
import bookSlice from './bookSlice';
import * as userActions from './userActions';
import userSlice from './userSlice';

const persistConfig = {
    key: 'root',
    storage,
};

// Combines the slice reducers into the root reducer
const reducers = combineReducers({
    book: bookSlice,
    user: userSlice,
});

// Saves the Redux store in persistent storage
const persistedReducer = persistReducer(persistConfig, reducers);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: persistedReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });
};

export const store = setupStore();

export default {
    ...userActions,
    ...bookActions
}

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
// The AppThunk type will help us in writing type definitions for thunk actions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

