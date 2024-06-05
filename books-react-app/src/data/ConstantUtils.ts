import { Book } from "types/Book";
import { User } from "../types/User";

// User empty object
export const initialUser: User = {
    id: '',
    username: '',
    fullname: '',
    password: '',
    roles: ['USER'],
    email: '',
    image: undefined,
    imagePath: '',
};

// Book empty object
export const initialBook: Book = {
    id: '',
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    genre: [],
    pages: 0,
    image: undefined,
    imagePath: '',
};
