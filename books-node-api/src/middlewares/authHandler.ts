import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";
import { CustomError } from "../models/CustomError";

export interface CustomJwt extends JwtPayload {
  id: string,
  username: string,
  role?: string
}

const authHandler = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const authorization = request.get("authorization");

  if (!authorization) {
    return next(new CustomError(401, "Unauthorized"));
  }

  let token = "";

  if (authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  if (
    !token ||
    token.length === 0 ||
    token === "null" ||
    token === "undefined"
  ) {
    return next(new CustomError(401, "token missing or invalid"));
  }

  const options: VerifyOptions = { algorithms: ["HS256"] };
  let decodedToken = <CustomJwt>jwt.verify(token, process.env.SECRET as string, options);

  if (!decodedToken) {
    return next(new CustomError(401, "token missing or invalid"));
  }

  const { id: userId } = decodedToken;

  request.params.userId = userId;

  next();
};

export default authHandler;
