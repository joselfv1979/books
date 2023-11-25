import { Dispatch } from 'redux';
import { ActionType, UserAction } from '../actionTypes/user';
import { getAllUsers, createUser, removeUser, updateUser, getUser, loginUser } from '../../services/users';
import { IUser } from '../../types/User';
import { validateUser } from '../../utils/validateUser';
import { Auth } from '../../types/Auth';

export const getUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.GET_USERS_PENDING,
        });

        const res = await getAllUsers();

        setTimeout(() => {
            res.success
                ? dispatch({
                      type: ActionType.GET_USERS_SUCCESS,
                      payload: res.value,
                  })
                : dispatch({
                      type: ActionType.GET_USERS_FAIL,
                      payload: res,
                  });
        }, 1000);
    };
};

export const fetchUser = (id: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.GET_USER_PENDING,
        });

        const res = await getUser(id);

        setTimeout(() => {
            res.success
                ? dispatch({
                      type: ActionType.GET_USER_SUCCESS,
                      payload: res,
                  })
                : dispatch({
                      type: ActionType.GET_USER_FAIL,
                      payload: res,
                  });
        }, 1000);
    };
};

export const addUser = (user: FormData) => {
    return async (dispatch: Dispatch<UserAction>) => {
        const validUser = validateUser(user);

        if (!validUser.success) {
            dispatch({
                type: ActionType.ADD_USER_FAIL,
                payload: validUser,
            });
            return;
        }

        const res = await createUser(user);

        res.success
            ? dispatch({
                  type: ActionType.ADD_USER_SUCCESS,
                  payload: res,
              })
            : dispatch({
                  type: ActionType.ADD_USER_FAIL,
                  payload: res,
              });
    };
};

export const deleteUser = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        const res = await removeUser(user);
        console.log({ res });

        res.success
            ? dispatch({
                  type: ActionType.REMOVE_USER_SUCCESS,
                  payload: res,
              })
            : dispatch({
                  type: ActionType.REMOVE_USER_FAIL,
                  payload: res,
              });
    };
};

export const editUser = (user: FormData) => {
    return async (dispatch: Dispatch<UserAction>) => {
        const editingProfile = true;
        const validUser = validateUser(user, editingProfile);

        if (!validUser.success) {
            dispatch({
                type: ActionType.UPDATE_USER_FAIL,
                payload: validUser,
            });
            return;
        }

        const res = await updateUser(user);

        res.success
            ? dispatch({
                  type: ActionType.UPDATE_USER_SUCCESS,
                  payload: res,
              })
            : dispatch({
                  type: ActionType.UPDATE_USER_FAIL,
                  payload: res,
              });
    };
};

export const removeUserError = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.REMOVE_USER_ERROR,
        });
    };
};

export const removeUserMessage = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.REMOVE_USER_MESSAGE,
        });
    };
};

export const resetUsers = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.RESET_USERS,
        });
    };
};

export const login = (userData: Auth) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.LOGIN_PENDING,
        });

        const res = await loginUser(userData);

        setTimeout(() => {
            res.success
                ? dispatch({
                      type: ActionType.LOGIN_SUCCESS,
                      payload: res,
                  })
                : dispatch({
                      type: ActionType.LOGIN_FAIL,
                      payload: res,
                  });
        }, 1000);
    };
};

export const logout = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.LOGOUT,
        });
    };
};
