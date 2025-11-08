import { AppThunk, persistor } from '.';
import { createUser, getAllUsers, getUser, loginUser, removeUser, updateUser } from '../services/users';
import { AuthRequest, User } from '../types/User';
import { showNotification } from './notificationSlice';
import { setLoading } from './uiSlice';
import { userSlice } from './userSlice';

const { actions } = userSlice;

// Action to sign in one user
export const login = (user: AuthRequest): AppThunk =>
    async (dispatch) => {

        dispatch(setLoading(true));

        const response = await loginUser(user);

        if (response.success) {
            dispatch(actions.loginUser(response.value));
            localStorage.setItem('token', JSON.stringify(response.value.token));
            //dispatch(showNotification({ type: 'success', message: 'User logged in successfully' }));
            // Clear persisted storage so data isn’t rehydrated
            await persistor.purge();
        } else {
            dispatch(showNotification({ type: 'error', message: `Failed to log in user: ${response.message}` }));
        }

        dispatch(setLoading(false));
    };

// Action to logout a user
export const logout = (): AppThunk => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch(actions.logoutUser());

    // Clear persisted storage so data isn’t rehydrated
    await persistor.purge();
};

// Action to fetch all users
export const fetchUsers = (): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await getAllUsers();

    if (response.success) {
        dispatch(actions.setAllUsers(response.value));
        // dispatch(showNotification({ type: 'success', message: 'Users fetched successfully' }));
    } else {
        // dispatch(actions.setUsersFail(response.message));
        dispatch(showNotification({ type: 'error', message: `Failed to fetch users: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to fetch one user by id
export const fetchUser = (id: string): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await getUser(id);

    if (response.success) {
        dispatch(actions.setSingleUser(response.value));
        // dispatch(showNotification({ type: 'success', message: 'User fetched successfully' }));
    } else {
        // dispatch(actions.setUserFail(response.message));
        dispatch(showNotification({ type: 'error', message: `Failed to fetch user: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to create a new user, previous validation
export const addUser = (user: User): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await createUser(user);

    if (response.success) {
        dispatch(actions.createUser(response.value));
        dispatch(showNotification({ type: 'success', message: 'User created successfully' }));
    } else {
        // dispatch(actions.createUserFail(response.message));
        dispatch(showNotification({ type: 'error', message: `Failed to create user: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to delete one user by id
export const deleteUser = (id: string): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await removeUser(id);

    if (response.success) {
        dispatch(actions.eliminateUser(id));
        dispatch(showNotification({ type: 'success', message: 'User deleted successfully' }));
    } else {
        // dispatch(actions.eliminateUserFail(response.message));
        dispatch(showNotification({ type: 'error', message: `Failed to delete user: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to update one user by id, previous validation
export const editUser = (user: User): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await updateUser(user);

    if (response.success) {
        dispatch(actions.modifyUser(response.value));
        dispatch(showNotification({ type: 'success', message: 'User updated successfully' }));
    } else {
        // dispatch(actions.modifyUserFail(response.message));
        dispatch(showNotification({ type: 'error', message: `Failed to update user: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to clear current selected user
export const clearCurrentUser = (): AppThunk => (dispatch) => {
    dispatch(actions.clearCurrentUser());
};

