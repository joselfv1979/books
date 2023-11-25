import axios from 'axios';
import { IBook } from '../types/Book';
import { Result } from '../types/Result';
import { getHeaders } from '../utils/authHeader';
import { handleError } from '../utils/handleError';

const baseUrl = `${process.env.REACT_APP_API_URL}/api/books`;

export const getAllBooks = async (): Promise<Result<IBook[]>> => {
    try {
        const { data } = await axios.get(baseUrl);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const getBook = async (id: string): Promise<Result<IBook>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/${id}`);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const createBook = async (book: FormData): Promise<Result<IBook>> => {
    try {
        const { data } = await axios.post(baseUrl, book, { headers: getHeaders() });
        return { success: true, value: data, message: 'Book created successfully' };
    } catch (error) {
        return handleError(error);
    }
};

export const removeBook = async (book: IBook): Promise<Result<IBook>> => {
    try {
        await axios.delete(`${baseUrl}/${book.id}`, { headers: getHeaders() });
        return { success: true, value: book, message: 'Book deleted successfully' };
    } catch (error) {
        return handleError(error);
    }
};

export const updateBook = async (book: FormData): Promise<Result<IBook>> => {
    const id = book.get('id');
    try {
        const { data } = await axios.put(`${baseUrl}/${id}`, book, { headers: getHeaders() });
        return { success: true, value: data, message: 'Book updated successfully' };
    } catch (error) {
        return handleError(error);
    }
};
