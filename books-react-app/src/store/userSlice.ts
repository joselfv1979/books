import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { initialUser } from '../data/ConstantUtils';
import { AuthUser, Role, User, UserState } from '../types/User';

const initialUserState: UserState = {
    users: [],
    user: null,
};

// Reducer functions of user state
export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        loginUser: (state, action: PayloadAction<AuthUser>) => {
            state.authUser = action.payload;
        },
        logoutUser: (state) => {
            state.authUser = undefined;
            state.user = initialUser;
            state.users = [];
        },
        setAllUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setSingleUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        createUser: (state, action: PayloadAction<User>) => {
            state.users = [...state.users, action.payload];
            state.user = initialUser;
        },
        eliminateUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((item: User) => item.id !== action.payload);
        },
        modifyUser: (state, action: PayloadAction<User>) => {
            state.users = state.users.map((item: User) => (item.id === action.payload.id ? action.payload : item));
            state.user = action.payload;
            state.authUser = {
                ...(state.authUser as AuthUser),
                username: action.payload.username,
                roles: action.payload.roles,
            };
        },
        clearCurrentUser: (state) => {
            state.user = null;
        },
    },
});

// export const getUsers = (state: RootState) => state.user.users;
// export const getUser = (state: RootState, id: string) => state.user.users.find((user: User) => user.id === id);
export const isAdmin = (state: RootState) => state.user.authUser?.roles.find((role: Role) => role === 'ADMIN');

export default userSlice.reducer;
