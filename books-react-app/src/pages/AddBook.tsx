
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import BookForm from '../components/BookForm';
import Spinner from 'react-bootstrap/esm/Spinner';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';
import { Book } from 'types/Book';

const AddBook = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const { addBook } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    const saveBook = async (data: Book) => {
        addBook(data);
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
