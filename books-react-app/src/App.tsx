import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './assets/scss/globalStyles.module.scss';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';
import { useAppDispatch } from './hooks/redux-hooks';
import About from './pages/About';
import AddBook from './pages/AddBook';
import AddUser from './pages/AddUser';
import Book from './pages/Book';
import Books from './pages/Books';
import EditBook from './pages/EditBook';
import EditUser from './pages/EditUser';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Users from './pages/Users';

const App = () => {
    const { pathname } = useLocation();
    const { removeBookMessage, removeUserMessage } = useAppDispatch();

    // Clear messages when the view changes
    useEffect(() => {
        removeBookMessage();
        removeUserMessage();
    }, [pathname]);

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/books" element={<Books />} />
                <Route path="/book/:id" element={<Book />} />
                <Route path="/register" element={<AddUser />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user-edit/:id" element={<EditUser />} />
                <Route path="/contact" element={<About />} />
                <Route path="*" element={<NotFound />} />
                <Route element={<AdminRoute />}>
                    <Route path="/newBook" element={<AddBook />} />
                    <Route path="/book-edit/:id" element={<EditBook />} />
                    <Route path="/users" element={<Users />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
