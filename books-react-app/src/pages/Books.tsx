import { useEffect } from 'react';
import BookList from '../components/BookList';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import Message from '../components/Message';
import { Spinner } from 'react-bootstrap';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import DeleteModal from '../components/DeleteModal';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { getMessage } from '../utils/handleMessage';
import { getBooks, removeBookMessage } from '../store/bookActions';


const Books = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);

    const message = getMessage(errorMessage, successMessage);

    const { book, showDeleteModal } = useDeleteModalContext();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    const cancelMessage = () => {
        if (message) dispatch(removeBookMessage());
    };

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} cancelMessage={cancelMessage} />}
                {showDeleteModal && <DeleteModal book={book} />}
                <BookList />
            </>
    );
};

export default Books;
