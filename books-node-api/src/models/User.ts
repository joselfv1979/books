import { Schema, model, Document } from "mongoose";
import { IBook } from "./Book";
import { IRole } from "./Role";

export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  roles: Array<IRole>;
  imagePath: string;
  books: Array<IBook>;
}

export interface UserResponse {
  id: string;
  fullname: string;
  username: string;
  email: string;
  roles: Array<string>;
  imagePath: string;
  books: Array<IBook>;
}
export interface LoggedUser {
  id: string;
  username: string;
  roles: Array<string>;
  token: string;
}

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imagePath: { type: String },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
}, {
  timestamps: true,
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export default model<IUser>("User", UserSchema);
