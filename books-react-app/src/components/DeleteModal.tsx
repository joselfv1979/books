import { useAppDispatch } from 'hooks/redux-hooks';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { Book } from 'types/Book';
import { User } from 'types/User';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';

export type Props = {
    book?: Book;
    user?: User;
};

const DeleteModal = ({ book, user }: Props) => {
    const { showDeleteModal, setShowDeleteModal } = useDeleteModalContext();
    const { deleteUser, deleteBook } = useAppDispatch();

    const handleClose = () => setShowDeleteModal(false);

    const deleteItem = () => {

        user && deleteUser(user.id);
        book && deleteBook(book.id);

        setShowDeleteModal(false);
    };

    return (
        <Modal size="sm" show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{book ? 'Delete book' : 'Delete user'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center fw-bold">
                Are you sure?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-around">
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
