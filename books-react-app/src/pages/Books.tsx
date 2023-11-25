import React, { useEffect } from 'react';
import BookList from '../components/BookList';
import { getBooks, deleteBook, removeBookError, removeBookMessage } from '../redux/actionCreators/book';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypeSelector';
import Message from '../components/Message';
import { Container, Spinner } from 'react-bootstrap';
import globalStyles from '../scss/globalStyles.module.scss';
import DeleteModal from '../components/DeleteModal';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';

const Books = () => {
    const { books, status, message, error } = useTypedSelector((state) => state.books);

    const note = error || message;

    const { book, showDeleteModal } = useDeleteModalContext();

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') dispatch(getBooks());
    }, []);

    const removeBook = () => {
        dispatch(deleteBook(book));
        setTimeout(() => dispatch(removeBookMessage()), 1500);
    };

    const cancelMessage = () => {
        if (error) dispatch(removeBookError());
        if (message) dispatch(removeBookMessage());
    };

    return (
        <Container>
            {status === 'loading' && <Spinner animation="border" className={globalStyles.spinner} />}
            {note && <Message error={error} success={message} cancelMessage={cancelMessage} />}
            {books && <BookList />}
            {showDeleteModal && <DeleteModal removeBook={removeBook} />}
        </Container>
    );
};

export default Books;
