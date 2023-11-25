import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import styles from '../scss/globalStyles.module.scss';

export type Props = {
    removeBook?: () => void;
    removeUser?: () => void;
};

const DeleteModal = ({ removeBook, removeUser }: Props) => {
    const { showDeleteModal, setShowDeleteModal } = useDeleteModalContext();

    const handleClose = () => setShowDeleteModal(false);

    const deleteItem = () => {
        removeBook ? removeBook() : null;
        removeUser ? removeUser() : null;
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
