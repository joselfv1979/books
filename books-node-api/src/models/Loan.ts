import mongoose, { Document, Schema, model } from "mongoose";
import { IBookCopy } from "./BookCopy";
import { IUser } from "./User";

export interface ILoan extends Document {
    user: mongoose.Types.ObjectId | IUser;
    bookCopy: mongoose.Types.ObjectId | IBookCopy;
    startDate: Date;
    endDate: Date;
    returned: boolean;
}

const LoanSchema = new Schema<ILoan>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        bookCopy: {
            type: Schema.Types.ObjectId,
            ref: "BookCopy",
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        endDate: {
            type: Date,
            required: true,
        },
        returned: {
            type: Boolean,
            required: true, //default: false,
        }
    });

export default model<ILoan>("Loan", LoanSchema);
