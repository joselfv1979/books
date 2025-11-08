import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookDetail from '../components/BookDetail';
import BookSearchBar from '../components/BookSearchBar';
import Breadcrumb from '../components/BreadCrumb';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { ROUTES } from '../utils/constants';

interface Query {
    search?: string;
    page: number;
}

//TODO: Add messages, loading states, error handling, etc.
// Check loan data returned
// Create view for user's loans and returns
const Book = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { fetchBook, addLoan } = useAppDispatch();
    const { book } = useAppSelector((state) => state.book);
    const { authUser } = useAppSelector((state) => state.user);

    const [query, setQuery] = useState<Query>({ page: 1 });

    const handleLoan = () => {

        if (!authUser) return navigate(ROUTES.LOGIN);

        if (!book) return;

        addLoan({ userId: authUser.id, bookId: book.id });
    };

    useEffect(() => {
        if (id) fetchBook(id);
    }, [id]);

    return (
        <>
            <BookSearchBar query={query} setQuery={setQuery} />
            <>
                {<Breadcrumb currentPage="Full display" previousPage="Library" path={ROUTES.ALL_BOOKS} />}

                {book && <BookDetail book={book} handleLoan={handleLoan} />}
            </>
        </>
    );
};

export default Book;
