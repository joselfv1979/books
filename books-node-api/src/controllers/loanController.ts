import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import { ILoan } from "../models/Loan";
import { ResBody } from "../models/Response";
import { borrowCopy, getLoansByUserService, returnLoanService } from "../services/loanService";

export const createLoanController = async (
    req: Request,
    res: Response<ResBody<ILoan>>,
    next: NextFunction
) => {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) return next(new CustomError(400, "Bad request"));

        const loan = await borrowCopy(userId, bookId);
        if (!loan) return next(new CustomError(404, "Loan not created"));

        res.status(201).json({ success: true, data: loan });
    } catch (error) {
        if (error instanceof CustomError) {
            next(error);
        } else {
            next(new CustomError(500, "Couldn't create loan, try it later"));
        }
    }
}

export const returnLoanController = async (
    req: Request,
    res: Response<ResBody<ILoan>>,
    next: NextFunction
) => {
    try {
        const { loanId } = req.params;
        if (!loanId) return next(new CustomError(400, "Bad request"));

        const loan = await returnLoanService(loanId);
        if (!loan) return next(new CustomError(404, "Loan not found"));

        res.status(200).json({ success: true, data: loan });
    } catch (error) {
        if (error instanceof CustomError) {
            next(error);
        } else {
            next(new CustomError(500, "Couldn't return loan, try it later"));
        }
    }
};

export const getLoansByUserController = async (
    req: Request,
    res: Response<ResBody<ILoan[]>>,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;
        if (!userId) return next(new CustomError(400, "Bad request"));

        const loans = await getLoansByUserService(userId);
        if (!loans) return next(new CustomError(404, "No loans found"));

        res.status(200).json({ success: true, data: loans });
    } catch (error) {
        if (error instanceof CustomError) {
            next(error);
        } else {
            next(new CustomError(500, "Couldn't fetch loans, try it later"));
        }
    }
};
