export interface Loan {
    id: string;
    userId: string;
    copyId: string;
    issueDate: string;
    dueDate: string;
    returned: boolean;
}

export interface LoanWithBookInfo extends Loan {
    bookId: string;
    imagePath?: string;
    title?: string;
    author?: string;
}

export interface LoanState {
    loans: LoanWithBookInfo[];
    loan: Loan | null;
}

export interface LoanRequest {
    userId: string;
    bookId: string;
}