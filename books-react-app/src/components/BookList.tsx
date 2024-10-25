import { Dispatch, SetStateAction } from 'react';
import { Col, Row } from 'react-bootstrap';
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

    return (
        <>
            <h1 className='text-center mt-3'>Library</h1>
            <BookSearchBar query={query} setQuery={setQuery} />
            {books.length > 0 ?
                <div className='h-75 p-3' data-testid="book-list">
                    <Row>
                        {books.map((book: Book) => {
                            return (
                                <Col key={book.id} sm={3} data-testid="book-card">
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

