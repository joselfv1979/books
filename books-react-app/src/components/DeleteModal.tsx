import { useAppDispatch } from 'hooks/redux-hooks';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { Book } from 'types/Book';
import { User } from 'types/User';
import styles from '../assets/scss/globalStyles.module.scss';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';

export type Props = {
    book?: Book;
    user?: User;
};

const DeleteModal = ({ book, user }: Props) => {
    const { showDeleteModal, setShowDeleteModal } = useDeleteModalContext();
    const { deleteUser, removeUserMessage, deleteBook, removeBookMessage } = useAppDispatch();

    const handleClose = () => setShowDeleteModal(false);

    const deleteItem = () => {
        if (user) removeUser(user);
        if (book) removeBook(book);
        setShowDeleteModal(false);
    };

    const removeUser = (user: User) => {
        deleteUser(user.id);
        removeUserMessage();
    }

    const removeBook = (book: Book) => {
        deleteBook(book.id);
        removeBookMessage();
    }

    return (
        <Modal size="sm" show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Book</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalText}>Are you sure?</Modal.Body>
            <Modal.Footer className={styles.modalButtons}>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={deleteItem}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
