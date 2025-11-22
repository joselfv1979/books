import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { clearNotification } from '../store/notificationSlice';
import Header from './Header';

// const Layout = () => {

//     const location = useLocation();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         // Clear the notification whenever a child route changes
//         dispatch(clearNotification());
//     }, [location, dispatch]);

//     // Show Header only on `/dashboard` path
//     const showHeader = location.pathname === ROUTES.LANDING;

//     return (
//         <>
//             {showHeader ? <Header /> : <Menu />}

//             <Notification />

//             <main>
//                 <Outlet />
//             </main>

//             <Footer />
//         </>
//     )
// }


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

            <main className="layout-container flex-1 py-6">{children}</main>

            <footer className="border-t py-4 text-center text-xs text-brand-600">
                © {new Date().getFullYear()} Smart Library
            </footer>
        </div>
    );
};

export default Layout;