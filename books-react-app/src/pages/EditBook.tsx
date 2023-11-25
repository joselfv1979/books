import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { editBook, fetchBook, removeBookError, removeBookMessage } from '../redux/actionCreators/book';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypeSelector';
import Message from '../components/Message';
import BookForm from '../components/BookForm';
import Spinner from 'react-bootstrap/esm/Spinner';
import globalStyles from '../scss/globalStyles.module.scss';

const BookEdit = () => {
    const { id } = useParams();

    const { error, message, status, book } = useTypedSelector((state) => state.books);
    const note = error || message;

    useEffect(() => {
        if (id) dispatch(fetchBook(id));
    }, []);

    const dispatch = useDispatch();

    const saveBook = async (values: FormData) => {
        dispatch(editBook(values));
        setTimeout(() => dispatch(removeBookMessage()), 1500);
    };

    const cancelMessage = () => {
        if (error) dispatch(removeBookError());
        if (message) dispatch(removeBookMessage());
    };

    return (
        <>
            {status === 'loading' && <Spinner animation="border" className={globalStyles.spinner} />}
            {note && <Message error={error} success={message} cancelMessage={cancelMessage} />}
            {book && <BookForm saveBook={saveBook} />}
        </>
    );
};

export default BookEdit;
