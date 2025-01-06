import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";
import { ResBody } from "../models/Response";
import { IRole } from "../models/Role";
import User, { AuthUser, IUser, UserResponse } from "../models/User";
import { createUserService, getEmailService, getRoleService, getUsernameService, userToUserResponse } from "../services/userService";
import { generateToken } from "../utils/jwt.utils";

// endpoint to login users
export async function loginController(
  req: Request,
  res: Response<ResBody<AuthUser>>,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    // retrieve user from database
    const user = await getUsernameService(username);

    if (!user) return next(new CustomError(401, "Username doesn't exist"));

    // check password match
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) return next(new CustomError(401, "Invalid credentials"));

    // generate token
    const token = generateToken(user.id, username, JSON.stringify(user.roles));

    // create a list of role names
    const roleList = user.roles.map(role => role.name);

    // returning object
    const loggedUser: AuthUser = {
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
  res: Response<ResBody<UserResponse>>,
  next: NextFunction
) {
  try {
    const { username, email, password, roles } = req.body;

    // use path if receiving file, empty string otherwise
    const photo = req.file ? req.file.path : "";

    if (!username || !email || !password || !roles) {
      return next(new CustomError(400, "Bad request"));
    }

    // check existing username
    const usernameExists = await getUsernameService(username);
    if (usernameExists) return next(new CustomError(409, "Username already exists"));

    // check existing email
    const emailExists = await getEmailService(email);
    if (emailExists) return next(new CustomError(409, "Email address already exists"));

    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10);

    // retieve roles from database
    let roleList: IRole[] = await getRoleService(roles);

    let newUser: IUser = new User({
      username,
      email,
      password: passwordHash,
      roles: roleList,
      imagePath: photo,
    });

    // create new user
    const user = await createUserService(newUser);

    // returning UserResponse object
    const userResponse = userToUserResponse(user);

    res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    next(new CustomError(500, "Couldn't create new user, try it later"));
  }
}
