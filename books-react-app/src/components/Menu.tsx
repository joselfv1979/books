import styles from '@/assets/scss/menu.module.scss';
import { useAppSelector } from '@/hooks/redux-hooks';
import { authUser, isAdmin } from '@/store/userSlice';
import { Link } from 'react-router-dom';
import UserLogMenu from './UserLogMenu';

const Menu = () => {
    const admin = useAppSelector(isAdmin);
    const loggedUser = useAppSelector(authUser);

    return (
        <nav className={styles.menu}>
            <li className={styles.subMenu}>
                <Link to="/">Welcome</Link>
            </li>
            <li className={styles.subMenu}>
                <Link to="/books">Books</Link>
            </li>
            <li className={styles.subMenu}>
                <Link to="/contact">Contact</Link>
            </li>
            {loggedUser && <li className={styles.subMenu}>
                {<Link to={`users/${loggedUser?.id}`}>Profile</Link>}
            </li>}
            {admin && <li className={styles.subMenu}>
                <Link to="/newBook">New Book</Link>
            </li>}
            {admin && <li className={styles.subMenu}>
                <Link to="/users">Users</Link>
            </li>}
            <li className={styles.userSubmenu}>
                <UserLogMenu />
            </li>
        </nav>
    );
};

export default Menu;
