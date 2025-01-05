import { Router } from "express";
import { seed } from "../utils/testSeed";

export const testRouter = Router();

testRouter.post("/", async (_req, res) => {
    await seed();
    res.sendStatus(200);
});