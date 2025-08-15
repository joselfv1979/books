import { Document, Schema, model } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  genre: string[];
  pages: number;
  imagePath: string;
  copies: number
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true, unique: true },
  publisher: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [
    { type: String, required: true }
  ],
  pages: { type: Number, required: true },
  description: { type: String },
  imagePath: { type: String },
  copies: { type: Number, default: 1 },
}, {
  timestamps: true,
});

BookSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


export default model<IBook>("Book", BookSchema);
