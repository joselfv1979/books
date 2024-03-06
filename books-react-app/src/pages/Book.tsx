import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Breadcrumb, Spinner } from 'react-bootstrap';
import { ArrowLeftSquareFill } from 'react-bootstrap-icons';
import BookCard from '../components/BookCard';
import styles from '../assets/scss/book.module.scss';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { fetchBook } from '../store/bookActions';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { book, loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) dispatch(fetchBook(id));
    }, [dispatch]);

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <Container>
                {message && <Message message={message} />}
                <Breadcrumb.Item href="#">
                    <ArrowLeftSquareFill size={26} onClick={() => navigate('/books')} />
                </Breadcrumb.Item>
                <h1>Book</h1>
                {book && <BookCard book={book} styles={styles} />}
            </Container>
    );
};

export default Book;
