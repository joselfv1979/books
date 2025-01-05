import styles from '../assets/scss/userList.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { User } from '../types/User';
import UserCard from './UserCard';

const UserList = () => {

    const { users } = useAppSelector((state) => state.user);

    const renderUserCard = (user: User) => (
        <div key={user.id} data-testid="user-card" >
            <UserCard user={user} />
        </div>
    );

    return (
        <>
            <h1 className={styles.userListTitle}>Users</h1>
            {users.length > 0 ?
                <div className={styles.userList} data-testid="user-list">
                    {users.map(renderUserCard)}
                </div>
                : <h2 className={styles.noUserTitle}>No Users found</h2>
            }
        </>
    );
};

export default UserList;