import BookList from '@/components/BookList';
import DeleteModal from '@/components/DeleteModal';
import { Loader } from '@/components/Loader';
import Message from '@/components/Message';
import { useDeleteModalContext } from '@/context/deleteModal/DeleteModalContext';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { getMessage } from '@/utils/handleMessage';
import { useEffect, useState } from 'react';

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
        loading ? <Loader />
            : <>
                {message && <Message message={message} />}
                {showDeleteModal && <DeleteModal book={book} />}
                <BookList query={query} setQuery={setQuery} />
            </>
    );
};

export default Books;
