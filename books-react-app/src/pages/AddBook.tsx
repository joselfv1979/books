import React from 'react';
import { addBook, removeBookError, removeBookMessage } from '../redux/actionCreators/book';
import { useDispatch } from 'react-redux';
import Message from '../components/Message';
import { useTypedSelector } from '../hooks/useTypeSelector';
import BookForm from '../components/BookForm';
import Spinner from 'react-bootstrap/esm/Spinner';
import globalStyles from '../scss/globalStyles.module.scss';

const AddBook = () => {
    const { error, message, status } = useTypedSelector((state) => state.books);

    const note = error || message;

    const dispatch = useDispatch();

    const saveBook = async (data: FormData) => {
        dispatch(addBook(data));
        setTimeout(() => dispatch(removeBookMessage()), 1500);
    };

    function cancelMessage() {
        if (error) dispatch(removeBookError());
        if (message) dispatch(removeBookMessage());
    }

    return (
        <>
            {status === 'loading' ? (
                <Spinner animation="border" className={globalStyles.spinner} />
            ) : (
                <>
                    {note && <Message error={error} success={message} cancelMessage={cancelMessage} />}
                    <BookForm saveBook={saveBook} />
                </>
            )}
        </>
    );
};

export default AddBook;
