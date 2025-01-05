import { BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../assets/scss/menu.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

const UserLogMenu = () => {
    const { authUser } = useAppSelector((state) => state.user);
    const { logout } = useAppDispatch();

    const navigate = useNavigate();

    const handleLogoutUser = () => {
        logout();
        navigate('/login');
    };

    return authUser ?
        (<div className={styles.loggedUser}>
            <span className={styles.username} data-testid={authUser.username}>{authUser.username}</span>
            <BoxArrowRight className={styles.logoutIcon} data-testid="logout-btn" onClick={handleLogoutUser} />
        </div>)
        : (<NavLink to="/login" className={({ isActive }) => isActive ? styles.activeLogmenu : styles.logmenu}>Login</NavLink>)

};

export default UserLogMenu;

