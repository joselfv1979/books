import { Action, combineReducers, configureStore, PreloadedState, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as bookActions from './bookActions';
import bookReducer from './bookSlice';
import * as loanActions from './loanActions';
import loanReducer from './loanSlice';
import notificationReducer from './notificationSlice';
import uiReducer from "./uiSlice";
import * as userActions from './userActions';
import userReducer, { userSlice } from './userSlice';

const { actions } = userSlice;

// Configuration for redux-persist

const persistConfig = {
    key: 'root',
    storage,
};

// Combines the slice reducers into the root reducer
const appReducer = combineReducers({
    book: bookReducer,
    loan: loanReducer,
    notification: notificationReducer,
    ui: uiReducer,
    user: userReducer,
});

export const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {

    if (action.type === actions.loginUser.type || action.type === actions.logoutUser.type) {
        // Reset the entire state to undefined
        state = undefined;
    }

    return appReducer(state, action);
};

// Saves the Redux store in persistent storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

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
    ...bookActions,
    ...loanActions,
}

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
// The AppThunk type will help us in writing type definitions for thunk actions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

