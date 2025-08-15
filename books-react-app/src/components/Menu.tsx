import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../assets/scss/menu.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { authUser, isAdmin } from '../store/userSlice';
import { CloseIcon, HamburguerIcon } from './Icons';
import UserLogMenu from './UserLogMenu';

const Menu = () => {
    const admin = useAppSelector(isAdmin);
    const loggedUser = useAppSelector(authUser);
    const [showNavbar, setShowNavbar] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const menuItems = [
        { to: "/books", label: "Books" },
        { to: "/contact", label: "Contact" },
        loggedUser && { to: `user-edit/${loggedUser.id}`, label: "Profile" },
        admin && { to: "/newBook", label: "New Book" },
        admin && { to: "/users", label: "Users" },
    ].filter(Boolean); // Filter out null values

    return (
        <nav className={styles.menu}>

            <button className={styles.hamburguer} onClick={handleShowNavbar}>
                {showNavbar ? <CloseIcon /> : <HamburguerIcon />}
            </button>

            <div className={showNavbar ? styles.showNavbar : styles.hideNavbar}>
                <div className={styles.navElements}>
                    {menuItems.map((item) => (
                        item &&
                        <NavLink key={item.label} to={item.to}
                            className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                            {item.label}
                        </NavLink>
                    ))}
                    <UserLogMenu />
                </div>

                {showNavbar && <button className={styles.transparentArea} onClick={() => setShowNavbar(false)}></button>}
            </div>
        </nav>
    );
};

export default Menu;
