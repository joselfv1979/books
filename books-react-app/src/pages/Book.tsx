import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { Container, Breadcrumb, Spinner } from 'react-bootstrap';
import { ArrowLeftSquareFill } from 'react-bootstrap-icons';
import BookCard from '../components/BookCard';
import styles from '../scss/book.module.scss';
import globalStyles from '../scss/globalStyles.module.scss';
import { useDispatch } from 'react-redux';
import { fetchBook, removeBookError } from '../redux/actionCreators/book';
import { useTypedSelector } from '../hooks/useTypeSelector';

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { books, status, error } = useTypedSelector((state) => state.books);
    const book = books[0];

    useEffect(() => {
        if (id) dispatch(fetchBook(id));
    }, []);

    const dispatch = useDispatch();

    const cancelMessage = () => {
        dispatch(removeBookError());
    };

    return (
        <>
            {status === 'loading' ? (
                <Spinner animation="border" className={globalStyles.spinner} />
            ) : (
                <Container>
                    {error && <Message error={error} cancelMessage={cancelMessage} />}
                    <Breadcrumb.Item href="#">
                        <ArrowLeftSquareFill size={26} onClick={() => navigate('/books')} />
                    </Breadcrumb.Item>
                    <h1>Book</h1>
                    {book && <BookCard book={book} styles={styles} />}
                </Container>
            )}
        </>
    );
};

export default Book;
