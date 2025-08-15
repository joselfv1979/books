import { Router } from "express";
import { createLoanController, getLoansByMemberController } from "../controllers/loanController";
import authHandler from "../middlewares/authHandler";

const loansRouter = Router();

loansRouter.post("/", authHandler, createLoanController);
loansRouter.get("/:memberId", authHandler, getLoansByMemberController);

export default loansRouter;
