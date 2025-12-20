import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookDetail from "@/components/BookDetail";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { ROUTES } from "@/utils/constants";

const BookPage: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    
    const loading = useAppSelector(state => state.ui.loading);
    const book = useAppSelector(state => state.book.book);
    const authUser = useAppSelector(state => state.user.authUser);
    const loans = useAppSelector(state => state.loan.loans);

    const { fetchBook, addLoan, fetchLoansByUser } = useAppDispatch();

    const handleLoan = () => {
        if (!authUser) return navigate(ROUTES.LOGIN);        
        if (!book) return;        
        addLoan({ bookId: book.id, userId: authUser.id });
    };

    useEffect(() => {
        if (id) fetchBook(id);
    }, [id]);

    useEffect(() => {
        if (authUser) fetchLoansByUser(authUser.id);
    }, [authUser]);

    return (
        <div className="space-y-6">
            <BookDetail book={book} loans={loans} handleLoan={handleLoan} loading={loading} />
        </div>
    );
};

export default BookPage;