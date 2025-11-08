import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Loan, LoanState } from "../types/Loan";

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
        setUserLoans: (state, action: PayloadAction<Loan[]>) => {
            state.loans = action.payload;
        },
        // Action to set a single loan
        setSingleLoan: (state, action: PayloadAction<Loan>) => {
            state.loan = action.payload;
        },
        createLoan: (state, action: PayloadAction<Loan>) => {
            state.loans = [...state.loans, action.payload];
        },
    },
});

export const {
    setUserLoans,
    setSingleLoan,
    createLoan,
} = loanSlice.actions;

export default loanSlice.reducer;
