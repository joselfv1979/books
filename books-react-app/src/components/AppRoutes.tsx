import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import AccountPage from "../pages/AccountPage";
import AddUser from "../pages/AddUser";
import BookPage from "../pages/BookPage";
import BooksPage from "../pages/BooksPage";
import LandingPage from "../pages/LandingPage";
import LoansPage from "../pages/LoansPage";
import LoginPage from "../pages/LoginPage";
import { ROUTES } from "../utils/constants";
import AdminRoute from "./AdminRoute";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import Users from "../pages/Users";
import NotFound from "../pages/NotFound";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path={ROUTES.ALL_BOOKS} element={<BooksPage />} />
            <Route path={`${ROUTES.SINGLE_BOOK}/:id`} element={<BookPage />} />
            <Route path={`${ROUTES.LOANS}/:id`} element={<LoansPage />} />
            <Route path={ROUTES.ADD_USER} element={<AddUser />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.CONTACT} element={<About />} />
            <Route element={<AdminRoute />}>
                <Route path={ROUTES.ADD_BOOK} element={<AddBook />} />
                <Route path={`${ROUTES.EDIT_BOOK}/:id`} element={<EditBook />} />
                {/* <Route path={ROUTES.ALL_USERS} element={<Users />} /> */}
            </Route>
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
    );

}