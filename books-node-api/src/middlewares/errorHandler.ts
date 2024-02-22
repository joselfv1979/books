import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";
import { ResBody } from "../models/Response";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ResBody<null>>,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log(err);
    res.status(err.status).json({ data: null, success: false, errors: [err.message] });
  } else {
    res.status(500).json({ data: null, success: false, errors: ["Something went wrong"] });
  }
};
