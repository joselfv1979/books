import { Loader } from '../components/Loader';
import Message from '../components/Message';
import UserForm from '../components/UserForm';
import { initialUser } from '../data/ConstantUtils';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';


const AddUser = () => {
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { addUser } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    return (
        loading ? <Loader />
            : <>
                {message && <Message message={message} />}
                <UserForm user={initialUser} saveUser={addUser} register={true} />
            </>


    );
};

export default AddUser;