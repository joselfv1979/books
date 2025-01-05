import { Book, BookState } from "../../types/Book";
import { User, UserState } from "../../types/User";

export const books: Book[] = [
    {
        id: '1',
        title: 'La Colmena',
        author: 'Cela',
        publisher: "Penguin",
        isbn: "0-6666-2222",
        genre: ["Horror"],
        description: "A novel about bees.",
        pages: 350,
        imagePath: '/',
    },
];

export const bookState: BookState = {
    books: books,
    book: null,
    loading: false,
    totalPages: "1"
};

export const user1: User = {
    id: '1',
    username: 'ana',
    password: '1234',
    email: 'ana@gmail.com',
    imagePath: '',
    roles: ['USER']
}

export const users: User[] = [user1];

export const userState: UserState = {
    users: users,
    user: null,
    loading: false,
};