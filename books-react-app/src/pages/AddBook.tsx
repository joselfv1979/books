
import BookForm from '../components/BookForm';
import { Loader } from '../components/Loader';
import Message from '../components/Message';
import { initialBook } from '../data/ConstantUtils';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';

const AddBook = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const { addBook } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    return (
        loading ? <Loader />
            : <>
                {message && <Message message={message} />}
                <BookForm book={initialBook} saveBook={addBook} editing={false} />
            </>
    );
};

export default AddBook;
