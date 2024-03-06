import BookCard from './BookCard';
import { Row, Col } from 'react-bootstrap';
import styles from '../assets/scss/bookList.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { Book } from '../types/Book';

const BookList = () => {
    const { books } = useAppSelector((state) => state.book);

    return (
        books.length > 0 ?
            <div className='p-3'>
                <h1>Books</h1>
                <Row>
                    {books.map((book: Book) => {
                        return (
                            <Col key={book.id} sm={4} data-testid="book-card">
                                <BookCard book={book} styles={styles} />
                            </Col>
                        );
                    })}
                </Row>
            </div>
            : <div className='h-100 d-flex justify-content-center align-items-center pb-5'>
                <h2 className='mb-5 text-center text-dark'>No books found</h2>
            </div>
    );
};

export default BookList;

