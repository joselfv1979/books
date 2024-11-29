import { NavLink } from 'react-router-dom';
import styles from '../assets/scss/menu.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { authUser, isAdmin } from '../store/userSlice';
import UserLogMenu from './UserLogMenu';

const Menu = () => {
    const admin = useAppSelector(isAdmin);
    const loggedUser = useAppSelector(authUser);

    const menuItems = [
        { to: "/books", label: "Books" },
        { to: "/contact", label: "Contact" },
        loggedUser && { to: `user-edit/${loggedUser.id}`, label: "Profile" },
        admin && { to: "/newBook", label: "New Book" },
        admin && { to: "/users", label: "Users" },
    ].filter(Boolean); // Filter out null values

    return (
        <nav className={styles.menu}>
            <NavLink className={styles.brand} to="/">Library</NavLink>
            {menuItems.map((item) => (
                item &&
                <NavLink key={item.label} to={item.to}
                    className={({ isActive }) => (isActive ? `${styles.active}` : '')}>
                    {item.label}
                </NavLink>

            ))}
            <UserLogMenu />
        </nav>
    );
};

export default Menu;
