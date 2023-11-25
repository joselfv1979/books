import { Result } from '../types/Result';

export const validateBook = (book: FormData): Result<FormData> => {
    const data = Object.fromEntries(book.entries());
    const { title, author, price, pages } = data;
    if (!title) {
        return { success: false, message: 'Title is required' };
    }
    if (!author) {
        return { success: false, message: 'Author is required' };
    }
    if (!price) {
        return { success: false, message: 'Price is required' };
    }
    if (!pages) {
        return { success: false, message: 'Pages is required' };
    }
    return { success: true, value: book };
};
