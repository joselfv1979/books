import { AppThunk } from ".";
import { borrowCopy, getLoansByUser } from "../services/loans";
import { LoanRequest } from "../types/Loan";
import { createLoan, setUserLoans } from "./loanSlice";
import { showNotification } from "./notificationSlice";
import { setLoading } from "./uiSlice";

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

export { addLoan, fetchLoansByUser };

