import { Dispatch, SetStateAction } from 'react';
import styles from '../assets/scss/bookList.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { Book } from '../types/Book';
import BookCard from './BookCard';
import BookSearchBar from './BookSearchBar';
import PaginationComponent from './Pagination';

type Props = {
    query: { search?: string; page: number; };
    setQuery: Dispatch<SetStateAction<{ search?: string; page: number }>>
}

const BookList = ({ query, setQuery }: Props) => {

    const { books } = useAppSelector((state) => state.book);

    const renderBookCard = (book: Book) => (
        <div key={book.id} data-testid="book-card">
            <BookCard book={book} styles={styles} />
        </div>
    );

    return (
        <>
            <h1 className={styles.bookListTitle}>Library</h1>
            <BookSearchBar query={query} setQuery={setQuery} />
            {books.length > 0 ?
                <>
                    <div className={styles.bookList} data-testid="book-list">
                        {books.map(renderBookCard)}
                    </div>
                    <PaginationComponent setQuery={setQuery} />
                </>
                : <h2 className={styles.noBookTitle}>No books found</h2>
            }
        </>

    );
};

export default BookList;

