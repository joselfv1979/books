import { Document, Schema, model } from "mongoose";

const rolesValidos = ["ADMIN", "USER"];

export interface IRole extends Document {
    name: string;
};

const RoleSchema = new Schema<IRole>({
    name: { type: String, required: true, default: 'USER', enum: rolesValidos }
});

RoleSchema.set("toJSON", {
    transform: (_document: Document, returnedObject: Record<string, any>) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
        }
        delete returnedObject.__v;
    },
});

export default model<IRole>("Role", RoleSchema);