import { Result } from '../types/Result';
import { handleError } from '../utils/handleError';
import { getHeaders } from '../utils/authHeader';
import { AuthRequest, User } from '../types/User';
import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

export const getAllUsers = async (): Promise<Result<User[], string>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/users`, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const getUser = async (id: string): Promise<Result<User, string>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/users/${id}`, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const createUser = async (user: User): Promise<Result<User, string>> => {
    try {
        const { data } = await axios.post(`${baseUrl}/auth/register`, user);
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const removeUser = async (id: string): Promise<Result<User, string>> => {
    try {
        const { data } = await axios.delete(`${baseUrl}/users/${id}`, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const updateUser = async (user: User): Promise<Result<User, string>> => {
    try {
        const { data } = await axios.put(`${baseUrl}/users/${user.id}`, user, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const loginUser = async (user: AuthRequest): Promise<Result<User, string>> => {
    try {
        const { data } = await axios.post(`${baseUrl}/auth/login`, user);
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};
