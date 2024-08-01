import globalStyles from '@/assets/scss/globalStyles.module.scss';
import DeleteModal from '@/components/DeleteModal';
import Message from '@/components/Message';
import UserList from '@/components/UserList';
import { useDeleteModalContext } from '@/context/deleteModal/DeleteModalContext';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { getMessage } from '@/utils/handleMessage';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';


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
