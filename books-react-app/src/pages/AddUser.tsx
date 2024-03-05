import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import Message from '../components/Message';
import UserForm from '../components/UserForm';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { Spinner } from 'react-bootstrap';
import { getMessage } from '../utils/handleMessage';
import { User } from '../types/User';
import { addUser, removeUserMessage } from '../store/userActions';

const AddUser = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);

    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    const saveUser = async (data: User) => {
        dispatch(addUser(data));
    };

    const cancelMessage = () => {
        dispatch(removeUserMessage());
    };

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} cancelMessage={cancelMessage} />}
                <UserForm saveUser={saveUser} />
            </>
    );
};

export default AddUser;