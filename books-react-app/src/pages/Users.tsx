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
    const { fetchUsers, deleteUser } = useAppDispatch();
    const message = getMessage(errorMessage, successMessage);
    const { itemId, showDeleteModal } = useDeleteModalContext();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        loading ? <Loader />
            : <>
                {showDeleteModal && <DeleteModal id={itemId} item={'user'} deleteItem={deleteUser} />}
                {message && <Message message={message} />}
                <UserList />
            </>
    );
};

export default Users;
