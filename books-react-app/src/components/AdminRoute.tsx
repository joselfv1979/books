import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypeSelector';

type Props = {
    children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
    const { loggedUser } = useTypedSelector((state) => state.users);
    const isAdmin = loggedUser?.roles?.includes('admin') ? true : false;

    return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
