import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Spinner } from 'react-bootstrap';
import UserList from '../components/UserList';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import DeleteModal from '../components/DeleteModal';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';


const Users = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { fetchUsers } = useAppDispatch();
    const message = getMessage(errorMessage, successMessage);
    const { user, showDeleteModal } = useDeleteModalContext();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {showDeleteModal && <DeleteModal user={user} />}
                {message && <Message message={message} />}
                <UserList />
            </>
    );
};

export default Users;
