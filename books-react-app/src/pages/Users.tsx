import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Spinner } from 'react-bootstrap';
import UserList from '../components/UserList';
import Message from '../components/Message';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import DeleteModal from '../components/DeleteModal';
import { getMessage } from '../utils/handleMessage';
import { deleteUser, fetchUsers } from '../store/userActions';


const Users = () => {
    const { loading, errorMessage, successMessage, users } = useAppSelector((state) => state.user);

    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    const { user, showDeleteModal } = useDeleteModalContext();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const removeUser = () => {
        if (user.id) dispatch(deleteUser(user.id));
    };

    const cancelMessage = () => {
        if (message) console.log(message);
    };

    return (
        <>
            {loading && <Spinner animation="border" className={globalStyles.spinner} />}
            {message && <Message message={message} cancelMessage={cancelMessage} />}
            {users && <UserList users={users} />}
            {showDeleteModal && <DeleteModal removeUser={removeUser} />}
        </>
    );
};

export default Users;
