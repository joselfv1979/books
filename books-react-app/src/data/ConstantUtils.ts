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
};

export const initialBook: Book = {
    id: '',
    title: '',
    author: '',
    price: 0,
    pages: 0,
    image: undefined,
    imagePath: '',
};
