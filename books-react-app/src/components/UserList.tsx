import styles from '../assets/scss/userList.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import UserCard from './UserCard';

const UserList = () => {

    const { users } = useAppSelector((state) => state.user);

    return (
        <>
            <h1 className={styles.userListTitle}>Users</h1>
            {users.length > 0 ?
                <ul className={styles.userList} data-testid="user-list">
                    {users.map((user) => (
                        <li key={user.id}>
                            <UserCard user={user} />
                        </li>
                    ))}
                </ul>
                : <h2 className={styles.noUserTitle}>No Users found</h2>
            }
        </>
    );
};

export default UserList;