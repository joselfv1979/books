import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { initialUser } from '../data/ConstantUtils';
import { AuthUser, Role, User, UserState } from '../types/User';

const initialUserState: UserState = {
    users: [],
    user: initialUser,
    loading: false,
};

// Reducer functions of user state
export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        loginUserSuccess: (state, action: PayloadAction<AuthUser>) => {
            state.authUser = action.payload;
            state.loading = false;
        },
        loginUserFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        logoutUser: (state) => {
            state.authUser = undefined;
            state.user = initialUser;
            state.users = [];
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
        setUsersPending: (state) => {
            state.loading = true;
            state.user = null;
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
        setUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
        setUsersFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        setUserSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
        setUserFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        createUserSuccess: (state, action: PayloadAction<User>) => {
            state.users = [...state.users, action.payload];
            state.successMessage = 'User created successfully';
            state.user = initialUser;
            state.loading = false;
            state.errorMessage = undefined;
        },
        createUserFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        eliminateUserPending: (state) => {
            state.loading = true;
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
        eliminateUserSuccess: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((item: User) => item.id !== action.payload);
            state.successMessage = 'User deleted successfully';
            state.loading = false;
            state.errorMessage = undefined;
        },
        eliminateUserFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        modifyUserPending: (state) => {
            state.loading = true;
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
        modifyUserSuccess: (state, action: PayloadAction<User>) => {
            state.users = state.users.map((item: User) => (item.id === action.payload.id ? action.payload : item));
            state.user = action.payload;
            state.authUser = {
                ...(state.authUser as AuthUser),
                username: action.payload.username,
                roles: action.payload.roles,
            };
            state.successMessage = 'User updated successfully';
            state.errorMessage = undefined;
            state.loading = false;
        },
        modifyUserFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        eliminateUserMessage: (state) => {
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
    },
});

export const getUsers = (state: RootState) => state.user.users;
export const getUser = (state: RootState, id: string) => state.user.users.find((user: User) => user.id === id);
export const isAdmin = (state: RootState) => state.user.authUser?.roles.find((role: Role) => role === 'ADMIN');
export const authUser = (state: RootState) => state.user.authUser;
export default userSlice.reducer;
