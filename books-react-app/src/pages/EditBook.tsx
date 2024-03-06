import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import BookForm from '../components/BookForm';
import Spinner from 'react-bootstrap/esm/Spinner';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { editBook, fetchBook } from '../store/bookActions';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';


const BookEdit = () => {
    const { id } = useParams();
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (id) dispatch(fetchBook(id));
    }, [dispatch]);

    const saveBook = async (values: FormData) => {
        dispatch(editBook(values));
    };

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <BookForm saveBook={saveBook} />
            </>
    );
};

export default BookEdit;

