import Message from 'components/Message';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { getMessage } from 'utils/handleMessage';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import LoginForm from '../components/LoginForm';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { AuthRequest } from '../types/User';

const Login = () => {

    const { loading, authUser, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { login } = useAppDispatch();
    const message = getMessage(errorMessage, successMessage);

    const loginUser = (user: AuthRequest) => {
        login(user);
    };

    if (authUser) return <Navigate to="/" />;

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <LoginForm loginUser={loginUser} />
            </>
    );
};

export default Login;

