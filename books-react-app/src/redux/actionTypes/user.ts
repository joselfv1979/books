import { Failure, Success } from '../../types/Result';
import { IUser } from '../../types/User';

export enum ActionType {
    GET_USERS_PENDING = 'GET_USERS_PENDING',
    GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
    GET_USERS_FAIL = 'GET_USERS_FAIL',
    GET_USER_PENDING = 'GET_USER_PENDING',
    GET_USER_SUCCESS = 'GET_USER_SUCCESS',
    GET_USER_FAIL = 'GET_USER_FAIL',
    ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
    ADD_USER_FAIL = 'ADD_USER_FAIL',
    REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS',
    REMOVE_USER_FAIL = 'REMOVE_USER_FAIL',
    UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL = 'UPDATE_USER_FAIL',
    REMOVE_USER_ERROR = 'REMOVE_USER_ERROR',
    REMOVE_USER_MESSAGE = 'REMOVE_USER_MESSAGE',
    RESET_USERS = 'RESET_USERS',
    LOGIN_PENDING = 'LOGIN_USER_PENDING',
    LOGIN_SUCCESS = 'LOGIN_USER_SUCCESS',
    LOGIN_FAIL = 'LOGIN_USER_FAIL',
    LOGOUT = 'LOGOUT',
}

interface userActionPending {
    type: ActionType.GET_USERS_PENDING | ActionType.GET_USER_PENDING | ActionType.LOGIN_PENDING;
}

interface usersActionSuccess {
    type: ActionType.GET_USERS_SUCCESS;
    payload: IUser[];
}

interface userActionSuccess {
    type:
        | ActionType.ADD_USER_SUCCESS
        | ActionType.REMOVE_USER_SUCCESS
        | ActionType.UPDATE_USER_SUCCESS
        | ActionType.GET_USER_SUCCESS
        | ActionType.LOGIN_SUCCESS;
    payload: Success<IUser>;
}

interface userActionFail {
    type:
        | ActionType.GET_USERS_FAIL
        | ActionType.GET_USER_FAIL
        | ActionType.ADD_USER_FAIL
        | ActionType.REMOVE_USER_FAIL
        | ActionType.UPDATE_USER_FAIL
        | ActionType.LOGIN_FAIL;
    payload: Failure;
}

interface userActionMessageCancel {
    type: ActionType.REMOVE_USER_ERROR | ActionType.REMOVE_USER_MESSAGE;
}

interface userActionReset {
    type: ActionType.RESET_USERS;
}

interface logoutAction {
    type: ActionType.LOGOUT;
}

export type UserAction =
    | userActionPending
    | usersActionSuccess
    | userActionSuccess
    | userActionFail
    | userActionMessageCancel
    | userActionReset
    | logoutAction;
