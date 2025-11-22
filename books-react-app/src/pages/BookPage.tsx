import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "../components/BookDetail";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Book } from "../types/Book";

const BookPage: React.FC = () => {
    const { id } = useParams();
    const { fetchBook, addLoan } = useAppDispatch();
    const book = useAppSelector(
        s => (s.book.books as Book[]).find(b => b.id === id) || s.book.book || null
    );
    const uiLoading = useAppSelector(s => s.ui.loading);

    const handleLoan = () => {
        // addLoan(book.id) etc.
    };

    useEffect(() => {
        if (id) fetchBook(id);
    }, [id]);

    return (
        <div className="space-y-6">
            <BookDetail book={book} handleLoan={handleLoan} loading={uiLoading} />
        </div>
    );
};

export default BookPage;