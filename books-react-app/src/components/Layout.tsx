import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { clearNotification } from '@/store/notification';
import Header from './Header';
import Notification from './Notification';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearNotification());
    }, [location, dispatch]);

    return (
        <div className="min-h-screen flex flex-col bg-page">
            <Header />

            <Notification />

            <main className="flex-1">{children}</main>

            <footer className="border-t border-page-border py-6 text-center">
                <p className="text-xs text-ink-400 font-sans tracking-wide">
                    &copy; {new Date().getFullYear()} Smart Library &mdash; The Reading Room
                </p>
            </footer>
        </div>
    );
};

export default Layout;
