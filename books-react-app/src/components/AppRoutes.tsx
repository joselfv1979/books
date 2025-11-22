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

export const AppRoutes = () => {
    // return (
    //     <Routes>
    //         <Route element={<Layout />}>
    //             <Route path={ROUTES.LANDING} element={<Landing />} />
    //             <Route path={ROUTES.ALL_BOOKS} element={<Books />} />
    //             <Route path={`${ROUTES.SINGLE_BOOK}/:id`} element={<Book />} />
    //             <Route path={`${ROUTES.LOANS}/:id`} element={<Loans />} />
    //             <Route path={ROUTES.ADD_USER} element={<AddUser />} />
    //             <Route path={ROUTES.LOGIN} element={<Login />} />
    //             <Route path={`${ROUTES.EDIT_USER}/:id`} element={<EditUser />} />
    //             <Route path={ROUTES.CONTACT} element={<About />} />
    //             <Route element={<AdminRoute />}>
    //                 <Route path={ROUTES.ADD_BOOK} element={<AddBook />} />
    //                 <Route path={`${ROUTES.EDIT_BOOK}/:id`} element={<EditBook />} />
    //                 <Route path={ROUTES.ALL_USERS} element={<Users />} />
    //             </Route>
    //             <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    //         </Route>
    //     </Routes>
    // );
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
        </Routes>
    );

}