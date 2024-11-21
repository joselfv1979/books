import { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import DeleteModal from '../components/DeleteModal';
import { Loader } from '../components/Loader';
import Message from '../components/Message';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';

interface Query {
    search?: string;
    page: number;
}

const Books = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const { getBooks, deleteBook } = useAppDispatch();
    const message = getMessage(errorMessage, successMessage);

    const { itemId, showDeleteModal } = useDeleteModalContext();

    const [query, setQuery] = useState<Query>({ page: 1 });

    useEffect(() => {
        getBooks(query)
    }, [query.page]);

    return (
        loading ? <Loader />
            : <>
                {message && <Message message={message} />}
                {showDeleteModal && <DeleteModal id={itemId} item={'book'} deleteItem={deleteBook} />}
                <BookList query={query} setQuery={setQuery} />
            </>
    );
};

export default Books;
