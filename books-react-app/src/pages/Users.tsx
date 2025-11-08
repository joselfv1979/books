import { useEffect } from 'react';
import UserList from '../components/UserList';
import { useAppDispatch } from '../hooks/redux-hooks';

const Users = () => {
    const { fetchUsers } = useAppDispatch();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserList />
    );
};

export default Users;
