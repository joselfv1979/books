import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { isAdmin } from "../store/userSlice";

const Header: React.FC = () => {
  const authUser = useAppSelector(s => s.user.authUser);
  const admin = useAppSelector(isAdmin);
  const { logout } = useAppDispatch(); // adapt if it returns plain dispatch

  const handleLogout = () => {
    logout();
  };

  const links = [
    { to: "/books", label: "Books" },
    authUser && { to: `/loans/${authUser.id}`, label: "Loans" },
    authUser && { to: `/users/${authUser.id}/edit`, label: "Profile" },
    admin && { to: "/books/new", label: "New Book" },
    admin && { to: "/users", label: "Users" },
    { to: "/contact", label: "Contact" }
  ].filter(Boolean) as { to: string; label: string }[];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="layout-container flex items-center gap-6 py-3">
        <Link to="/" className="text-xl font-semibold text-brand-700">
          Library
        </Link>

        <nav className="flex gap-5 text-base flex-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-brand-700 font-medium"
                    : "text-brand-600 hover:text-brand-700"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <span
                className="text-base text-brand-700"
                data-testid="user-greeting"
              >
                Hello, {authUser.username}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline text-sm px-4 py-2"
                data-testid="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary text-sm px-4 py-2"
              data-testid="login-link"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;