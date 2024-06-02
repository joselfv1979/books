import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";
import { ResBody } from "../models/Response";
import Logger from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ResBody<null>>,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    Logger.debug(err);
    res.status(err.status).json({ data: null, success: false, errors: [err.message] });
  } else {
    res.status(500).json({ data: null, success: false, errors: ["Something went wrong"] });
  }
};
