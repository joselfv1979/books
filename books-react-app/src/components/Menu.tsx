import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../scss/menu.module.scss';
import UserLogMenu from './UserLogMenu';
import { useTypedSelector } from '../hooks/useTypeSelector';

const Menu = () => {
    const { loggedUser } = useTypedSelector((state) => state.users);
    const isAdmin = loggedUser?.roles?.includes('admin') ? true : false;

    return (
        <ul className="text-white bg-dark">
            <li>
                <Link to="/">Welcome</Link>
            </li>
            <li>
                <Link to="/books">Books</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
            <li>{loggedUser ? <Link to={`users/${loggedUser.id}`}>Profile</Link> : null}</li>
            {isAdmin && (
                <>
                    <li>
                        <Link to="/newBook">New Book</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </>
            )}
            <li className={styles.userSubmenu}>
                <UserLogMenu />
            </li>
        </ul>
    );
};

export default Menu;
