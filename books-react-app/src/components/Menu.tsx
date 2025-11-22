import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../assets/scss/menu.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { isAdmin } from '../store/userSlice';
import { ROUTES } from '../utils/constants';
import { CloseIcon, HamburguerIcon } from './Icons';

const Menu = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const { authUser } = useAppSelector((state) => state.user);
    const admin = useAppSelector(isAdmin);
    const { logout } = useAppDispatch();

    const navigate = useNavigate();

    const handleLogoutUser = () => {
        logout();
        navigate(ROUTES.LOGIN);
    };

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const menuItems = [
        { to: ROUTES.ALL_BOOKS, label: "Books" },
        authUser && { to: `${ROUTES.LOANS}/${authUser.id}`, label: "Loans" },
        authUser && { to: `${ROUTES.EDIT_USER}/${authUser.id}`, label: "Profile" },
        admin && { to: ROUTES.ADD_BOOK, label: "New Book" },
        admin && { to: ROUTES.ALL_USERS, label: "Users" },
        { to: ROUTES.CONTACT, label: "Contact" },
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
                    {authUser ?
                        <div className={styles.userSection}>
                            <span className={styles.username} data-testid={authUser.username}>Hello, {authUser.username}</span>
                        </div>
                        : <NavLink to={ROUTES.LOGIN} className={({ isActive }) => isActive ? styles.activeLogin : styles.login}>Login</NavLink>}
                </div>

                {showNavbar && <button className={styles.transparentArea} onClick={() => setShowNavbar(false)}></button>}
            </div>
        </nav>
    );
};

export default Menu;
