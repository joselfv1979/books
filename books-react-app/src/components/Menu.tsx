import React from 'react';
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
            <li>
                <Link className={styles.nonUnderlined} to="/">Welcome</Link>
            </li>
            <li>
                <Link className={styles.nonUnderlined} to="/books">Books</Link>
            </li>
            <li>
                <Link className={styles.nonUnderlined} to="/contact">Contact</Link>
            </li>
            {loggedUser && <li>
                {<Link className={styles.nonUnderlined} to={`users/${loggedUser?.id}`}>Profile</Link>}
            </li>}
            {admin && <li>
                <Link className={styles.nonUnderlined} to="/newBook">New Book</Link>
            </li>}
            {admin && <li>
                <Link className={styles.nonUnderlined} to="/users">Users</Link>
            </li>}
            <li className={styles.userSubmenu}>
                <UserLogMenu />
            </li>
        </ul>
    );
};

export default Menu;
