import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router";

const Navbar = () => {
    const { authUser, logout } = useContext(AuthContext)

    return (
        <div className="sticky top-0 z-100 w-full bg-base-100 shadow-sm">
            <div className="navbar bg-base-100/95 backdrop-blur-md shadow-md border-b border-base-200 px-3 md:px-6 lg:px-10 sticky top-0 z-50">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle lg:hidden hover:bg-primary/10"
                        >
                            <svg
                                aria-label="Menu"
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-1 mt-3 w-56 p-3 shadow-xl border border-base-200"
                        >
                            <li>
                                <Link
                                    to={'/'}
                                    className="rounded-xl hover:bg-primary hover:text-primary-content"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to={'/create-courier'}
                                    className="rounded-xl hover:bg-primary hover:text-primary-content"
                                >
                                    Send Courier
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to={'/view-all-couriers'}
                                    className="rounded-xl hover:bg-primary hover:text-primary-content"
                                >
                                    View My Couriers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link
                        to={'/'}
                        className="btn btn-ghost hover:bg-transparent px-2"
                    >
                        <img src="./image/logo.png" alt="" className="h-7 md:h-8 lg:h-10" />
                        <p className="text-base md:text-xl lg:text-2xl font-bold tracking-tight">
                            <span className="text-primary">Send</span>BD
                        </p>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-vertical lg:menu-horizontal bg- rounded-box">

                        <li>
                            <Link
                                to={'/'}
                                className="rounded-xl hover:bg-primary hover:text-primary-content transition-all duration-200 px-7 mx-2"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                to={'/create-courier'}
                                className="rounded-xl hover:bg-primary hover:text-primary-content transition-all duration-200 px-7 mx-2"
                            >
                                Send Courier
                            </Link>
                        </li>

                        <li>
                            <Link
                                to={'/view-all-couriers'}
                                className="rounded-xl hover:bg-primary hover:text-primary-content transition-all duration-200 px-7 mx-2"
                            >
                                View My Couriers
                            </Link>
                        </li>

                    </ul>
                </div>

                <div className="navbar-end">
                    {
                        authUser ?
                            <div className="dropdown dropdown-end">

                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost gap-2 rounded-xl hover:bg-primary/10 px-2 md:px-4"
                                >
                                    <div className="avatar placeholder">
                                        <div className="bg-primary text-primary-content w-9 rounded-full">
                                            <span className="text-2xl font-bold text-center">
                                                {authUser?.username?.charAt(0)?.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <span className="hidden sm:block font-semibold">
                                        {authUser?.username}
                                    </span>

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

                                <ul
                                    tabIndex={-1}
                                    className="dropdown-content menu bg-base-100 rounded-2xl z-1 mt-3 w-60 p-3 shadow-xl border border-base-200"
                                >

                                    {
                                        authUser?.role == "admin" &&
                                        <li>
                                            <Link
                                                to={"/admin/all-courier"}
                                                className="rounded-xl hover:bg-primary hover:text-primary-content"
                                            >
                                                Admin Profile
                                            </Link>
                                        </li>
                                    }

                                    {
                                        authUser?.role == "rider" &&
                                        <li>
                                            <Link
                                                to={"/rider/all-order"}
                                                className="rounded-xl hover:bg-primary hover:text-primary-content"
                                            >
                                                Rider Profile
                                            </Link>
                                        </li>
                                    }

                                    <li>
                                        <Link
                                            to={'/user/profile'}
                                            className="rounded-xl hover:bg-primary hover:text-primary-content"
                                        >
                                            Profile
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to={'change-password'}
                                            className="rounded-xl hover:bg-primary hover:text-primary-content"
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
                            :
                            <Link to={"/login"}>
                                <div className="aura text-blue-600 bg-blue-200">
                                    <div className="card bg-base-100 text-base-content">
                                        <div className="card-body px-4 py-1.5 flex items-center justify-center">
                                            <p className="text-xl font-bold leading-none">Login</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                    }
                </div>

            </div>
        </div>
    );
};

export default Navbar;
