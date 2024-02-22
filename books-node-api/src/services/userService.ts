import Role, { IRole } from "../models/Role";
import User, { IUser } from "../models/User";
import { ObjectId } from "mongodb";

export async function getUsersService() {
  return await User.find().populate("books", {
    title: 1,
  });
}

export async function getUserService(id: string) {
  return await User.findById(new ObjectId(id)).populate('roles', 'name');
}

export async function getUsernameService(username: string) {
  return await User.findOne({ username: username }).populate('roles', 'name');
}

export async function getEmailService(email: string) {
  return await User.findOne({ email: email });
}

export async function createUserService(user: IUser) {
  return await user.save();
}

export async function updateUserService(id: string, user: IUser) {
  return await User.findByIdAndUpdate(new ObjectId(id), user, { new: true }).populate('roles', 'name');
}

export async function deleteUserService(id: string) {
  return await User.findByIdAndDelete(new ObjectId(id));
}

export async function getRoleService(roles: string[]) {

  let roleList: IRole[] = [];

  for (let role of roles) {
    const auxRole = await Role.findOne({ name: role });
    if (auxRole) roleList.push(auxRole);
  }

  if (roleList.length === 0) {
    const userRole = await Role.findOne({ name: 'USER' });
    if (userRole) roleList.push(userRole);
  }

  return roleList;
}


