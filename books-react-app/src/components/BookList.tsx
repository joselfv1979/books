import BookCard from './BookCard';
import { Row, Col } from 'react-bootstrap';
import styles from '../assets/scss/bookList.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { Book } from '../types/Book';
import BookSearchBar from './BookSearchBar';
import PaginationComponent from './Pagination';
import { Dispatch, SetStateAction } from 'react';

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
                <div className='p-3'>
                    <Row>
                        {books.map((book: Book) => {
                            return (
                                <Col key={book.id} sm={4} data-testid="book-card">
                                    <BookCard book={book} styles={styles} />
                                </Col>
                            );
                        })}
                    </Row>
                    <PaginationComponent setQuery={setQuery} />
                </div>
                : <div className='h-100 d-flex justify-content-center align-items-center pb-5'>
                    <h2 className='mb-5 text-center text-dark'>No books found</h2>
                </div>
            }
        </>

    );
};

export default BookList;

