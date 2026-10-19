import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation } from "react-router";
import { 
    FaBox, 
    FaUser, 
    FaLock, 
    FaSignOutAlt, 
    FaTruck, 
    FaPlus, 
    FaListAlt, 
    FaShieldAlt, 
    FaBicycle,
    FaBars,
    FaTimes
} from "react-icons/fa";

const Navbar = () => {
    const { authUser, logout } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [prevPath, setPrevPath] = useState(location.pathname);
    if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        setMobileOpen(false);
    }

    // Transparent navbar on top of hero on home page; solid frosted navbar everywhere else or when scrolled
    const isSolidNav = isScrolled || !isHome;

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) =>
        `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            isActive(path)
                ? isSolidNav 
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20" 
                    : "bg-white/20 text-white backdrop-blur-sm"
                : isSolidNav
                    ? "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                    : "text-slate-200 hover:text-white hover:bg-white/10"
        }`;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isSolidNav
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3"
                    : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-4"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between min-h-[56px]">

                    {/* ================= LOGO ================= */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 group transition-transform active:scale-95"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all">
                                <FaTruck className="text-lg" />
                            </div>

                            <div className="flex flex-col">
                                <span className={`text-xl font-extrabold tracking-tight leading-none ${
                                    isSolidNav ? "text-slate-900" : "text-white"
                                }`}>
                                    Send<span className="text-blue-600">BD</span>
                                </span>
                                <span className={`text-[10px] font-medium tracking-wider uppercase ${
                                    isSolidNav ? "text-slate-400" : "text-slate-300"
                                }`}>
                                    Courier & Logistics
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* ================= DESKTOP NAV ================= */}
                    <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/60 p-1.5 rounded-2xl border border-slate-200/50">
                        <Link to="/" className={navLinkClass("/")}>
                            Home
                        </Link>

                        <Link to="/create-courier" className={navLinkClass("/create-courier")}>
                            <FaPlus className="text-xs" />
                            Send Courier
                        </Link>

                        <Link to="/view-all-couriers" className={navLinkClass("/view-all-couriers")}>
                            <FaListAlt className="text-xs" />
                            My Couriers
                        </Link>
                    </nav>

                    {/* ================= RIGHT CONTROLS ================= */}
                    <div className="flex items-center gap-3">
                        {authUser ? (
                            <div className="relative dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-full cursor-pointer transition-all border ${
                                        isSolidNav
                                            ? "border-slate-200 hover:border-slate-300 bg-white"
                                            : "border-white/20 hover:border-white/40 bg-white/10 text-white"
                                    }`}
                                >
                                    <div className="relative">
                                        <img
                                            src={
                                                authUser?.img_url ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.username || "User")}&background=2563eb&color=fff`
                                            }
                                            alt={authUser?.username || "User"}
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
                                        />
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                                    </div>

                                    <div className="hidden sm:flex flex-col text-left">
                                        <span className={`text-xs font-semibold leading-tight max-w-[100px] truncate ${
                                            isSolidNav ? "text-slate-800" : "text-white"
                                        }`}>
                                            {authUser?.username}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold text-blue-500">
                                            {authUser?.role || "Customer"}
                                        </span>
                                    </div>
                                </div>

                                {/* Modern Dropdown Menu */}
                                <div
                                    tabIndex={-1}
                                    className="dropdown-content menu z-50 mt-2 w-64 p-2 bg-white rounded-2xl shadow-xl border border-slate-100 text-slate-700"
                                >
                                    {/* User Info Header */}
                                    <div className="px-3 py-2.5 mb-1.5 border-b border-slate-100 bg-slate-50/70 rounded-xl">
                                        <p className="text-xs font-bold text-slate-900 truncate">
                                            {authUser?.firstname} {authUser?.lastname}
                                        </p>
                                        <p className="text-xs text-slate-500 truncate">
                                            {authUser?.email || `@${authUser?.username}`}
                                        </p>
                                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                                            {authUser?.role || "User"}
                                        </span>
                                    </div>

                                    {/* Role shortcuts */}
                                    {authUser?.role === "admin" && (
                                        <li>
                                            <Link
                                                to="/admin/all-courier"
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-purple-700 hover:bg-purple-50 transition-colors"
                                            >
                                                <FaShieldAlt className="text-purple-600" />
                                                Admin Dashboard
                                            </Link>
                                        </li>
                                    )}

                                    {authUser?.role === "rider" && (
                                        <li>
                                            <Link
                                                to="/rider/all-order"
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
                                            >
                                                <FaBicycle className="text-emerald-600" />
                                                Rider Dashboard
                                            </Link>
                                        </li>
                                    )}

                                    <li>
                                        <Link
                                            to="/user/profile"
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                                        >
                                            <FaUser className="text-slate-400" />
                                            My Profile
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/create-courier"
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                                        >
                                            <FaBox className="text-slate-400" />
                                            Book Courier
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/change-password"
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                                        >
                                            <FaLock className="text-slate-400" />
                                            Security & Password
                                        </Link>
                                    </li>

                                    <div className="my-1 border-t border-slate-100"></div>

                                    <li>
                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors w-full"
                                        >
                                            <FaSignOutAlt />
                                            Sign Out
                                        </button>
                                    </li>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                                        isSolidNav
                                            ? "text-slate-700 hover:text-blue-600 hover:bg-slate-100"
                                            : "text-white hover:bg-white/10"
                                    }`}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md shadow-blue-500/25 transition-all"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`md:hidden p-2.5 rounded-xl transition-colors ${
                                isSolidNav
                                    ? "text-slate-700 hover:bg-slate-100"
                                    : "text-white hover:bg-white/10"
                            }`}
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                        </button>
                    </div>
                </div>

                {/* ================= MOBILE NAV DRAWER ================= */}
                {mobileOpen && (
                    <div className="md:hidden mt-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 flex flex-col gap-2">
                        <Link
                            to="/"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm ${
                                isActive("/") ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                            Home
                        </Link>

                        <Link
                            to="/create-courier"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm ${
                                isActive("/create-courier") ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                            <FaPlus className="text-blue-500" />
                            Send Courier
                        </Link>

                        <Link
                            to="/view-all-couriers"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm ${
                                isActive("/view-all-couriers") ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                            <FaListAlt className="text-blue-500" />
                            My Couriers
                        </Link>

                        {authUser && (
                            <>
                                <div className="my-1 border-t border-slate-100"></div>
                                <Link
                                    to="/user/profile"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    <FaUser className="text-slate-400" />
                                    My Profile
                                </Link>

                                {authUser.role === "admin" && (
                                    <Link
                                        to="/admin/all-courier"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-purple-700 bg-purple-50"
                                    >
                                        <FaShieldAlt className="text-purple-600" />
                                        Admin Panel
                                    </Link>
                                )}

                                {authUser.role === "rider" && (
                                    <Link
                                        to="/rider/all-order"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-emerald-700 bg-emerald-50"
                                    >
                                        <FaBicycle className="text-emerald-600" />
                                        Rider Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={logout}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-rose-600 hover:bg-rose-50 text-left"
                                >
                                    <FaSignOutAlt />
                                    Log Out
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
