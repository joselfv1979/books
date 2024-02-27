import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import Message from '../components/Message';
import BookForm from '../components/BookForm';
import Spinner from 'react-bootstrap/esm/Spinner';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { getMessage } from '../utils/handleMessage';
import { editBook, fetchBook, removeBookMessage } from '../store/bookActions';


const BookEdit = () => {
    const { id } = useParams();

    const { loading, errorMessage, successMessage, book } = useAppSelector((state) => state.book);
    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (id) dispatch(fetchBook(id));
    }, []);

    const saveBook = async (values: FormData) => {
        dispatch(editBook(values));
        setTimeout(() => dispatch(removeBookMessage()), 1500);
    };

    const cancelMessage = () => {
        if (message) dispatch(removeBookMessage());
    };

    return (
        <>
            {loading && <Spinner animation="border" className={globalStyles.spinner} />}
            {message && <Message message={message} cancelMessage={cancelMessage} />}
            {book && <BookForm saveBook={saveBook} />}
        </>
    );
};

export default BookEdit;

