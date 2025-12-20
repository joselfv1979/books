import { AppThunk } from "..";
import { borrowCopy, getLoansByUser, returnLoan } from "../../services/loans";
import { LoanRequest } from "../../types/Loan";
import { showNotification } from "../notification";
import { setLoading } from "../ui";
import { loanActions } from "./slice";

const { createLoan, returnLoanAction, setUserLoans } = loanActions;

const addLoan = ({ userId, bookId }: LoanRequest): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await borrowCopy(userId, bookId);

    if (response.success) {
        dispatch(createLoan(response.value));
        dispatch(showNotification({ type: 'success', message: 'Loan created successfully' }));
    } else {
        dispatch(showNotification({ type: 'error', message: `Loan creation failed: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

const fetchLoansByUser = (userId: string): AppThunk => async (dispatch) => {
    dispatch(setLoading(true));

    const response = await getLoansByUser(userId);

    if (response.success) {
        dispatch(setUserLoans(response.value));
    } else {
        dispatch(showNotification({ type: 'error', message: `Failed to fetch loans: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

const returnLoanThunk = (loanId: string): AppThunk => async (dispatch) => {
    dispatch(setLoading(true));

    const response = await returnLoan(loanId);

    if (response.success) {
        dispatch(returnLoanAction(loanId));
        dispatch(showNotification({ type: 'success', message: 'Book returned successfully' }));
    } else {
        dispatch(showNotification({ type: 'error', message: `Failed to return book: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

export { addLoan, fetchLoansByUser, returnLoanThunk };
