import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import BookForm from '../components/BookForm';
import Spinner from 'react-bootstrap/esm/Spinner';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { editBook, fetchBook } from '../store/bookActions';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';
import { Book } from 'types/Book';

const BookEdit = () => {
    const { id } = useParams();
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    useEffect(() => {

        if (id) dispatch(fetchBook(id));
    }, [dispatch]);

    const saveBook = async (values: Book) => {
        dispatch(editBook(values));
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

