import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router";

const Navbar = () => {
    const { authUser, logout } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navLinkClass =
        "rounded-xl px-3 py-2 transition-all duration-200 hover:bg-primary hover:text-primary-content";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass-nav shadow-lg bg-white/85 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="navbar max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 min-h-[70px]">

                {/* ================= LEFT ================= */}
                <div className="navbar-start">

                    {/* Mobile Menu */}
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle hover:bg-primary/10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-60 p-3 shadow-xl border border-base-200"
                        >
                            <li>
                                <Link to="/" className={navLinkClass}>
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/create-courier" className={navLinkClass}>
                                    Send Courier
                                </Link>
                            </li>

                            <li>
                                <Link to="/view-all-couriers" className={navLinkClass}>
                                    View My Couriers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link
                        to="/"
                        className="btn btn-ghost hover:bg-transparent px-2 gap-2"
                    >
                        <img
                            src="/image/logo.png"
                            alt="SendBD Logo"
                            className="h-7 sm:h-8 lg:h-9"
                        />

                        <p className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">
                            <span className="text-primary">Send</span>BD
                        </p>
                    </Link>
                </div>

                {/* ================= CENTER ================= */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal bg-base-200/70 rounded-2xl px-1 py-1">

                        <li>
                            <Link to="/" className={navLinkClass}>
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/create-courier"
                                className={navLinkClass}
                            >
                                Send Courier
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/view-all-couriers"
                                className={navLinkClass}
                            >
                                View My Couriers
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="navbar-end">

                    {authUser ? (
                        <div className="dropdown dropdown-end">

                            {/* User Button */}
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost rounded-xl gap-2 px-2 sm:px-3 hover:bg-primary/10"
                            >
                                <div className="flex items-center gap-2">

                                    <div className="avatar">
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                                            <img
                                                src={
                                                    authUser?.img_url ||
                                                    "https://ui-avatars.com/api/?name=User"
                                                }
                                                alt={authUser?.username || "User"}
                                            />
                                        </div>
                                    </div>

                                    <span className="hidden sm:block font-semibold max-w-[120px] truncate">
                                        {authUser?.username}
                                    </span>
                                </div>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 9-7 7-7-7"
                                    />
                                </svg>
                            </div>

                            {/* User Dropdown */}
                            <ul
                                tabIndex={-1}
                                className="dropdown-content menu bg-base-100 rounded-2xl z-50 mt-3 w-60 p-3 shadow-xl border border-base-200"
                            >

                                {/* Admin */}
                                {authUser?.role === "admin" && (
                                    <li>
                                        <Link
                                            to="/admin/all-courier"
                                            className={navLinkClass}
                                        >
                                            Admin Profile
                                        </Link>
                                    </li>
                                )}

                                {/* Rider */}
                                {authUser?.role === "rider" && (
                                    <li>
                                        <Link
                                            to="/rider/all-order"
                                            className={navLinkClass}
                                        >
                                            Rider Profile
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <Link
                                        to="/user/profile"
                                        className={navLinkClass}
                                    >
                                        Profile
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/change-password"
                                        className={navLinkClass}
                                    >
                                        Change Password
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        onClick={logout}
                                        className="rounded-xl text-error hover:bg-error hover:text-error-content"
                                    >
                                        Log Out
                                    </button>
                                </li>

                            </ul>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-primary rounded-xl px-5">
                                Login
                            </button>
                        </Link>
                    )}

                </div>
            </div>
        </header>
    );
};

export default Navbar;

