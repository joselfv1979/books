import React, { useEffect } from 'react';
import BookList from '../components/BookList';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import Message from '../components/Message';
import { Container, Spinner } from 'react-bootstrap';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import DeleteModal from '../components/DeleteModal';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { getMessage } from '../utils/handleMessage';
import { deleteBook, getBooks, removeBookMessage } from '../store/bookActions';


const Books = () => {
    const { books, loading, errorMessage, successMessage } = useAppSelector((state) => state.book);

    const message = getMessage(errorMessage, successMessage);

    const { book, showDeleteModal } = useDeleteModalContext();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, []);

    const removeBook = () => {
        dispatch(deleteBook(book));
        setTimeout(() => dispatch(removeBookMessage()), 1500);
    };

    const cancelMessage = () => {
        if (message) dispatch(removeBookMessage());
    };

    return (
        <Container className='p-3'>
            {loading && <Spinner animation="border" className={globalStyles.spinner} />}
            {message && <Message message={message} cancelMessage={cancelMessage} />}
            {books && <BookList />}
            {showDeleteModal && <DeleteModal removeBook={removeBook} />}
        </Container>
    );
};

export default Books;
