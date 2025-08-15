import { Document, Schema, model } from "mongoose";
import { IRole } from "./Role";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: Array<IRole>;
  imagePath: string;
  membership_date: Date;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  roles: Array<string>;
  imagePath: string;
  token?: string;
  membership_date?: Date;
}

export type AuthUser = Pick<UserResponse, "id" | "username" | "roles" | "token">;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imagePath: { type: String },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },
  ],
  membership_date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

UserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export default model<IUser>("User", UserSchema);
