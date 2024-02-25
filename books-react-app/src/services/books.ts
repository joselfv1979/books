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
        console.log(data);

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

export const removeBook = async (book: Book): Promise<Result<Book, string>> => {
    try {
        await axios.delete(`${baseUrl}/${book.id}`, { headers: getHeaders() });
        return { success: true, value: book };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

export const updateBook = async (book: FormData): Promise<Result<Book, string>> => {
    const id = book.get('id');
    console.log('updated-book');
    for (const pair of book.entries()) {
        console.log(pair[0], pair[1]);
    }

    try {
        const { data } = await axios.put(`${baseUrl}/${id}`, book, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};
