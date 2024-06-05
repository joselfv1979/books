import axios from 'axios';
import { Book } from '../types/Book';
import { Result } from '../types/Result';
import { getHeaders } from '../utils/authHeader';
import { handleError } from '../utils/handleError';
import { castBookToFormData } from 'utils/castFormData';
import { Query, QueryResponse } from 'types/Query';

const baseUrl = `${process.env.REACT_APP_API_URL}/api/books`;

// Request to get all books
export const getAllBooks = async (params: Query): Promise<Result<QueryResponse, string>> => {
    try {
        const { data } = await axios.get(baseUrl, { params });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

// Request to get one book by id
export const getBook = async (id: string): Promise<Result<Book, string>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/${id}`);
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

// Request to create a new book
export const createBook = async (book: Book): Promise<Result<Book, string>> => {
    try {
        // Convert book to FormData object before sending
        const bookForm = castBookToFormData(book);
        const { data } = await axios.post(baseUrl, bookForm, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

// Request to delete one book by id
export const removeBook = async (id: string): Promise<Result<Book, string>> => {
    try {
        const { data } = await axios.delete(`${baseUrl}/${id}`, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};

// Request to update one book by id
export const updateBook = async (book: Book): Promise<Result<Book, string>> => {
    try {
        // Convert book to FormData object before sending
        const bookForm = castBookToFormData(book);
        const { data } = await axios.put(`${baseUrl}/${book.id}`, bookForm, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};
