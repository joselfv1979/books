import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { Spinner } from 'react-bootstrap';
import { deleteUser, getUsers, removeUserError, removeUserMessage } from '../redux/actionCreators/user';
import UserList from '../components/UserList';
import Message from '../components/Message';
import globalStyles from '../scss/globalStyles.module.scss';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import DeleteModal from '../components/DeleteModal';

const Users = () => {
    const { status, error, message, users } = useTypedSelector((state) => state.users);

    const note = error || message;

    const dispatch = useDispatch();

    const { user, showDeleteModal } = useDeleteModalContext();

    useEffect(() => {
        if (status === 'idle') dispatch(getUsers());
    }, []);

    const removeUser = () => {
        dispatch(deleteUser(user));
        setTimeout(() => dispatch(removeUserMessage()), 2000);
    };

    const cancelMessage = () => {
        if (error) dispatch(removeUserError());
        if (message) dispatch(removeUserMessage());
    };
    return (
        <>
            {status === 'loading' && <Spinner animation="border" className={globalStyles.spinner} />}
            {note && <Message error={error} success={message} cancelMessage={cancelMessage} />}
            {users && <UserList users={users} />}
            {showDeleteModal && <DeleteModal removeUser={removeUser} />}
        </>
    );
};

export default Users;
