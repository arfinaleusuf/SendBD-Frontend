import { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { 
    FaClipboardList, 
    FaSearch, 
    FaHome, 
    FaSignOutAlt, 
    FaBars, 
    FaTimes, 
    FaTruck 
} from "react-icons/fa";
import { 
    MdOutlineManageHistory, 
    MdAssignmentAdd, 
    MdFindInPage 
} from "react-icons/md";
import { RiEBike2Line } from "react-icons/ri";
import { AuthContext } from "../context/AuthProvider";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { authUser, logout } = useContext(AuthContext);

    const navItems = [
        {
            path: "/admin/all-courier",
            label: "All Couriers",
            icon: FaClipboardList,
            desc: "View and filter shipments",
        },
        {
            path: "/admin/all-request",
            label: "Pending Requests",
            icon: MdOutlineManageHistory,
            desc: "Approve or decline orders",
        },
        {
            path: "/admin/assign-rider",
            label: "Assign Riders",
            icon: MdAssignmentAdd,
            desc: "Dispatch to active riders",
        },
        {
            path: "/admin/all-rider",
            label: "All Riders",
            icon: RiEBike2Line,
            desc: "Rider fleet directory",
        },
        {
            path: "/admin/search-rider",
            label: "Search Rider",
            icon: FaSearch,
            desc: "Locate specific riders",
        },
        {
            path: "/admin/find-coustomer",
            label: "Find Customer",
            icon: MdFindInPage,
            desc: "Customer lookup & history",
        },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col lg:flex-row antialiased">
            
            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 select-none">
                
                {/* Brand Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                            <FaTruck className="text-base" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tight text-white leading-tight">
                                Send<span className="text-blue-500">BD</span>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                                Operations Portal
                            </span>
                        </div>
                    </Link>

                    <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-extrabold uppercase">
                        Admin
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
                    <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                        Management Hub
                    </div>

                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                    active
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                                }`}
                            >
                                <Icon className={`text-base shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                                <div className="flex flex-col">
                                    <span>{item.label}</span>
                                    <span className={`text-[10px] font-normal leading-tight ${active ? "text-blue-100" : "text-slate-500"}`}>
                                        {item.desc}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}

                    <div className="pt-6 px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                        Quick Shortcuts
                    </div>

                    <Link
                        to="/"
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
                    >
                        <FaHome className="text-base text-slate-400" />
                        <span>Public Homepage</span>
                    </Link>
                </div>

                {/* Admin User Footer in Sidebar */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <img
                            src={authUser?.img_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.username || "Admin")}&background=2563eb&color=fff`}
                            alt="Admin Avatar"
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20 shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-white truncate leading-tight">
                                {authUser?.username || "Admin"}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate">
                                {authUser?.email}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        title="Sign Out"
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    >
                        <FaSignOutAlt className="text-sm" />
                    </button>
                </div>
            </aside>

            {/* ================= MOBILE / CONTENT AREA ================= */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* Mobile Top Header */}
                <header className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                            <FaTruck className="text-sm" />
                        </div>
                        <span className="font-extrabold text-white text-base">
                            SendBD <span className="text-blue-400 text-xs font-semibold">Admin</span>
                        </span>
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
                    >
                        {sidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                    </button>
                </header>

                {/* Mobile Drawer Dropdown */}
                {sidebarOpen && (
                    <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                                        active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                                    }`}
                                >
                                    <Icon />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center px-2">
                            <Link to="/" className="text-xs text-blue-400 font-bold">Public Home</Link>
                            <button onClick={logout} className="text-xs text-rose-400 font-bold">Sign Out</button>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};

export default AdminLayout;