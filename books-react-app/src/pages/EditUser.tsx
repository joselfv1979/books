import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { editUser, fetchUser, removeUserError, removeUserMessage } from '../redux/actionCreators/user';
import Message from '../components/Message';
import UserForm from '../components/UserForm';
import { Spinner } from 'react-bootstrap';
import globalStyles from '../scss/globalStyles.module.scss';
import { useParams } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();

    const { error, message, status, user } = useTypedSelector((state) => state.users);
    const note = error || message;

    useEffect(() => {
        if (id) dispatch(fetchUser(id));
    }, []);

    const dispatch = useDispatch();

    const saveUser = async (data: FormData) => {
        if (dispatch(editUser(data))) {
            setTimeout(() => dispatch(removeUserMessage()), 2000);
        }
    };

    const cancelMessage = () => {
        if (error) dispatch(removeUserError());
        if (message) dispatch(removeUserMessage());
    };

    return (
        <>
            {status === 'loading' && <Spinner animation="border" className={globalStyles.spinner} />}
            {note && <Message error={error} success={message} cancelMessage={cancelMessage} />}
            {user && <UserForm saveUser={saveUser} />}
        </>
    );
};

export default EditUser;
