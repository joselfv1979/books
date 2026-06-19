import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { isAdmin } from "@/store/user";
import { useThemeContext } from "@/context/theme/ThemeContext";
import clsx from "clsx";

const Header: React.FC = () => {
  const authUser = useAppSelector(s => s.user.authUser);
  const admin = useAppSelector(isAdmin);
  const { logout } = useAppDispatch();
  const { pathname } = useLocation();
  const isLanding = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) return;
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLanding]);

  const handleLogout = () => {
    logout();
  };

  const links = [
    { to: "/books", label: "Books" },
    authUser && { to: `/loans/${authUser.id}`, label: "Loans" },
    authUser && { to: `/users/${authUser.id}/edit`, label: "Profile" },
    admin && { to: "/new-book", label: "New Book" },
    admin && { to: "/users", label: "Users" },
    { to: "/contact", label: "Contact" }
  ].filter(Boolean) as { to: string; label: string }[];

  const { theme, toggleTheme } = useThemeContext();

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        isLanding && !scrolled && "bg-transparent",
        (isLanding && scrolled) || !isLanding
          ? "bg-[color-mix(in_srgb,var(--color-page)_90%,transparent)] backdrop-blur-md border-b border-page-border"
          : "",
      )}
    >
      <div className="layout-container flex items-center gap-6 py-3">
        <Link
          to="/"
          className={clsx(
            "text-xl font-serif font-semibold transition-colors",
            isLanding ? "text-ink-50" : "text-gold-400",
          )}
        >
          Library
        </Link>

        <nav className="flex gap-5 text-sm tracking-wide font-sans flex-1">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  "transition-colors uppercase tracking-wider text-xs font-medium",
                  isActive
                    ? "text-gold-400"
                    : isLanding
                      ? "text-ink-300 hover:text-ink-50"
                      : "text-ink-300 hover:text-ink-50",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-outline text-xs px-3 py-2"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            data-testid="theme-toggle"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {authUser ? (
            <>
              <span
                className="text-sm text-ink-300 font-sans"
                data-testid="user-greeting"
              >
                Hello, {authUser.username}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline text-xs px-4 py-2"
                data-testid="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary text-xs px-4 py-2"
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
