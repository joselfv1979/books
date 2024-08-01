import globalStyles from '@/assets/scss/globalStyles.module.scss';
import LoginForm from '@/components/LoginForm';
import Message from '@/components/Message';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { getMessage } from '@/utils/handleMessage';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const Login = () => {

    const { loading, authUser, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { login } = useAppDispatch();
    const message = getMessage(errorMessage, successMessage);

    if (authUser) return <Navigate to="/" />;

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <LoginForm login={login} />
            </>
    );
};

export default Login;

