import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import AddUser from './pages/AddUser';
import AddBook from './pages/AddBook';
import Menu from './components/Menu';
import AdminRoute from './components/AdminRoute';
import EditBook from './pages/EditBook';
import Login from './pages/Login';
import Book from './pages/Book';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import './scss/globalStyles.module.scss';

const App = () => {
    return (
        <div className="app">
            <Menu />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<About />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/book/:id" element={<Book />} />
                    <Route path="/register" element={<AddUser />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/users/:id" element={<EditUser />} />
                    <Route
                        path="/newBook"
                        element={
                            <AdminRoute>
                                <AddBook />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/book-edit/:id"
                        element={
                            <AdminRoute>
                                <EditBook />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <AdminRoute>
                                <Users />
                            </AdminRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
