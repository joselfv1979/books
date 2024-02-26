import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/Book';
import styles from '../assets/scss/BookList.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { isAdmin } from '../store/userSlice';

type Props = {
    book: Book;
};

const BookCardButtons = ({ book }: Props) => {
    const navigate = useNavigate();

    const admin = useAppSelector(isAdmin);

    const { setBook, setShowDeleteModal } = useDeleteModalContext();

    const deleteBook = () => {
        setShowDeleteModal(true);
        setBook(book);
    };

    return (
        <>
            {admin ? (
                <div className={styles.buttonGroup}>
                    <Button variant="primary" onClick={() => navigate(`/book-edit/${book.id}`)}>
                        Edit
                    </Button>

                    <Button variant="danger" onClick={deleteBook}>
                        Delete
                    </Button>
                </div>
            ) : (
                <Button variant="primary" onClick={() => navigate(`/book/${book.id}`)}>
                    See more
                </Button>
            )}
        </>
    );
};

export default BookCardButtons;
