import styles from '@/assets/scss/menu.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

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
                <span className={styles.username}> {authUser.username}</span>{' '}
                <BoxArrowRight className={styles.logoutIcon} onClick={logoutUser} />{' '}
            </>
            : <Link to="/login">Login</Link>
    );
};

export default UserLogMenu;

