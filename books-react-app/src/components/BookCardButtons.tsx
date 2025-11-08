import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { openModal } from "../store/uiSlice";
import { isAdmin } from '../store/userSlice';
import { ROUTES } from '../utils/constants';

type Props = {
    bookId: string;
};

const BookCardButtons = ({ bookId }: Props) => {

    const navigate = useNavigate();
    const admin = useAppSelector(isAdmin);
    const dispatch = useDispatch();

    const handleEdit = () => navigate(`${ROUTES.EDIT_BOOK}/${bookId}`)

    const handleView = () => navigate(`${ROUTES.SINGLE_BOOK}/${bookId}`);
    // const handleView = () => navigate(`/book/${bookId}`);

    const handleDelete = () => {
        dispatch(
            openModal({
                type: "CONFIRM_DELETE",
                data: { entity: "book", id: bookId },
            })
        );
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