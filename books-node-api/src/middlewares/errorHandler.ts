import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";
import { ResBody } from "../models/Response";
import Logger from "../utils/logger";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ResBody<null>>,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ data: null, success: false, errors: [err.message] });
    Logger.debug(err);
  } else {
    res.status(500).json({ data: null, success: false, errors: ["Something went wrong"] });
  }
};
