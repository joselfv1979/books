import { Document, model, Schema } from "mongoose";

// Plain data interface without Mongoose document methods
export interface IBook {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  publishedYear: number;
  genre: string[];
  language: string;
  pages: number;
  description: string;
  imagePath?: string;
}

export interface BookDocument extends IBook, Document {
  id: string;
}

export interface BookWithCopies extends IBook {
  id: string;
  totalCopies: number;
  availableCopies: number;
}

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    isbn: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    genre: { type: [String], default: [] },
    language: { type: String, required: true },
    pages: { type: Number, required: true },
    description: { type: String, required: true },
    imagePath: { type: String }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
      }
    }
  }
);

// The model represents the hydrated documents with methods
export default model<BookDocument>("Book", bookSchema);

