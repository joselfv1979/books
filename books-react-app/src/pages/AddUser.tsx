import UserForm from '../components/UserForm';
import { initialUser } from '../data/ConstantUtils';
import { useAppDispatch } from '../hooks/redux-hooks';

const AddUser = () => {
    const { addUser } = useAppDispatch();

    return (
        <UserForm user={initialUser} saveUser={addUser} register={true} />
    );
};

export default AddUser;