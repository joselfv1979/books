
import globalStyles from '@/assets/scss/globalStyles.module.scss';
import BookForm from '@/components/BookForm';
import Message from '@/components/Message';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { getMessage } from '@/utils/handleMessage';
import Spinner from 'react-bootstrap/esm/Spinner';

const AddBook = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const { addBook } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <BookForm saveBook={addBook} />
            </>
    );
};

export default AddBook;
