import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';

const Layout = () => {

    const location = useLocation();

    // Example: show Menu only on `/dashboard` path and its children
    const showMenu = location.pathname === "/";

    return (
        <>
            {showMenu ? <Header /> : <Menu />}

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default Layout;
