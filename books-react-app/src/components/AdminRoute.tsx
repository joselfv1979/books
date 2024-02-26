import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { isAdmin } from '../store/userSlice';

type Props = {
    children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
    const admin = useAppSelector(isAdmin);

    return admin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
