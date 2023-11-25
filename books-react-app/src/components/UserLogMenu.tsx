import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetBooks } from '../redux/actionCreators/book';
import { useDispatch } from 'react-redux';
import { BoxArrowRight } from 'react-bootstrap-icons';
import styles from '../scss/menu.module.scss';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { logout } from '../redux/actionCreators/user';
import { resetUsers } from '../redux/actionCreators/user';

const UserLogMenu = () => {
    const { loggedUser } = useTypedSelector((state) => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutUser = () => {
        navigate('/login');
        dispatch(logout());
        dispatch(resetBooks());
        dispatch(resetUsers());
    };

    return (
        <>
            {loggedUser ? (
                <>
                    <span className={styles.username}> {loggedUser.username}</span>{' '}
                    <BoxArrowRight className={styles.logoutIcon} onClick={logoutUser} />{' '}
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </>
    );
};

export default UserLogMenu;
