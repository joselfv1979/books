import { BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../assets/scss/menu.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

const UserLogMenu = () => {
    const { authUser } = useAppSelector((state) => state.user);
    const { logout } = useAppDispatch();

    const navigate = useNavigate();

    const handleLogoutUser = () => {
        navigate('/login');
        logout();
    };

    return (
        authUser ?
            <>
                <span className={styles.username} data-testid={authUser.username}>{authUser.username}</span>
                <BoxArrowRight className={styles.logoutIcon} data-testid="logout-btn" onClick={handleLogoutUser} />
            </>
            : <NavLink className={({ isActive }) => (isActive ? `${styles.activeLogmenu}` : `${styles.logmenu}`)} to="/login">Login</NavLink>
    );
};

export default UserLogMenu;

