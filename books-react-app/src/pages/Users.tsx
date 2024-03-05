import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Spinner } from 'react-bootstrap';
import UserList from '../components/UserList';
import Message from '../components/Message';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import DeleteModal from '../components/DeleteModal';
import { getMessage } from '../utils/handleMessage';
import { fetchUsers } from '../store/userActions';


const Users = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);

    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    const { user, showDeleteModal } = useDeleteModalContext();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const cancelMessage = () => {
        if (message) console.log(message);
    };

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} cancelMessage={cancelMessage} />}
                {showDeleteModal && <DeleteModal user={user} />}
                <UserList />
            </>
    );
};

export default Users;
