import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { disconnect } from "../src/config/connect";
import { app, server } from "../src/server";

const api = supertest(app);
const FAKE_ROUTE = "/fakeRoute";

describe("Server routes", () => {

    test("route '/' should return a successful response", async () => {
        const res = await api.get('/');

        expect(res.status).toBe(200);
        expect(res.text).toBe("<h2>It's Working!</h2>")
    });

    test("should return error 404 if the route doesn't exist", async () => {
        await api
            .get(`${FAKE_ROUTE}/`)
            .expect(404)
            .expect((res) => {
                res.text = "Path not found";
            })
    });
});

afterAll(async () => {
    await disconnect();
    server.close();
})

