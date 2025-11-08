import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { clearNotification } from '../store/notificationSlice';
import { ROUTES } from '../utils/constants';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';
import Notification from './Notification';

const Layout = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        // Clear the notification whenever a child route changes
        dispatch(clearNotification());
    }, [location, dispatch]);

    // Show Header only on `/dashboard` path
    const showHeader = location.pathname === ROUTES.LANDING;

    return (
        <>
            {showHeader ? <Header /> : <Menu />}

            <Notification />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default Layout;
