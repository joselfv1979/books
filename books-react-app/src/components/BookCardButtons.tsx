import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IBook } from '../types/Book';
import styles from '../scss/bookList.module.scss';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';

type Props = {
    book: IBook;
};

const BookCardButtons = ({ book }: Props) => {
    const navigate = useNavigate();

    const { loggedUser } = useTypedSelector((state) => state.users);
    const isAdmin = loggedUser?.roles?.includes('admin') ? true : false;
    const { setBook, setShowDeleteModal } = useDeleteModalContext();

    const deleteBook = () => {
        setShowDeleteModal(true);
        setBook(book);
    };

    return (
        <>
            {isAdmin ? (
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
