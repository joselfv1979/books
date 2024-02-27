import React from 'react';
import BookCard from './BookCard';
import { Row, Col } from 'react-bootstrap';
import styles from '../assets/scss/BookList.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { Book } from '../types/Book';

const BookList = () => {
    const { books } = useAppSelector((state) => state.book);
    const noBooks = books.length === 0;
    return (
        <>
            <h1>Books</h1>
            <Row data-testid="book-list">
                {books.length > 0 &&
                    books.map((book: Book) => {
                        return (
                            <Col key={book.id} sm={4} data-testid="book-card">
                                <BookCard book={book} styles={styles} />
                            </Col>
                        );
                    })}
                {noBooks && <p style={{ textAlign: 'center' }}>No books found</p>}
            </Row>
        </>
    );
};

export default BookList;

