import { Dispatch, SetStateAction } from 'react';
import styles from '../assets/scss/bookList.module.scss';
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
            <h1 className={styles.bookListTitle}>Library</h1>
            <BookSearchBar query={query} setQuery={setQuery} />
            {books.length > 0 ?
                <>
                    <ul className={styles.bookList} data-testid="book-list">
                        {books.map((book) => (
                            <li key={book.id}>
                                <BookCard book={book} styles={styles} />
                            </li>
                        ))}
                    </ul>
                    <PaginationComponent setQuery={setQuery} />
                </>
                : <h2 className={styles.noBookTitle}>No books found</h2>
            }
        </>

    );
};

export default BookList;

