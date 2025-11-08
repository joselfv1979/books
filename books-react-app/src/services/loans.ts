import axios from 'axios';
import { Loan } from '../types/Loan';
import { Result } from '../types/Result';
import { getHeaders } from '../utils/authHeader';
import { handleError } from '../utils/handleError';

const url = `${import.meta.env.VITE_API_URL}/api/loans`;

// Request to create a new loan (borrow a book copy)
export const borrowCopy = async (userId: string, bookId: string): Promise<Result<Loan, string>> => {
    try {
        console.log('borrowCopy called with', { userId, bookId });

        const { data } = await axios.post(url, { userId, bookId }, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};
// Request to return a loan (return a book copy)
export const returnLoan = async (loanId: string): Promise<Result<Loan, string>> => {
    try {
        const { data } = await axios.put(`${url}/return/${loanId}`, {}, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};
// Request to get all loans by user
export const getLoansByUser = async (userId: string): Promise<Result<Loan[], string>> => {
    try {
        const { data } = await axios.get(`${url}/user/${userId}`, { headers: getHeaders() });
        return { success: true, value: data.data };
    } catch (error) {
        return { success: false, message: handleError(error) };
    }
};