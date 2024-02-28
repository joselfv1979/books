import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import {
  getUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
  userToUserResponse,
  getRoleService,
} from "../services/userService";
import { ResBody } from "../models/Response";
import { UserResponse } from "../models/User";
import { IRole } from "../models/Role";

export async function getUsersController(
  req: Request,
  res: Response<ResBody<UserResponse[]>>,
  next: NextFunction
) {
  try {
    const users = await getUsersService();
    const userList = users.map(user => userToUserResponse(user));

    res.json({ success: true, data: userList });
  } catch (error) {
    next(new CustomError(500, "Couldn't fetch users, try it later"));
  }
}

export async function getUserController(
  req: Request,
  res: Response<ResBody<UserResponse>>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    let user = await getUserService(id);
    if (!user) return next(new CustomError(404, "User not found"));

    const userResponse = userToUserResponse(user);

    res.status(200).json({ success: true, data: userResponse });
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
}

export async function updateUserController(
  req: Request,
  res: Response<ResBody<UserResponse>>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { fullname, username, email, image, roles } = req.body;
    const fileImage = req.file ? req.file.path : image;

    if (!id || !fullname || !username || !email) {
      return next(new CustomError(400, "Bad request"));
    }

    let roleList: IRole[] = await getRoleService(roles);
    const newBody = { ...req.body, roles: roleList, imagePath: fileImage };

    const user = await updateUserService(id, newBody);
    if (!user) return next(new CustomError(404, "User not found"));

    const userResponse = userToUserResponse(user);

    res.status(201).json({ success: true, data: userResponse });
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
