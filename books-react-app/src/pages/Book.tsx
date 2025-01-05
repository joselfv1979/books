import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../assets/scss/book.module.scss';
import BookCard from '../components/BookCard';
import { BackArrow } from '../components/Icons';
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
                <div className={styles.bookContainer}>
                    <button className={styles.backButton} onClick={() => window.history.back()}>
                        <BackArrow />
                        ALL BOOKS
                    </button>

                    {book && <div className={styles.bookDraft}>
                        <h2 className='text-center'>{book.title}</h2>
                        <BookCard book={book} styles={styles} />
                    </div>}
                </div>
            </>
    );
};

export default Book;
