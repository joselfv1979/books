import mongoose, { Document, model, Schema } from 'mongoose';

export enum CopyStatus {
    Available = "AVAILABLE",
    Loaned = "LOANED",
    Lost = "LOST",
    Damaged = "DAMAGED"
}
export interface ICopy extends Document {
    bookId: mongoose.Types.ObjectId;
    status: CopyStatus;
}

const CopySchema: Schema = new Schema<ICopy>({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    status: { type: String, enum: Object.values(CopyStatus), default: CopyStatus.Available }
});

export default model<ICopy>('Copy', CopySchema);
