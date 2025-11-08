import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { isAdmin } from '../store/userSlice';
import { ROUTES } from '../utils/constants';

const AdminRoute = () => {
    const admin = useAppSelector(isAdmin);
    return admin ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default AdminRoute;
