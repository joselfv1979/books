import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Breadcrumb, Spinner } from 'react-bootstrap';
import { ArrowLeftSquareFill } from 'react-bootstrap-icons';
import BookCard from '../components/BookCard';
import bookStyles from '../assets/scss/book.module.scss';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { fetchBook } = useAppDispatch();
    const { book, loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const message = getMessage(errorMessage, successMessage);

    useEffect(() => {
        if (id) fetchBook(id);
    }, []);

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <Container>
                {message && <Message message={message} />}
                <Breadcrumb.Item href="#" className='mt-3'>
                    <ArrowLeftSquareFill size={26} onClick={() => navigate('/books')} />
                </Breadcrumb.Item>
                {book && <BookCard book={book} styles={bookStyles} />}
            </Container>
    );
};

export default Book;
