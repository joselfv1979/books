import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { Auth } from '../types/Auth';
import { Container, Spinner } from 'react-bootstrap';
import Message from '../components/Message';
import styles from '../scss/login.module.scss';
import globalStyles from '../scss/globalStyles.module.scss';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { login, removeUserError } from '../redux/actionCreators/user';
import { useDispatch } from 'react-redux';

const Login = () => {
    const { status, error, loggedUser } = useTypedSelector((state) => state.users);

    const dispatch = useDispatch();

    const loginUser = (userData: Auth) => {
        dispatch(login(userData));
    };

    const cancelMessage = () => {
        dispatch(removeUserError());
    };

    if (loggedUser) return <Navigate to="/" />;

    return (
        <>
            {status === 'loading' ? (
                <Spinner animation="border" className={globalStyles.spinner} />
            ) : (
                <Container className={styles.loginContainer}>
                    {error && <Message error={error} cancelMessage={cancelMessage} />}
                    <LoginForm loginUser={loginUser} />
                </Container>
            )}
        </>
    );
};

export default Login;
