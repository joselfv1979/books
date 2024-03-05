import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import styles from '../assets/scss/globalStyles.module.scss';
import { Book } from 'types/Book';
import { deleteBook, removeBookMessage } from 'store/bookActions';
import { useAppDispatch } from 'hooks/redux-hooks';
import { User } from 'types/User';
import { deleteUser, removeUserMessage } from 'store/userActions';

export type Props = {
    book?: Book;
    user?: User;
};

const DeleteModal = ({ book, user }: Props) => {
    const { showDeleteModal, setShowDeleteModal } = useDeleteModalContext();

    const handleClose = () => setShowDeleteModal(false);
    const dispatch = useAppDispatch();

    const deleteItem = () => {
        if (user) {
            dispatch(deleteUser(user.id));
            dispatch(removeUserMessage());
        }
        if (book) {
            dispatch(deleteBook(book.id));
            dispatch(removeBookMessage());
        }
        setShowDeleteModal(false);
    };

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
