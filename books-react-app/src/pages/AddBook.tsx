
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import BookForm from '../components/BookForm';
import Spinner from 'react-bootstrap/esm/Spinner';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { addBook } from '../store/bookActions';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';

const AddBook = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    const saveBook = async (data: FormData) => {
        dispatch(addBook(data));
    };

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <BookForm saveBook={saveBook} />
            </>
    );
};

export default AddBook;
