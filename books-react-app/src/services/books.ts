import axios from 'axios';
import { Book } from '../types/Book';
import { Result } from '../types/Result';
import { getHeaders } from '../utils/authHeader';
import { handleError } from '../utils/handleError';

const baseUrl = `${process.env.REACT_APP_API_URL}/api/books`;

export const getAllBooks = async (): Promise<Result<Book[], string>> => {
    try {
        const { data } = await axios.get(baseUrl);
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const getBook = async (id: string): Promise<Result<Book, string>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/${id}`);
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const createBook = async (book: FormData): Promise<Result<Book, string>> => {
    try {
        const { data } = await axios.post(baseUrl, book, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const removeBook = async (id: string): Promise<Result<Book, string>> => {
    try {
        const { data } = await axios.delete(`${baseUrl}/${id}`, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const updateBook = async (book: FormData): Promise<Result<Book, string>> => {
    const id = book.get('id');

    try {
        const { data } = await axios.put(`${baseUrl}/${id}`, book, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};
