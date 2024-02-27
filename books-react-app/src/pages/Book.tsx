import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { Container, Breadcrumb, Spinner } from 'react-bootstrap';
import { ArrowLeftSquareFill } from 'react-bootstrap-icons';
import BookCard from '../components/BookCard';
import styles from '../assets/scss/book.module.scss';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';
import { fetchBook, removeBookMessage } from '../store/bookActions';
import library from './../assets/library.jpg';


const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { books, loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const book = books[0];
    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) dispatch(fetchBook(id));
    }, []);

    const cancelMessage = () => {
        dispatch(removeBookMessage());
    };

    const image = book.imagePath ? `${process.env.REACT_APP_API_URL}/${book.imagePath}` : library;
    console.log('PAGE image', image);

    return (
        <>
            {loading ? (
                <Spinner animation="border" className={globalStyles.spinner} />
            ) : (
                <Container>
                    {message && <Message message={message} cancelMessage={cancelMessage} />}
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
