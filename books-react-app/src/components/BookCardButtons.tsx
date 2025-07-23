import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { useAppSelector } from '../hooks/redux-hooks';
import { isAdmin } from '../store/userSlice';

type Props = {
    bookId: string;
};

const BookCardButtons = ({ bookId }: Props) => {

    const navigate = useNavigate();
    const admin = useAppSelector(isAdmin);
    const { setItemId, setShowDeleteModal } = useDeleteModalContext();

    const handleEdit = () => navigate(`/book-edit/${bookId}`)

    const handleView = () => navigate(`/book/${bookId}`);

    const handleDelete = () => {
        setShowDeleteModal(true);
        setItemId(bookId);
    };

    return (
        <>
            {admin ? (
                <>
                    <Button variant="primary" className='p3' data-testid="edit-book-btn" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button variant="danger" className='p3' data-testid="delete-book-btn" onClick={handleDelete}>
                        Delete
                    </Button>
                </>
            ) : (
                <Button variant="primary" className='p3' data-testid="view-book-btn" onClick={handleView}>
                    View
                </Button>
            )}
        </>
    );
};

export default BookCardButtons;