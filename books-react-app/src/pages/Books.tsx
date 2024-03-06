import { useEffect } from 'react';
import BookList from '../components/BookList';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Spinner } from 'react-bootstrap';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import DeleteModal from '../components/DeleteModal';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { getBooks } from '../store/bookActions';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';


const Books = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const message = getMessage(errorMessage, successMessage);

    const { book, showDeleteModal } = useDeleteModalContext();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                {showDeleteModal && <DeleteModal book={book} />}
                <BookList />
            </>
    );
};

export default Books;
