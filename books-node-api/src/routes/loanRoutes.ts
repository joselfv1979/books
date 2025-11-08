import { Router } from "express";
import { createLoanController, getLoansByUserController, returnLoanController } from "../controllers/loanController";
import authHandler from "../middlewares/authHandler";

const loansRouter = Router();

loansRouter.post("/", authHandler, createLoanController);
loansRouter.get("/user/:userId", authHandler, getLoansByUserController);
loansRouter.put("/return/:loanId", authHandler, returnLoanController);

export default loansRouter;
