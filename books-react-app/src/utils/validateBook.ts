import { Dispatch, SetStateAction } from "react";
import { Book } from "../types/Book";

export type BookFormErrors = {
    title?: string,
    author?: string,
    publisher?: string,
    isbn?: string,
    pages?: string,
    language?: string,
    copiesCount?: string
}

type Props = {
    values: Book;
    errors: BookFormErrors;
    setErrors: Dispatch<SetStateAction<BookFormErrors>>
}

// Validate book function
export const validateBook = ({ values, errors, setErrors }: Props) => {

    const { title, author, publisher, isbn, pages, language, copiesCount } = values;

    let isValid = true;

    errors.title = title ? undefined : 'Title is required';
    errors.author = author ? undefined : 'Author is required';
    errors.publisher = publisher ? undefined : 'Publisher is required';
    errors.isbn = isbn ? undefined : 'Isbn is required';
    errors.pages = Number(pages) !== 0 ? undefined : 'Pages is required';
    errors.language = language ? undefined : 'Language is required';
    errors.copiesCount = Number(copiesCount) !== 0 ? undefined : 'Copies is required';

    setErrors({ ...errors });

    for (const key in errors) {
        if (errors[key as keyof BookFormErrors] !== undefined) {
            isValid = false;
            break;
        }
    }

    return { isValid };
}
