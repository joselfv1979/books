import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import UserForm from '../components/UserForm';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { Spinner } from 'react-bootstrap';
import Message from 'components/Message';
import { getMessage } from 'utils/handleMessage';
import { User } from 'types/User';

const AddUser = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { addUser } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    const saveUser = async (data: User) => {
        addUser(data);
    };

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <UserForm saveUser={saveUser} />
            </>


    );
};

export default AddUser;