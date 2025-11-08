export interface Loan {
    id: string;
    userId: string;
    copyId: string;
    issueDate: string;
    dueDate: string;
    returned: boolean;
}

export interface LoanState {
    loans: Loan[];
    loan: Loan | null;
}

export interface LoanRequest {
    userId: string;
    bookId: string;
}