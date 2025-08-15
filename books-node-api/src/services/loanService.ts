import BookCopy from '../models/BookCopy';
import { CustomError } from '../models/CustomError';
import Loan from '../models/Loan';

export async function borrowBook(memberId: string, bookId: string) {
    const availableCopy = await BookCopy.findOne({ book: bookId, available: true });
    if (!availableCopy) throw new CustomError(404, 'No available copies for this book');

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const loan = await Loan.create({
        member: memberId,
        bookCopy: availableCopy._id,
        due_date: dueDate
    });

    await BookCopy.findByIdAndUpdate(availableCopy._id, { available: false });

    return loan;
}

export async function getLoansByMemberService(memberId: string) {
    return await Loan.find({ member: memberId }).populate('user').populate('bookCopy');
}