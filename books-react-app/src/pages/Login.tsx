import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { ROUTES } from '../utils/constants';

const Login = () => {

    const { authUser } = useAppSelector((state) => state.user);
    const { login } = useAppDispatch();

    if (authUser) return <Navigate to={ROUTES.ALL_BOOKS} replace />;

    return <LoginForm login={login} />;
};

Login.displayName = 'Login'; // for debugging

export default Login;

