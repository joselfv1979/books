import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";
import supertest from "supertest";
import { disconnect } from "../../src/config/connect";
import User from "../../src/models/User";
import { app, server } from '../../src/server';
import { seed } from "../../src/utils/testSeed";
import { getServerError } from "../helpers";

const LOGIN_ROUTE = "/api/auth/login";
const SIGNUP_ROUTE = "/api/auth/register";

const api = supertest(app);

beforeAll(async () => {
    await seed();
});

describe('loginController', () => {
    it("should return a successful response and user's data when logging credentials are valid", async () => {

        const res = await api
            .post(LOGIN_ROUTE)
            .send({ username: 'admin', password: '1234' });

        expect(res.status).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("username", 'admin');
        expect(res.body.data).toHaveProperty('token');
        expect(res.body.data).toHaveProperty('roles', ['ADMIN', 'USER']);
    });

    it("should fail with status code 401 if username doesn't exist", async () => {

        const wrongUsername = 'wrongUsername';

        const res = await api
            .post(LOGIN_ROUTE)
            .send({ username: wrongUsername, password: '1234' });

        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Username doesn't exist"]);
    });

    it("should fail with status code 401 if password is wrong", async () => {

        const wrongPasswd = 'wrongPassword';

        const res = await api
            .post(LOGIN_ROUTE)
            .send({ username: 'admin', password: wrongPasswd });

        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ['Invalid credentials']);
    });
});

describe('registerController', () => {
    it("should return a successful response and user's data when signing up is successful", async () => {

        const res = await api
            .post(SIGNUP_ROUTE)
            .send({
                username: 'newUser',
                email: 'newUser@gmail.com', password: '1234',
                roles: ['USER']
            });

        expect(res.status).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id');
    });

    it("should fail with status code 400 if password, which is a required property, is not passed", async () => {

        const res = await api
            .post(SIGNUP_ROUTE)
            .send({
                username: 'newUser2',
                email: 'newUser2@gmail.com',
                roles: ['USER']
            });

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ['Bad request']);
    });

    it("should fail with status code 409 if username already exists", async () => {

        const usernameExists = {
            username: 'newUser',
            email: 'user@gmail.com', password: '1234', roles: ['USER']
        };

        const res = await api
            .post(SIGNUP_ROUTE)
            .send(usernameExists);

        expect(res.status).toEqual(409);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ['Username already exists']);
    });

    it("should fail with status code 409 if email address already exists", async () => {

        const emailExists = {
            username: 'user',
            email: 'newUser@gmail.com', password: '1234', roles: ['USER']
        };

        const res = await api
            .post(SIGNUP_ROUTE)
            .send(emailExists);

        expect(res.status).toEqual(409);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ['Email address already exists']);
    });

    it("should fail with status code 401 if logging credentials are invalid", async () => {

        const wrongPasswd = 'wrongPassword';

        const res = await api
            .post(LOGIN_ROUTE)
            .send({ username: 'admin', password: wrongPasswd });

        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ['Invalid credentials']);
    });
});

describe('Error status code 500', () => {
    it("should fail with status code 500 if a server error occurs while logging", async () => {

        const findUserSpy = jest.spyOn(User, 'findOne');
        findUserSpy.mockImplementationOnce(getServerError);

        const res = await api
            .post(LOGIN_ROUTE)
            .send({ username: "user1", password: "passwd" });

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't login user, try it later"]);
    });

    it("should fail with status code 500 if sign up atributes are invalid", async () => {

        const res = await api
            .post(SIGNUP_ROUTE)
            .send({
                username: ['failedUser', 0, false],
                email: 'failedUser@gmail.com', password: [1, null],
                roles: ['USER']
            });
        expect(res.status).toEqual(500);
    });
});

afterAll(async () => {
    await disconnect();
    server.close();
});


