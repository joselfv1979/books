import { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Spinner } from 'react-bootstrap';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import DeleteModal from '../components/DeleteModal';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';

const Books = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const { getBooks } = useAppDispatch();
    const message = getMessage(errorMessage, successMessage);

    const { book, showDeleteModal } = useDeleteModalContext();

    const [query, setQuery] = useState<{
        search?: string, page: number
    }>({ page: 1 });

    useEffect(() => {
        getBooks(query)
    }, [query.page]);

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                {showDeleteModal && <DeleteModal book={book} />}
                <BookList query={query} setQuery={setQuery} />
            </>
    );
};

export default Books;
