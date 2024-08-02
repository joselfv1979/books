
import BookForm from '@/components/BookForm';
import { Loader } from '@/components/Loader';
import Message from '@/components/Message';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { getMessage } from '@/utils/handleMessage';

const AddBook = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const { addBook } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    return (
        loading ? <Loader />
            : <>
                {message && <Message message={message} />}
                <BookForm saveBook={addBook} />
            </>
    );
};

export default AddBook;
