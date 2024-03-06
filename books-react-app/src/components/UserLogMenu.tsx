import { Link, useNavigate } from 'react-router-dom';
import { BoxArrowRight } from 'react-bootstrap-icons';
import styles from '../assets/scss/menu.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { logout } from '../store/userActions';

const UserLogMenu = () => {
    const { authUser } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const logoutUser = () => {
        navigate('/login');
        dispatch(logout());
    };

    return (
        authUser ?
            <>
                <span className={styles.username}> {authUser.username}</span>{' '}
                <BoxArrowRight className={styles.logoutIcon} onClick={logoutUser} />{' '}
            </>
            : <Link className={styles.nonUnderlined} to="/login">Login</Link>
    );
};

export default UserLogMenu;

