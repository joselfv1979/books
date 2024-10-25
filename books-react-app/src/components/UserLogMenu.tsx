import { BoxArrowRight } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/scss/menu.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

const UserLogMenu = () => {
    const { authUser } = useAppSelector((state) => state.user);
    const { logout } = useAppDispatch();

    const navigate = useNavigate();

    const logoutUser = () => {
        navigate('/login');
        logout();
    };

    return (
        authUser ?
            <>
                <span className={styles.username} data-testid={authUser.username}> {authUser.username}</span>{' '}
                <BoxArrowRight className={styles.logoutIcon} data-testid="logout-btn" onClick={logoutUser} />{' '}
            </>
            : <Link to="/login">Login</Link>
    );
};

export default UserLogMenu;

