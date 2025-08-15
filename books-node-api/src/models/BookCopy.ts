import mongoose, { Document, model, Schema } from 'mongoose';
import { IBook } from './Book';

export interface IBookCopy extends Document {
    book: mongoose.Types.ObjectId | IBook;
    copy_number?: number;
    condition: 'New' | 'Good' | 'Fair' | 'Poor';
    available: boolean;
}

const BookCopySchema: Schema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    copy_number: Number,
    condition: {
        type: String,
        enum: ['New', 'Good', 'Fair', 'Poor'],
        default: 'Good',
    },
    available: { type: Boolean, default: true },
});

export default model<IBookCopy>('BookCopy', BookCopySchema);
