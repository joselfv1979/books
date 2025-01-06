import { Router } from "express";
import { seed } from "../utils/testSeed";

const testRouter = Router();

// Endpoint to seed the database
testRouter.post("/", async (_req, res) => {
    await seed();
    res.sendStatus(200);
});

export default testRouter;