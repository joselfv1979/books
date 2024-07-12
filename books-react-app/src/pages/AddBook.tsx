
import Message from 'components/Message';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Book } from 'types/Book';
import { getMessage } from 'utils/handleMessage';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import BookForm from '../components/BookForm';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

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
