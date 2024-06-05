import { Link } from 'react-router-dom';
import styles from '../assets/scss/menu.module.scss';
import UserLogMenu from './UserLogMenu';
import { useAppSelector } from '../hooks/redux-hooks';
import { authUser, isAdmin } from '../store/userSlice';

const Menu = () => {
    const admin = useAppSelector(isAdmin);
    const loggedUser = useAppSelector(authUser);

    return (
        <ul className="text-white bg-dark m-0">
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
        </ul>
    );
};

export default Menu;
