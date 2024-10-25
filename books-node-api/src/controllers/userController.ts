import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import { ResBody } from "../models/Response";
import { IRole } from "../models/Role";
import { UserResponse } from "../models/User";
import {
  deleteUserService,
  getRoleService,
  getUserService,
  getUsersService,
  updateUserService,
  userToUserResponse,
} from "../services/userService";

export async function getUsersController(
  _req: Request,
  res: Response<ResBody<UserResponse[]>>,
  next: NextFunction
) {
  try {
    const users = await getUsersService();
    const userList = users.map(user => userToUserResponse(user));

    res.status(200).json({ success: true, data: userList });
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
    next(new CustomError(500, "Couldn't fetch user, try it later"));
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
    const photo = req.file ? req.file.path : image;

    if (!id || !fullname || !username || !email) {
      return next(new CustomError(400, "Bad request"));
    }

    let roleList: IRole[] = await getRoleService(roles);
    const newBody = { ...req.body, roles: roleList, imagePath: photo };

    const user = await updateUserService(id, newBody);
    if (!user) return next(new CustomError(404, "User not found"));

    const userResponse = userToUserResponse(user);

    res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    next(new CustomError(500, "Couldn't update user, try it later"));
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
    next(new CustomError(500, "Couldn't delete user, try it later"));
  }
}
