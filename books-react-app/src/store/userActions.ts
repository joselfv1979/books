import { AppThunk } from '.';
import { createUser, getAllUsers, getUser, loginUser, removeUser, updateUser } from '../services/users';
import { AuthRequest, User } from '../types/User';
import { validateUser } from '../utils/validateUser';
import { userSlice } from './userSlice';

const { actions } = userSlice;

// Action to sign in one user
export const login = (user: AuthRequest): AppThunk =>
    async (dispatch) => {
        dispatch(actions.setUsersPending());

        const response = await loginUser(user);
        if (response.success) {
            dispatch(actions.loginUserSuccess(response.value));
            localStorage.setItem('token', JSON.stringify(response.value.token));
        } else {
            dispatch(actions.loginUserFail(response.message));
        }
    };

// Action to logout a user
export const logout = (): AppThunk => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch(actions.logoutUser());
};

// Action to fetch all users
export const fetchUsers = (): AppThunk => async (dispatch) => {
    dispatch(actions.setUsersPending());

    const response = await getAllUsers();
    response.success
        ? dispatch(actions.setUsersSuccess(response.value))
        : dispatch(actions.setUsersFail(response.message));
};

// Action to fetch one user by id
export const fetchUser = (id: string): AppThunk =>
    async (dispatch) => {
        dispatch(actions.setUsersPending());

        const response = await getUser(id);
        response.success
            ? dispatch(actions.setUserSuccess(response.value))
            : dispatch(actions.setUserFail(response.message));
    };

// Action to create a new user, previous validation
export const addUser = (user: User): AppThunk =>
    async (dispatch) => {
        dispatch(actions.setUsersPending());

        const validUser = validateUser(user);
        if (!validUser.success) {
            dispatch(actions.createUserFail(validUser.message));
            return;
        }

        const response = await createUser(user);
        response.success
            ? dispatch(actions.createUserSuccess(response.value))
            : dispatch(actions.createUserFail(response.message));
    };

// Action to delete one user by id
export const deleteUser = (id: string): AppThunk =>
    async (dispatch) => {
        dispatch(actions.setUsersPending());

        const response = await removeUser(id);
        response.success
            ? dispatch(actions.eliminateUserSuccess(id))
            : dispatch(actions.eliminateUserFail(response.message));
    };

// Action to update one user by id, previous validation
export const editUser = (user: User): AppThunk =>
    async (dispatch) => {
        dispatch(actions.setUsersPending());

        const validUser = validateUser(user);
        if (!validUser.success) {
            dispatch(actions.modifyUserFail(validUser.message));
            return;
        }

        const response = await updateUser(user);
        response.success
            ? dispatch(actions.modifyUserSuccess(response.value))
            : dispatch(actions.modifyUserFail(response.message));
    };

// Action to remove any message from UserState
export const removeUserMessage = (): AppThunk => (dispatch) => {
    dispatch(actions.eliminateUserMessage());
};

export const removeDelayUserMessage = (): AppThunk => (dispatch) => {
    setTimeout(() => dispatch(actions.eliminateUserMessage()), 3000);
};
