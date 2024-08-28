import supertest from "supertest";
import Book from "../src/models/Book";
import { app } from "../src/server";

const api = supertest(app);
const LOGIN_ROUTE = "/api/auth/login";

const credentials = {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PWD,
};

let token = "";

export const getToken = async () => {

    const res = await api.post(`${LOGIN_ROUTE}`).send(credentials);

    token = `bearer ${res.body.data.token}`

    return token;
};

export const deleteBooks = async () => {
    await Book.deleteOne({ isbn: '0-1111-3333-2' });
    await Book.deleteOne({ isbn: '0-1168-5777-2' });
}

export const getServerError = () => {
    throw new Error(
        "Simulating a random error. Leading to a server error."
    );
}


