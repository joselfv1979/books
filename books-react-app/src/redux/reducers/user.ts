import { ActionType, UserAction } from '../actionTypes/user';
import { IUser, initialUser } from '../../types/User';

export interface UserState {
    users: IUser[];
    user: IUser | null;
    loggedUser: IUser | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    message?: string;
}

const initialState: UserState = {
    users: [],
    user: initialUser,
    loggedUser: null,
    status: 'idle',
    error: null,
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case ActionType.GET_USERS_PENDING:
            return {
                ...state,
                users: [],
                status: 'loading',
            };
        case ActionType.GET_USERS_SUCCESS:
            return {
                ...state,
                status: 'succeeded',
                users: action.payload,
            };
        case ActionType.GET_USERS_FAIL:
            return {
                ...state,
                users: [],
                status: 'failed',
                error: action.payload.message,
            };
        case ActionType.GET_USER_PENDING:
            return { ...state, user: null, status: 'loading' };
        case ActionType.GET_USER_FAIL:
            return { ...state, status: 'failed', error: action.payload.message };
        case ActionType.GET_USER_SUCCESS:
            return { ...state, status: 'succeeded', user: action.payload.value };
        case ActionType.ADD_USER_SUCCESS:
            return {
                ...state,
                users: [...state.users, action.payload.value],
                status: 'succeeded',
                message: action.payload.message,
            };
        case ActionType.ADD_USER_FAIL:
            return {
                ...state,
                error: action.payload.message,
            };
        case ActionType.REMOVE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter((item: IUser) => item.id !== action.payload.value.id),
                status: 'succeeded',
                message: action.payload.message,
            };
        case ActionType.REMOVE_USER_FAIL:
            return {
                ...state,
                users: state.users,
                status: 'failed',
                error: action.payload.message,
            };
        case ActionType.UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map((item: IUser) =>
                    item.id === action.payload.value.id ? action.payload.value : item,
                ),
                user: { ...action.payload.value, token: state.loggedUser?.token },
                loggedUser: { ...action.payload.value, token: state.loggedUser?.token },
                message: action.payload.message,
            };
        case ActionType.UPDATE_USER_FAIL:
            return {
                ...state,
                error: action.payload.message,
            };
        case ActionType.REMOVE_USER_MESSAGE:
            return { ...state, message: undefined };
        case ActionType.REMOVE_USER_ERROR:
            return { ...state, error: null };
        case ActionType.RESET_USERS:
            return { ...state, status: 'idle' };
        case ActionType.LOGIN_PENDING:
            return { ...state, status: 'loading' };
        case ActionType.LOGIN_FAIL:
            return { ...state, status: 'failed', error: action.payload.message };
        case ActionType.LOGIN_SUCCESS:
            return { ...state, status: 'succeeded', loggedUser: action.payload.value };
        case ActionType.LOGOUT:
            return { ...state, loggedUser: null, user: null, status: 'idle' };
        default:
            return state;
    }
};

export default userReducer;
