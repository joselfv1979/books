import { Dispatch, SetStateAction } from "react";
import { Book } from "../types/Book";

export type BookFormErrors = {
    title?: string,
    author?: string,
    publisher?: string,
    isbn?: string,
    pages?: string,
}

type Props = {
    values: Book;
    errors: BookFormErrors;
    setErrors: Dispatch<SetStateAction<BookFormErrors>>
}

// Validate book function
export const validateBook = ({ values, errors, setErrors }: Props) => {

    const { title, author, publisher, isbn, pages } = values;

    let isValid = true;

    errors.title = title ? undefined : 'Title is required';
    errors.author = author ? undefined : 'Author is required';
    errors.publisher = publisher ? undefined : 'Publisher is required';
    errors.isbn = isbn ? undefined : 'Isbn is required';
    errors.pages = pages ? undefined : 'Pages is required';

    setErrors({ ...errors });

    for (const key in errors) {
        if (errors[key as keyof BookFormErrors] !== undefined) {
            isValid = false;
            break;
        }
    }

    return { isValid };
}
