import globalStyles from '@/assets/scss/globalStyles.module.scss';
import Message from '@/components/Message';
import UserForm from '@/components/UserForm';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { getMessage } from '@/utils/handleMessage';
import { Spinner } from 'react-bootstrap';


const AddUser = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { addUser } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    return (
        loading ? <Spinner data-testid="loader" animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <UserForm saveUser={addUser} />
            </>


    );
};

export default AddUser;