import { useEffect } from 'react';
import DeleteModal from '../components/DeleteModal';
import { Loader } from '../components/Loader';
import Message from '../components/Message';
import UserList from '../components/UserList';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';

const Users = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { fetchUsers } = useAppDispatch();
    const message = getMessage(errorMessage, successMessage);
    const { user, showDeleteModal } = useDeleteModalContext();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        loading ? <Loader />
            : <>
                {showDeleteModal && <DeleteModal user={user} />}
                {message && <Message message={message} />}
                <UserList />
            </>
    );
};

export default Users;
