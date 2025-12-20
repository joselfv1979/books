import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Loan, LoanState, LoanWithBookInfo } from "@/types/Loan";

const initialState: LoanState = {
    loans: [],
    loan: null,
};

// Reducer functions of loan state
export const loanSlice = createSlice({
    name: "loan",
    initialState: initialState,
    reducers: {
        // Action to set loans
        setUserLoans: (state, action: PayloadAction<LoanWithBookInfo[]>) => {
            state.loans = action.payload;
        },
        // Action to set a single loan
        setSingleLoan: (state, action: PayloadAction<Loan>) => {
            state.loan = action.payload;
        },
        createLoan: (state, action: PayloadAction<LoanWithBookInfo>) => {
            state.loans = [...state.loans, action.payload];
        },
        // Action to mark a loan as returned
        returnLoanAction: (state, action: PayloadAction<string>) => {
            const loanId = action.payload;
            state.loans = state.loans.map(loan => 
                loan.id === loanId ? { ...loan, returned: true } : loan
            );
        },
    },
});

// export const {
//     setUserLoans,
//     setSingleLoan,
//     createLoan,
//     returnLoanAction,
// } = loanSlice.actions;

export const loanActions = loanSlice.actions;

export default loanSlice.reducer;
