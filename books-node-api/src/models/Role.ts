import { Document, Schema, model } from "mongoose";

const rolesValidos = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} no es un role válido'
}

export interface IRole extends Document {
    name: string;
};

const RoleSchema = new Schema({
    name: { type: String, required: true, default: 'USER', enum: rolesValidos }
});

RoleSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
}, {
    timestamps: true,
});

export default model<IRole>("Role", RoleSchema);