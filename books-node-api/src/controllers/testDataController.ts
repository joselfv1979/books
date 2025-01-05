import express from "express";
import { seed } from "../utils/testSeed";

const testRouter = express.Router();

//POST /testData/seed
testRouter.post("/", async (_req, res) => {
    await seed();
    res.sendStatus(200);
});