import mongoose, { Document, Schema, model } from "mongoose";

export interface ILoan extends Document {
    userId: mongoose.Types.ObjectId;
    copyId: mongoose.Types.ObjectId;
    issueDate: Date;
    dueDate: Date;
    returned: boolean;
}

const LoanSchema = new Schema<ILoan>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    copyId: { type: Schema.Types.ObjectId, ref: "Copy", required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returned: { type: Boolean, required: true, default: false }
});

export default model<ILoan>("Loan", LoanSchema);
