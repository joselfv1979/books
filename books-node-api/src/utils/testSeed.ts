import { connect } from "../config/connect";
import Book from "../models/Book";
import Role from "../models/Role";
import User from "../models/User";
import { createBookService } from "../services/bookService";
import { createUserService, getRoleService } from "./../services/userService";

const ADMIN_ROLE = 'ADMIN';
const USER_ROLE = 'USER';

const books = [
    {
        title: "El doctor enamorado",
        author: "Roberto Heras",
        publisher: "La casa del Libro",
        isbn: "0-1062-0565-X",
        genre: ["Literary Fiction", "Drama"],
        pages: 259,
        imagePath: "",
    },
    {
        title: "bookToDelete",
        author: "Juan Muxía",
        publisher: "Random Editorial",
        isbn: "0-1168-5687-4",
        genre: ["Literary Fiction", "Drama"],
        pages: 347,
        imagePath: "",
    },
    {
        title: "bookToUpdate",
        author: "Ana Redondo",
        publisher: "La casa del Libro",
        isbn: "0-1915-0172-7",
        genre: ["Horror", "Short story"],
        pages: 284,
        imagePath: "",
    },
    {
        title: "Delete book test",
        author: "Juan Manuel",
        publisher: "Random Editorial",
        isbn: "0-1111-3333-2",
        genre: ["Literary Fiction", "Drama"],
        pages: 307,
        imagePath: ""
    }
];

const users = [
    {
        fullname: "admin",
        username: "admin",
        email: "admin@gmail.com",
        password: "$2b$10$eJ6BrxRZwn/aVh5IjsqGsedeOUj9b4sV2MI52q8x5v4QPtRedpQGO",
        roles: [ADMIN_ROLE, USER_ROLE],
        imagePath: "",
        books: [],
    },
    {
        fullname: "User 1",
        username: "userToDelete",
        email: "userToDelete@gmail.com",
        password: "$2b$10$eJ6BrxRZwn/aVh5IjsqGsedeOUj9b4sV2MI52q8x5v4QPtRedpQGO",
        roles: [USER_ROLE],
        imagePath: "",
        books: [],
    },
    {
        fullname: "User 2",
        username: "userToUpdate",
        email: "userToUpdate@gmail.com",
        password: "$2b$10$eJ6BrxRZwn/aVh5IjsqGsedeOUj9b4sV2MI52q8x5v4QPtRedpQGO",
        roles: [USER_ROLE],
        imagePath: "",
        books: [],
    }
];

const getRoles = async (roles: string[]) => {
    return await getRoleService(roles);
};

const createUsers = async () => {
    for (let user of users) {
        const userRoles = await getRoles(user.roles);
        const newUser = { ...user, roles: userRoles };
        await createUserService(new User(newUser));
    }
};

const createBooks = async () => {
    for (let book of books) {
        await createBookService(new Book(book));
    }
};

export const seed = async () => {
    try {
        connect();
        await Book.collection.drop();
        await User.collection.drop();
        await Role.collection.drop();

        await Role.insertMany([{ name: ADMIN_ROLE }, { name: USER_ROLE }]);
        await createUsers();
        await createBooks();
    } catch (error) {
        console.log(error);
    }
};