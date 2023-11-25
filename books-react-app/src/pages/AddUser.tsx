import React from 'react';
import { addUser, removeUserError, removeUserMessage } from '../redux/actionCreators/user';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypeSelector';
import Message from '../components/Message';
import UserForm from '../components/UserForm';

const AddUser = () => {
    const { error, message } = useTypedSelector((state) => state.users);

    const note = error || message;

    const dispatch = useDispatch();

    const saveUser = async (data: FormData) => {
        if (dispatch(addUser(data))) {
            setTimeout(() => dispatch(removeUserMessage()), 2000);
        }
    };

    const cancelMessage = () => {
        if (error) dispatch(removeUserError());
        if (message) dispatch(removeUserMessage());
    };

    return (
        <>
            {note && <Message error={error} success={message} cancelMessage={cancelMessage} />}
            <UserForm saveUser={saveUser} />
        </>
    );
};

export default AddUser;
