import Copy, { CopyStatus } from '../models/Copy';
import { CustomError } from '../models/CustomError';
import Loan from '../models/Loan';

interface PopulatedBook {
    _id: string;
    title: string;
    author: string;
    imagePath?: string;
}

interface PopulatedCopy {
    _id: string;
    bookId: PopulatedBook;
}

interface PopulatedLoan {
    _id: string;
    userId: string;
    copyId: PopulatedCopy;
    dueDate: Date;
    returned: boolean;
}

export interface LoanWithBookInfo {
    id: string;
    userId: string;
    copyId: string;
    bookId: string;
    imagePath?: string;
    title: string;
    author: string;
    dueDate: Date;
    returned: boolean;
}

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
    console.log('loan', loan);
    

    return await loan.save();
}

export async function getLoansByUserService(userId: string): Promise<LoanWithBookInfo[]> {
    const loans = await Loan.find({ userId }).populate({
        path: 'copyId',
        populate: {
            path: 'bookId',
            model: 'Book',
            select: 'title author imagePath'
        }
    }).lean<PopulatedLoan[]>();

    return loans.map((loan) => {
        const copy = loan.copyId;
        const book = copy?.bookId;

        return {
            id: loan._id.toString(),
            userId: loan.userId.toString(),
            copyId: copy?._id?.toString() || '',
            bookId: book?._id?.toString() || '',
            imagePath: book?.imagePath,
            title: book?.title || 'Unknown',
            author: book?.author || 'Unknown',
            dueDate: loan.dueDate,
            returned: loan.returned
        };
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