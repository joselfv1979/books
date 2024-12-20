import { useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { ArrowLeftSquareFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import bookStyles from '../assets/scss/book.module.scss';
import BookCard from '../components/BookCard';
import { Loader } from '../components/Loader';
import Message from '../components/Message';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';

const Book = () => {
    const { id } = useParams();

    const { fetchBook } = useAppDispatch();
    const { book, loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const message = getMessage(errorMessage, successMessage);

    useEffect(() => {
        if (id) fetchBook(id);
    }, [id]);

    return (
        loading ? <Loader />
            : <>
                {message && <Message message={message} />}
                <div className={bookStyles.bookContainer}>
                    <Breadcrumb.Item href='/books'>
                        <ArrowLeftSquareFill size={30} />
                        <span className='mx-2 fw-bold'>ALL BOOKS</span>
                    </Breadcrumb.Item>

                    {book && <div className={bookStyles.bookDraft}>
                        <h2 className='text-center'>{book.title}</h2>
                        <BookCard book={book} styles={bookStyles} />
                    </div>}
                </div>
            </>
    );
};

export default Book;
