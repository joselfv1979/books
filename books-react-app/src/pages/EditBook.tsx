import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { Loader } from '../components/Loader';
import Message from '../components/Message';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';

const BookEdit = () => {
    const { id } = useParams();
    const { loading, errorMessage, successMessage, book } = useAppSelector((state) => state.book);
    const { fetchBook, editBook } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    useEffect(() => {
        if (id) fetchBook(id);
    }, [id]);

    return (
        loading ? <Loader />
            : <>
                {message && <Message message={message} />}
                <BookForm book={book} saveBook={editBook} editing={true} />
            </>
    );
};

export default BookEdit;

