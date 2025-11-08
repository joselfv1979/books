import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { closeModal, getModal } from '../store/uiSlice';

const DeleteModal = () => {

    const dispatch = useDispatch();
    const { deleteBook, deleteUser } = useAppDispatch();
    const { isOpen, type, data } = useAppSelector(getModal);

    if (!isOpen || type !== "CONFIRM_DELETE") return null;

    const handleConfirm = () => {
        if (data.entity === "user") {
            deleteUser(data.id);
        } else if (data.entity === "book") {
            deleteBook(data.id);
        }
        dispatch(closeModal());
    };

    const handleClose = () => dispatch(closeModal());

    return (
        <Modal size="sm" show={isOpen} onHide={handleClose} data-testid="delete-modal">
            <Modal.Header closeButton>
                <Modal.Title>{`Delete ${data.entity}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center fw-bold">
                Are you sure?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-around">
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm} data-testid="delete-item-btn">
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
