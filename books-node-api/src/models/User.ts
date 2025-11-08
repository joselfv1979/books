import { Document, model, Schema, Types } from "mongoose";
import { IRole } from "./Role";

// Interface for MongoDB document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: Types.ObjectId[] | IRole[]; // Can be populated
  imagePath?: string;
  membership_date: Date;
}

// Interface for API responses
export interface UserResponse {
  id: string;
  username: string;
  email: string;
  roles: string[]; // Role names or IDs
  imagePath?: string;
  token?: string;
  membership_date?: Date;
}

// Auth subset
export type AuthUser = Pick<UserResponse, "id" | "username" | "roles" | "token">;

// Mongoose schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imagePath: { type: String },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },
    ],
    membership_date: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

// Customize JSON output
userSchema.set("toJSON", {
  transform: (_document: Document, returnedObject: Record<string, any>) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
    }
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

// Export the model
export default model<IUser>("User", userSchema);
