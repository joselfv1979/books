import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { clearNotification } from '../store/notification';
import Header from './Header';
import Notification from './Notification';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        // Clear the notification whenever a child route changes
        dispatch(clearNotification());
    }, [location, dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <Notification />

            <main className="layout-container flex-1 py-6">{children}</main>

            <footer className="border-t py-4 text-center text-xs text-brand-600">
                © {new Date().getFullYear()} Smart Library
            </footer>
        </div>
    );
};

export default Layout;