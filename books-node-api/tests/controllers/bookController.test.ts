import { afterAll, beforeAll, beforeEach, describe, expect, it, jest } from "@jest/globals";
import supertest from "supertest";
import { disconnect } from "../../src/config/connect";
import Book from "../../src/models/Book";
import { app, server } from '../../src/server';
import * as bookService from '../../src/services/bookService';
import { deleteBooks, getServerError, getToken } from "../helpers";

const BOOKS_ROUTE = "/api/books";

const api = supertest(app);

let token = '';

beforeEach(async () => {
    token = await getToken();
});

describe('getBooksController', () => {

    beforeAll(async () => {
        await Book.create({
            title: "Delete book test",
            author: "Juan Manuel",
            publisher: "Random Editorial",
            isbn: "0-1111-3333-2",
            genre: ["Literary Fiction", "Drama"],
            pages: 307,
            imagePath: ""
        })
    })

    it("should return a successful response with an array of all books", async () => {

        const res = await api.get(BOOKS_ROUTE);

        expect(res.status).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('data');
    });

    it("should return one book if the id is correct", async () => {

        const res = await api.get(BOOKS_ROUTE);

        const id = res.body.data.books[0].id

        const response = await api.get(`${BOOKS_ROUTE}/${id}`);

        expect(response.status).toEqual(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('title');
    });

    it("should create a new book with all properties", async () => {

        const newBook = {
            title: "Amanece pronto",
            author: "Juan Muxía",
            publisher: "Random Editorial",
            isbn: "0-1168-5777-2",
            genre: ["Literary Fiction", "Drama"],
            pages: 347,
            imagePath: ""
        };

        const res = await api.post(BOOKS_ROUTE)
            .set("authorization", token)
            .send(newBook);

        expect(res.status).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('title', "Amanece pronto");
    });

    it("should fail with code 400 when creating a book without mandatory properties", async () => {

        const faultyBook = {
            publisher: "Random Editorial",
            isbn: "0-1168-5777-2",
            genre: ["Literary Fiction", "Drama"],
            pages: 347,
        };

        const res = await api.post(BOOKS_ROUTE)
            .set("authorization", token)
            .send(faultyBook);

        expect(res.status).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body).toHaveProperty('errors', ["Bad request"]);
    });

    it("should update one book", async () => {

        const book = await Book.findOne({ isbn: "0-1111-3333-2" }).lean();

        const bookToUpdate = { ...book, author: "Juan Manuel" };

        const res = await api.put(`${BOOKS_ROUTE}/${book?._id}`)
            .set("authorization", token)
            .send(bookToUpdate);

        expect(res.status).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('author', "Juan Manuel");
    });

    it("should delete a book if it exists", async () => {

        const book = await Book.findOne({ title: 'Delete book test' }).lean();

        const res = await api.delete(`${BOOKS_ROUTE}/${book?._id}`)
            .set("authorization", token);

        expect(res.status).toEqual(204);
        expect(res.ok).toBe(true);
    });
});

describe('Error status code 500', () => {
    it("should fail with status code 500 if a server error occurs while retrieving all books", async () => {

        const fetchBooksSpy = jest.spyOn(bookService, 'getBooksService');
        fetchBooksSpy.mockImplementationOnce(getServerError);

        const res = await api.get(BOOKS_ROUTE);

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't fetch books, try it later"]);
    });

    it("should fail with status code 500 if a server error occurs while retrieving one book", async () => {

        const findBookSpy = jest.spyOn(Book, 'findById');
        findBookSpy.mockImplementationOnce(getServerError);

        const response = await api.get(BOOKS_ROUTE);

        const id = response.body.data.books[0].id;

        const res = await api.get(`${BOOKS_ROUTE}/${id}`);

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't fetch book, try it later"]);
    });

    it("should fail with status code 500 if a server error occurs while creating one book", async () => {

        const newBook = {
            title: true,
            author: 2,
            publisher: "Random Editorial",
            isbn: 1,
            genre: ["Literary Fiction", "Drama"],
            pages: ['1', 2],
            imagePath: ""
        };

        const res = await api.post(BOOKS_ROUTE)
            .set("authorization", token)
            .send(newBook);

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't create book, try it later"]);
    });

    it("should fail with status code 500 if a server error occurs while updating one book", async () => {

        const updateBookSpy = jest.spyOn(Book, 'findByIdAndUpdate');
        updateBookSpy.mockImplementationOnce(getServerError);

        const book = await Book.findOne({ isbn: "0-1168-5777-2" }).lean();

        const bookToUpdate = { ...book, title: 'New title' };

        const res = await api
            .put(`${BOOKS_ROUTE}/${book?._id}`)
            .set("authorization", token)
            .send(bookToUpdate);

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't update book, try it later"]);
    });

    it("should fail with status code 500 if a server error occurs while deleting one book", async () => {

        const deleteBookSpy = jest.spyOn(Book, 'findByIdAndDelete');
        deleteBookSpy.mockImplementationOnce(getServerError);
        const book = await Book.findOne({ isbn: "0-1168-5777-2" }).lean();

        const res = await api
            .delete(`${BOOKS_ROUTE}/${book?._id}`)
            .set("authorization", token);

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't delete book, try it later"]);
    });
})

afterAll(async () => {
    await deleteBooks();
    await disconnect();
    server.close();
});