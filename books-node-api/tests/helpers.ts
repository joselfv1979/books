import supertest from "supertest";
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

export const getServerError = () => {
    throw new Error(
        "Simulating a random error. Leading to a server error."
    );
}


