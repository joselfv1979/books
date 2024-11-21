import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { AppThunk } from '../store';

type Props = {
    id: string;
    item: string;
    deleteItem: (id: string) => AppThunk
};

const DeleteModal = ({ id, item, deleteItem }: Props) => {
    const { showDeleteModal, setShowDeleteModal } = useDeleteModalContext();

    const handleClose = () => setShowDeleteModal(false);

    const removeItem = () => {
        deleteItem(id);
        setShowDeleteModal(false);
    };

    return (
        <Modal size="sm" show={showDeleteModal} onHide={handleClose} data-testid="delete-modal">
            <Modal.Header closeButton>
                <Modal.Title>{`Delete ${item}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center fw-bold">
                Are you sure?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-around">
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={removeItem} data-testid="delete-item-btn">
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
