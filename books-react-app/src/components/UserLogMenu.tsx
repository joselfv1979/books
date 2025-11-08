import { BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../assets/scss/menu.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { ROUTES } from '../utils/constants';

const UserLogMenu = () => {
    const { authUser } = useAppSelector((state) => state.user);
    const { logout } = useAppDispatch();

    const navigate = useNavigate();

    const handleLogoutUser = () => {
        logout();
        navigate(ROUTES.LANDING);
    };

    return authUser ?
        (<div className={styles.logged}>
            <span className={styles.username} data-testid={authUser.username}>Hello, {authUser.username}</span>
            <BoxArrowRight className={styles.logout} data-testid="logout-btn" onClick={handleLogoutUser} />
        </div>)
        : (<NavLink to={ROUTES.LOGIN} className={({ isActive }) => isActive ? styles.activeLogin : styles.login}>Login</NavLink>)

};

export default UserLogMenu;

