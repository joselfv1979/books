import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { Container, Spinner } from 'react-bootstrap';
import Message from '../components/Message';
import styles from '../assets/scss/login.module.scss';
import globalStyles from '../assets/scss/globalStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';
import { AuthRequest } from '../types/User';
import { login, removeUserMessage } from '../store/userActions';


const Login = () => {
    const { loading, errorMessage, successMessage, authUser } = useAppSelector((state) => state.user);

    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    const loginUser = (user: AuthRequest) => {
        dispatch(login(user));
    };

    const cancelMessage = () => {
        if (message) {
            dispatch(removeUserMessage());
        }
    };

    if (authUser) return <Navigate to="/" />;

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <Container className={styles.loginContainer}>
                {message && <Message message={message} cancelMessage={cancelMessage} />}
                <LoginForm loginUser={loginUser} />
            </Container>
    );
};

export default Login;

