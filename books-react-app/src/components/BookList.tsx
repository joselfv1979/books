import { Dispatch, SetStateAction } from 'react';
import styles from '../assets/scss/books.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
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
            <h2 className="text-center mb-4">Listado de Libros</h2>
            <BookSearchBar query={query} setQuery={setQuery} />
            {books.length > 0 ?
                <>
                    <div className={styles.bookList}>
                        {books.map((book) => (
                            <div key={book.id}>
                                <BookCard book={book} styles={styles} />
                            </div>
                        ))}
                    </div>
                    <PaginationComponent setQuery={setQuery} />
                </>
                : <h2 className={styles.noBookTitle}>No books found</h2>
            }
        </>

    );
};

export default BookList;

