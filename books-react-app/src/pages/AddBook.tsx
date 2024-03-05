
import Message from '../components/Message';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import BookForm from '../components/BookForm';
import Spinner from 'react-bootstrap/esm/Spinner';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { getMessage } from '../utils/handleMessage';
import { addBook, removeBookMessage } from '../store/bookActions';

const AddBook = () => {

    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);

    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    const saveBook = async (data: FormData) => {
        dispatch(addBook(data));
    };

    const cancelMessage = () => {
        dispatch(removeBookMessage());
    }

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} cancelMessage={cancelMessage} />}
                <BookForm saveBook={saveBook} />
            </>
    );
};

export default AddBook;
