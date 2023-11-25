import axios from 'axios';
import { IUser } from '../types/User';
import { Auth } from '../types/Auth';
import { Result } from '../types/Result';
import { handleError } from '../utils/handleError';
import { getHeaders } from '../utils/authHeader';

const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

export const getAllUsers = async (): Promise<Result<IUser[]>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/users`, { headers: getHeaders() });
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const getUser = async (id: string): Promise<Result<IUser>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/users/${id}`, { headers: getHeaders() });
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const createUser = async (user: FormData): Promise<Result<IUser>> => {
    try {
        const { data } = await axios.post(`${baseUrl}/users`, user);
        return { success: true, value: data, message: 'User registered successfully' };
    } catch (error) {
        return handleError(error);
    }
};

export const removeUser = async (user: IUser): Promise<Result<IUser>> => {
    try {
        await axios.delete(`${baseUrl}/users/${user.id}`, { headers: getHeaders() });
        return { success: true, value: user, message: 'User deleted successfully' };
    } catch (error) {
        return handleError(error);
    }
};

export const updateUser = async (user: FormData): Promise<Result<IUser>> => {
    const id = user.get('id');
    try {
        const { data } = await axios.put(`${baseUrl}/users/${id}`, user, { headers: getHeaders() });
        return { success: true, value: data, message: 'User updated successfully' };
    } catch (error) {
        return handleError(error);
    }
};

export const loginUser = async (user: Auth): Promise<Result<IUser>> => {
    try {
        const { data } = await axios.post(`${baseUrl}/login`, user);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};
