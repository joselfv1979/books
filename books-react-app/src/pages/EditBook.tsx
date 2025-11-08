import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

const BookEdit = () => {
    const { id } = useParams();
    const { book } = useAppSelector((state) => state.book);
    const { fetchBook, editBook, clearCurrentBook } = useAppDispatch();

    useEffect(() => {
        clearCurrentBook();
        if (id) fetchBook(id);
    }, [id]);

    return (
        book && <BookForm book={book} saveBook={editBook} editing={true} />
    );
};

export default BookEdit;

