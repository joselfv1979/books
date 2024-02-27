import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import {
  getUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
} from "../services/userService";
import { ResBody } from "../models/Response";
import { IUser } from "../models/User";

export async function getUsersController(
  req: Request,
  res: Response<ResBody<IUser[]>>,
  next: NextFunction
) {
  try {
    const users = await getUsersService();
    res.json({ success: true, data: users });
  } catch (error) {
    next(new CustomError(500, "Couldn't fetch users, try it later"));
  }
}

export async function getUserController(
  req: Request,
  res: Response<ResBody<IUser>>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    let user = await getUserService(id);
    if (!user) return next(new CustomError(404, "User not found"));

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
}

export async function updateUserController(
  req: Request,
  res: Response<ResBody<IUser>>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { fullname, username, email, image } = req.body;
    const fileImage = req.file ? req.file.path : image;

    if (!id || !fullname || !username || !email) {
      return next(new CustomError(400, "Bad request"));
    }

    const newBody = { ...req.body, imagePath: fileImage };

    const user = await updateUserService(id, newBody);
    if (!user) return next(new CustomError(404, "User not found"));

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
}

export async function deleteUserController(
  req: Request,
  res: Response<{ success: boolean }>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const user = await deleteUserService(id);
    if (!user) return next(new CustomError(404, "User not found"));

    return res.status(204).json({ success: true });
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
}
