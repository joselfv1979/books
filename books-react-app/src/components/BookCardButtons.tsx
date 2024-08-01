import styles from '@/assets/scss/bookList.module.scss';
import { useDeleteModalContext } from '@/context/deleteModal/DeleteModalContext';
import { useAppSelector } from '@/hooks/redux-hooks';
import { isAdmin } from '@/store/userSlice';
import { Book } from '@/types/Book';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
        admin ? <div className={styles.buttonGroup}>
            <Button variant="primary" onClick={() => navigate(`/book-edit/${book.id}`)}>
                Edit
            </Button>

            <Button variant="danger" onClick={deleteBook}>
                Delete
            </Button>
        </div>
            : <Button variant="primary" onClick={() => navigate(`/book/${book.id}`)}>
                See more
            </Button>
    );
};

export default BookCardButtons;
