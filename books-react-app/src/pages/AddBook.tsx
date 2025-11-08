
import BookForm from '../components/BookForm';
import { initialBook } from '../data/ConstantUtils';
import { useAppDispatch } from '../hooks/redux-hooks';

// TODO: Review form attributes

const AddBook = () => {
    const { addBook } = useAppDispatch();

    return (
        <BookForm book={initialBook} saveBook={addBook} editing={false} />
    );
};

export default AddBook;
