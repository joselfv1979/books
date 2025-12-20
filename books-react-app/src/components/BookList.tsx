import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@/hooks/redux-hooks';
import BookCard from './BookCard';
import BookSearchBar from './BookSearchBar';
import PaginationComponent from './Pagination';

type Props = {
    query: { search?: string; page: number; };
    setQuery: Dispatch<SetStateAction<{ search?: string; page: number }>>
}

const BookList = ({ query, setQuery }: Props) => {

    const { books } = useAppSelector((state) => state.book);

    return (
        <>
            <BookSearchBar query={query} setQuery={setQuery} />
            {books.length > 0 ?
                <>
                    <div>
                        {books.map((book) => (
                            <div key={book.id}>
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                    <PaginationComponent setQuery={setQuery} />
                </>
                : <h2>No books found</h2>
            }
        </>

    );
};

export default BookList;

