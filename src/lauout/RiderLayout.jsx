import { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { 
    FaHome, 
    FaTasks, 
    FaSignOutAlt, 
    FaBars, 
    FaTimes, 
    FaBicycle
} from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { AuthContext } from "../context/AuthProvider";

const RiderLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { authUser, logout } = useContext(AuthContext);

    const navItems = [
        {
            path: "/rider/all-order",
            label: "Assigned Orders",
            icon: FaTasks,
            desc: "Pickup & deliver packages",
        },
        {
            path: "/rider/complete-order",
            label: "Complete an Order",
            icon: BiTask,
            desc: "Mark delivery fulfilled",
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
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                            <FaBicycle className="text-base" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tight text-white leading-tight">
                                Send<span className="text-emerald-500">BD</span>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                                Rider Portal
                            </span>
                        </div>
                    </Link>

                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
                    <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                        Deliveries Hub
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
                                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                                }`}
                            >
                                <Icon className={`text-base shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                                <div className="flex flex-col">
                                    <span>{item.label}</span>
                                    <span className={`text-[10px] font-normal leading-tight ${active ? "text-emerald-100" : "text-slate-500"}`}>
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

                {/* Rider User Footer in Sidebar */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <img
                            src={authUser?.img_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.username || "Rider")}&background=059669&color=fff`}
                            alt="Rider Avatar"
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20 shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-white truncate leading-tight">
                                {authUser?.username || "Rider"}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-semibold truncate">
                                Verified Rider
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
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                            <FaBicycle className="text-sm" />
                        </div>
                        <span className="font-extrabold text-white text-base">
                            SendBD <span className="text-emerald-400 text-xs font-semibold">Rider</span>
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
                                        active ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-800"
                                    }`}
                                >
                                    <Icon />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center px-2">
                            <Link to="/" className="text-xs text-emerald-400 font-bold">Public Home</Link>
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

export default RiderLayout;