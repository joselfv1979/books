import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { isAdmin } from '../store/userSlice';

const AdminRoute = () => {
    const admin = useAppSelector(isAdmin);
    return admin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
