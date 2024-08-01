import { useAppSelector } from '@/hooks/redux-hooks';
import { isAdmin } from '@/store/userSlice';
import { Navigate } from 'react-router-dom';

type Props = {
    children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
    const admin = useAppSelector(isAdmin);

    return admin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
