import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { ROUTES } from '../utils/constants';

const LoginPage = () => {

    const { authUser } = useAppSelector((state) => state.user);
    const { login } = useAppDispatch();

    if (authUser) return <Navigate to={ROUTES.ALL_BOOKS} replace />;

    return <LoginForm login={login} />;
};

LoginPage.displayName = 'LoginPage'; // for debugging

export default LoginPage;

