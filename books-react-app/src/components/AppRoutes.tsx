import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import AddBook from "../pages/AddBook";
import AddUser from "../pages/AddUser";
import Book from "../pages/Book";
import Books from "../pages/Books";
import EditBook from "../pages/EditBook";
import EditUser from "../pages/EditUser";
import Landing from "../pages/Landing";
import Loans from "../pages/Loans";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Users from "../pages/Users";
import { ROUTES } from "../utils/constants";
import AdminRoute from "./AdminRoute";
import Layout from "./Layout";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={ROUTES.LANDING} element={<Landing />} />
                <Route path={ROUTES.ALL_BOOKS} element={<Books />} />
                <Route path={`${ROUTES.SINGLE_BOOK}/:id`} element={<Book />} />
                <Route path={`${ROUTES.LOANS}/:id`} element={<Loans />} />
                <Route path={ROUTES.ADD_USER} element={<AddUser />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={`${ROUTES.EDIT_USER}/:id`} element={<EditUser />} />
                <Route path={ROUTES.CONTACT} element={<About />} />
                <Route element={<AdminRoute />}>
                    <Route path={ROUTES.ADD_BOOK} element={<AddBook />} />
                    <Route path={`${ROUTES.EDIT_BOOK}/:id`} element={<EditBook />} />
                    <Route path={ROUTES.ALL_USERS} element={<Users />} />
                </Route>
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Route>
        </Routes>
    );
}