import { Navigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import LoginForm from '../components/LoginForm';
import Message from '../components/Message';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';

const Login = () => {

    const { loading, authUser, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { login } = useAppDispatch();
    const message = getMessage(errorMessage, successMessage);

    if (loading) return <Loader />;
    if (authUser) return <Navigate to="/books" replace />;

    return (
        <>
            {message && <Message message={message} />}
            <LoginForm login={login} />
        </>
    );
};

Login.displayName = 'Login'; // for debugging

export default Login;

