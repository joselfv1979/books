import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import { ILoan } from "../models/Loan";
import { ResBody } from "../models/Response";
import { borrowBook, getLoansByMemberService } from "../services/loanService";

export const createLoanController = async (
    req: Request,
    res: Response<ResBody<ILoan>>,
    next: NextFunction
) => {
    try {
        const { memberId, bookId } = req.body;
        if (!memberId || !bookId) return next(new CustomError(400, "Bad request"));

        const loan = await borrowBook(memberId, bookId);
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

export const getLoansByMemberController = async (
    req: Request,
    res: Response<ResBody<ILoan[]>>,
    next: NextFunction
) => {
    try {
        const { memberId } = req.params;
        if (!memberId) return next(new CustomError(400, "Bad request"));

        const loans = await getLoansByMemberService(memberId);
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
