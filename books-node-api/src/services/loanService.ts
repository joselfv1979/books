import Copy, { CopyStatus } from '../models/Copy';
import { CustomError } from '../models/CustomError';
import Loan from '../models/Loan';

export async function borrowCopy(userId: string, bookId: string) {
    const availableCopy = await Copy.findOneAndUpdate(
        { bookId, status: CopyStatus.Available },
        { status: CopyStatus.Loaned },
        { new: true }
    );

    if (!availableCopy) throw new CustomError(404, 'No available copies for this book!');

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const loan = await Loan.create({
        userId,
        copyId: availableCopy._id,
        dueDate,
    });

    return await loan.save();
}

export async function getLoansByUserService(userId: string) {
    return await Loan.find({ userId }).populate({
        path: 'copyId',
        populate: {
            path: 'bookId',
            model: 'Book',
            select: 'title author isbn imagePath' // specify which Book fields you want
        }
    });
}

export async function returnLoanService(loanId: string) {
    const loan = await Loan.findById(loanId);
    if (!loan || loan.returned) throw new CustomError(404, "Invalid loan or already returned");

    loan.returned = true;
    await loan.save();

    await Copy.findByIdAndUpdate(loan.copyId, { status: CopyStatus.Available });

    return loan;
}