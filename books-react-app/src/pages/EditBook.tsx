import globalStyles from '@/assets/scss/globalStyles.module.scss';
import BookForm from '@/components/BookForm';
import Message from '@/components/Message';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { getMessage } from '@/utils/handleMessage';
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useParams } from 'react-router-dom';

const BookEdit = () => {
    const { id } = useParams();
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const { fetchBook, editBook } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    useEffect(() => {
        if (id) fetchBook(id);
    }, []);

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <BookForm saveBook={editBook} editing={true} />
            </>
    );
};

export default BookEdit;

