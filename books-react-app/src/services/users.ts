import axios from 'axios';
import { Result } from '../types/Result';
import { AuthRequest, User } from '../types/User';
import { getHeaders } from '../utils/authHeader';
import { castUserToFormData } from '../utils/castFormData';
import { handleError } from '../utils/handleError';

const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

// Request to get all users
export const getAllUsers = async (): Promise<Result<User[], string>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/users`, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

// Request to get one user by id
export const getUser = async (id: string): Promise<Result<User, string>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/users/${id}`, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

// Request to create a new user
export const createUser = async (user: User): Promise<Result<User, string>> => {
    try {
        const userForm = castUserToFormData(user);
        const { data } = await axios.post(`${baseUrl}/auth/register`, userForm);
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

// Request to delete one user by id
export const removeUser = async (id: string): Promise<Result<User, string>> => {
    try {
        const { data } = await axios.delete(`${baseUrl}/users/${id}`, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

// Request to update one user by id
export const updateUser = async (user: User): Promise<Result<User, string>> => {
    try {
        const userForm = castUserToFormData(user);
        const { data } = await axios.put(`${baseUrl}/users/${user.id}`, userForm, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

// Request to authenticate a user
export const loginUser = async (user: AuthRequest): Promise<Result<User, string>> => {
    try {
        const { data } = await axios.post(`${baseUrl}/auth/login`, user);
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};
