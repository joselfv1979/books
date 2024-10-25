import { afterAll, beforeAll, beforeEach, describe, expect, it, jest } from "@jest/globals";
import supertest from "supertest";
import { disconnect } from "../../src/config/connect";
import User from "../../src/models/User";
import { app, server } from '../../src/server';
import { getUsernameService } from "../../src/services/userService";
import { seed } from "../../src/utils/testSeed";
import { getServerError, getToken } from "../helpers";

const USERS_ROUTE = "/api/users";

const api = supertest(app);

let token = '';

beforeAll(async () => {
    await seed();
});

beforeEach(async () => {
    token = await getToken();
});

describe('getUsersController', () => {
    it("should return a successful response with an array of all users", async () => {

        const res = await api
            .get(USERS_ROUTE)
            .set("authorization", token);

        expect(res.status).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('data');
    });

    it("should return one user if the id is correct", async () => {

        const user = await getUsernameService('admin');

        const res = await api
            .get(`${USERS_ROUTE}/${user?.id}`)
            .set("authorization", token);

        expect(res.status).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('username', 'admin');
    });

    it("should update one user's data if the id and attributes are correct", async () => {

        const user = await User.findOne({ username: 'userToUpdate' }).lean();

        const userToUpdate = { ...user, fullname: 'New fullname' };

        const res = await api
            .put(`${USERS_ROUTE}/${userToUpdate._id}`)
            .set("authorization", token)
            .send(userToUpdate);

        expect(res.status).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('fullname', 'New fullname');
    });

    it("should fail with code 400 updating one user if the attributes needed are not sended", async () => {
        const noEmailUser = {
            fullname: "User's Fullname",
            email: 'newUser@gmail.com',
            roles: ['USER']
        }

        const res = await api
            .put(`${USERS_ROUTE}/1234`)
            .set("authorization", token)
            .send(noEmailUser);

        expect(res.status).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body).toHaveProperty('errors', ["Bad request"]);
    });

    it("should delete one user's data if the id is correct", async () => {

        const user = await User.findOne({ username: 'userToDelete' }).lean();

        const response = await api
            .delete(`${USERS_ROUTE}/${user?._id}`)
            .set("authorization", token);

        expect(response.status).toEqual(204);
        expect(response.ok).toBe(true);
    });

});

describe('Error status code 500', () => {
    it("should fail with status code 500 if a server error occurs while fetching all users", async () => {

        const findUsersSpy = jest.spyOn(User, 'find');
        findUsersSpy.mockImplementationOnce(getServerError);

        const res = await api
            .get(USERS_ROUTE)
            .set("authorization", token);

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't fetch users, try it later"]);
    });

    it("should fail with status code 500 if a server error occurs while fetching one user", async () => {

        const findUserSpy = jest.spyOn(User, 'findById');
        findUserSpy.mockImplementationOnce(getServerError);

        const user = await getUsernameService('userToUpdate');

        const res = await api
            .get(`${USERS_ROUTE}/${user?.id}`)
            .set("authorization", token);

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't fetch user, try it later"]);
    });

    it("should fail with status code 500 if a server error occurs while updating one user", async () => {
        const updateUserSpy = jest.spyOn(User, 'findByIdAndUpdate');
        updateUserSpy.mockImplementationOnce(getServerError);

        const user = await User.findOne({ username: 'userToUpdate' }).lean();
        const userToUpdate = { ...user, fullname: 'New fullname' };

        const res = await api
            .put(`${USERS_ROUTE}/${user?._id}`)
            .set("authorization", token)
            .send(userToUpdate);

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't update user, try it later"]);
    });

    it("should fail with status code 500 if a server error occurs while deleting one user", async () => {

        const deleteUserSpy = jest.spyOn(User, 'findByIdAndDelete');
        deleteUserSpy.mockImplementationOnce(getServerError);

        const user = await getUsernameService('userToUpdate');

        const res = await api
            .delete(`${USERS_ROUTE}/${user?.id}`)
            .set("authorization", token);

        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('data', null);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('errors', ["Couldn't delete user, try it later"]);
    });
})

afterAll(async () => {
    await disconnect();
    server.close();
});
