import BookForm from 'components/BookForm';
import Message from 'components/Message';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useParams } from 'react-router-dom';
import { Book } from 'types/Book';
import { getMessage } from 'utils/handleMessage';
import globalStyles from '../assets/scss/globalStyles.module.scss';

const BookEdit = () => {
    const { id } = useParams();
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const { fetchBook, editBook } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    useEffect(() => {
        if (id) fetchBook(id);
    }, []);

    const saveBook = async (values: Book) => {
        editBook(values);
    };

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <BookForm saveBook={saveBook} editing={true} />
            </>
    );
};

export default BookEdit;

