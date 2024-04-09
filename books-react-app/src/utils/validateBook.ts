import { Book } from "types/Book";
import { Result } from "../types/Result";

export const validateBook = (book: Book): Result<Book, string> => {

    const { title, author, price, pages } = book;

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
}
