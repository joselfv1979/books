import React from 'react';
import BookCard from './BookCard';
import { Row, Col } from 'react-bootstrap';
import styles from '../scss/bookList.module.scss';
import { useTypedSelector } from '../hooks/useTypeSelector';

const BookList = () => {
    const { books, status } = useTypedSelector((state) => state.books);
    const noBooks = status === 'succeeded' && books.length === 0;
    return (
        <>
            <h1>Books</h1>
            <Row data-testid="book-list">
                {books.length > 0 &&
                    books.map((book, i) => {
                        return (
                            <Col key={i} sm={4} data-testid="book-card">
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
