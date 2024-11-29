import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './assets/scss/globalStyles.module.scss';
import AdminRoute from './components/AdminRoute';
import Menu from './components/Menu';
import { useAppDispatch } from './hooks/redux-hooks';
import About from './pages/About';
import AddBook from './pages/AddBook';
import AddUser from './pages/AddUser';
import Book from './pages/Book';
import Books from './pages/Books';
import EditBook from './pages/EditBook';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Users from './pages/Users';

const App = () => {
    const { pathname } = useLocation();
    const { removeBookMessage, removeUserMessage } = useAppDispatch();

    // Removes messages when view is changed
    useEffect(() => {
        removeBookMessage();
        removeUserMessage();
    }, [pathname]);

    return (
        <>
            <Menu />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/book/:id" element={<Book />} />
                    <Route path="/register" element={<AddUser />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user-edit/:id" element={<EditUser />} />
                    <Route path="/newBook" element={<AdminRoute><AddBook /></AdminRoute>} />
                    <Route path="/book-edit/:id" element={<AdminRoute><EditBook /></AdminRoute>} />
                    <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
                    <Route path="/contact" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
