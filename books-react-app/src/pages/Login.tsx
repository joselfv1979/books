import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { Spinner } from 'react-bootstrap';
import styles from '../assets/scss/login.module.scss';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { AuthRequest } from '../types/User';
import { getMessage } from 'utils/handleMessage';
import Message from 'components/Message';


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
            : <div className={styles.loginContainer}>
                {message && <Message message={message} />}
                <LoginForm loginUser={loginUser} />
            </div>
    );
};

export default Login;

