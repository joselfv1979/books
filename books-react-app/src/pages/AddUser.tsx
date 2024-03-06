import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import UserForm from '../components/UserForm';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { Spinner } from 'react-bootstrap';
import { User } from '../types/User';
import { addUser } from '../store/userActions';
import Message from 'components/Message';
import { getMessage } from 'utils/handleMessage';

const AddUser = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    const saveUser = async (data: User) => {
        dispatch(addUser(data));
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