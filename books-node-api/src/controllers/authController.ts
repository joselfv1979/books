import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.utils";
import { createUserService, getEmailService, getRoleService, getUsernameService } from "../services/userService";
import { IRole } from "../models/Role";
import User, { IUser, LoggedUser } from "../models/User";
import { ResBody } from "../models/Response";

export async function loginController(
  req: Request,
  res: Response<ResBody<LoggedUser>>,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return next(new CustomError(400, "Bad request"));

    const user = await getUsernameService(username);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!user || !passwordCorrect) {
      return next(new CustomError(401, "Invalid credentials"));
    }

    const token = generateToken(user.id, username, JSON.stringify(user.roles));

    const roleList = user.roles.map(role => role.name);

    const loggedUser: LoggedUser = {
      id: user.id,
      username,
      roles: roleList,
      token
    }

    res.status(200).json({ success: true, data: loggedUser });
  } catch (error) {
    next(new CustomError(500, "Couldn't login user, try it later"));
  }
}

export async function registerController(
  req: Request,
  res: Response<ResBody<IUser>>,
  next: NextFunction
) {
  try {
    const { fullname, username, email, password, roles } = req.body;
    const filePath = req.file ? req.file.path : "";

    if (!fullname || !username || !email || !password || !roles) {
      return next(new CustomError(400, "Bad request"));
    }

    const usernameExists = await getUsernameService(username);
    if (usernameExists)
      return next(new CustomError(409, "Username already exists"));

    const emailExists = await getEmailService(email);
    if (emailExists)
      return next(new CustomError(409, "Email address already exists"));

    const passwordHash = await bcrypt.hash(password, 10);

    let roleList: IRole[] = await getRoleService(roles);

    let newUser: IUser = new User({
      fullname,
      username,
      email,
      password: passwordHash,
      roles: roleList,
      imagePath: filePath,
    });

    const user = await createUserService(newUser);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(new CustomError(500, "Couldn't create new user, try it later"));
  }
}
