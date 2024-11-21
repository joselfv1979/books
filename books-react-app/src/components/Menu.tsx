import { Link } from 'react-router-dom';
import styles from '../assets/scss/menu.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { authUser, isAdmin } from '../store/userSlice';
import UserLogMenu from './UserLogMenu';

const Menu = () => {
    const admin = useAppSelector(isAdmin);
    const loggedUser = useAppSelector(authUser);

    const menuItems = [
        { to: "/", label: "Welcome" },
        { to: "/books", label: "Books" },
        { to: "/contact", label: "Contact" },
        loggedUser && { to: `users/${loggedUser.id}`, label: "Profile" },
        admin && { to: "/newBook", label: "New Book" },
        admin && { to: "/users", label: "Users" },
    ].filter(Boolean); // Filter out null values

    return (
        <nav className={styles.menu}>
            {menuItems.map((item) => (
                item && <li key={item.label} className={styles.subMenu}>
                    <Link to={item.to}>{item.label}</Link>
                </li>
            ))}
            <li className={styles.userSubmenu}>
                <UserLogMenu />
            </li>
        </nav>
    );
};

export default Menu;
