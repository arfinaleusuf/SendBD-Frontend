import { useContext, useEffect, useState } from "react";
import { 
    FaBox, 
    FaMapMarkerAlt, 
    FaUser, 
    FaWeightHanging, 
    FaSearch, 
    FaTimes, 
    FaPlus, 
    FaTruck, 
    FaCheckCircle, 
    FaClock, 
    FaMoneyBillWave
} from "react-icons/fa";
import { Link } from "react-router";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const ViewAllCouriers = () => {
    const [couriers, setCouriers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [cancellingId, setCancellingId] = useState(null);

    const { accessToken } = useContext(AuthContext);

    useEffect(() => {
        if (!accessToken) return;
        let isMounted = true;
        fetch(`${baseurl}/my/couriers`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => {
                if (res.status === 404) return [];
                return res.json();
            })
            .then((data) => {
                if (isMounted) {
                    setCouriers(Array.isArray(data) ? data : []);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                if (isMounted) {
                    setCouriers([]);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [accessToken]);

    const handleCancelCourier = async (courierId) => {
        if (!window.confirm("Are you sure you want to cancel this courier booking?")) {
            return;
        }

        try {
            setCancellingId(courierId);
            const response = await fetch(`${baseurl}/courier/cancel/${courierId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to cancel courier");
            }

            toast.success("Courier shipment cancelled successfully");
            setCouriers((prevCouriers) =>
                prevCouriers.filter((courier) => courier.id !== courierId)
            );
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to cancel shipment");
        } finally {
            setCancellingId(null);
        }
    };

    // Derived statistics
    const totalCount = couriers.length;
    const pendingCount = couriers.filter(
        (c) => c.status?.toLowerCase() === "pending"
    ).length;
    const completedCount = couriers.filter(
        (c) => c.status?.toLowerCase() === "completed"
    ).length;
    const totalSpent = couriers.reduce(
        (sum, c) => sum + (Number(c.bill) || 0),
        0
    );

    // Filtering logic
    const filteredCouriers = couriers.filter((courier) => {
        const matchesStatus =
            statusFilter === "all" ||
            courier.status?.toLowerCase() === statusFilter.toLowerCase();

        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
            !query ||
            courier.id?.toString().includes(query) ||
            courier.receiver_name?.toLowerCase().includes(query) ||
            courier.sending_from?.toLowerCase().includes(query) ||
            courier.destination?.toLowerCase().includes(query);

        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase();
        if (s === "completed") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Delivered
                </span>
            );
        }
        if (s === "approved" || s === "in transit" || s === "on way") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    In Transit
                </span>
            );
        }
        if (s === "cancelled") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    Cancelled
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                Pending Pickup
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header & Primary Action */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                            <FaTruck />
                            Delivery Tracker
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            My Courier Shipments
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500">
                            Track, review, and manage all your sent courier parcels in real time.
                        </p>
                    </div>

                    <Link
                        to="/create-courier"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all self-start sm:self-auto"
                    >
                        <FaPlus className="text-xs" />
                        <span>Book New Courier</span>
                    </Link>
                </div>

                {/* Top Statistics Cards Strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg shrink-0">
                            <FaBox />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Total Bookings</p>
                            <p className="text-xl sm:text-2xl font-black text-slate-900">{totalCount}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg shrink-0">
                            <FaClock />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Pending</p>
                            <p className="text-xl sm:text-2xl font-black text-amber-600">{pendingCount}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                            <FaCheckCircle />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Completed</p>
                            <p className="text-xl sm:text-2xl font-black text-emerald-600">{completedCount}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg shrink-0">
                            <FaMoneyBillWave />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Total Spent</p>
                            <p className="text-xl sm:text-2xl font-black text-purple-600">৳{totalSpent}</p>
                        </div>
                    </div>

                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <FaSearch className="text-xs" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by ID, receiver, or city..."
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                            >
                                <FaTimes className="text-xs" />
                            </button>
                        )}
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                        {["all", "pending", "approved", "completed"].map((st) => (
                            <button
                                key={st}
                                onClick={() => setStatusFilter(st)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
                                    statusFilter === st
                                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                                }`}
                            >
                                {st === "all" ? "All Shipments" : st}
                            </button>
                        ))}
                    </div>

                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/80 shadow-sm space-y-4">
                        <span className="loading loading-spinner loading-lg text-blue-600"></span>
                        <p className="text-sm font-semibold text-slate-500">Loading your courier records...</p>
                    </div>
                ) : filteredCouriers.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-200/80 shadow-sm max-w-xl mx-auto space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mx-auto">
                            <FaBox />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900">
                            {searchQuery || statusFilter !== "all"
                                ? "No matching couriers found"
                                : "You haven't sent any couriers yet"}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                            {searchQuery || statusFilter !== "all"
                                ? "Try adjusting your search keyword or switching your status filter."
                                : "Ready to ship? Book your first parcel in less than 60 seconds with doorstep pickup."}
                        </p>
                        <div className="pt-2">
                            <Link
                                to="/create-courier"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all"
                            >
                                <FaPlus />
                                <span>Send Your First Parcel</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Shipments Display */
                    <div className="space-y-4">
                        
                        {/* Desktop Table View (Hidden on mobile) */}
                        <div className="hidden lg:block overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                            <th className="py-4 px-6">ID & Parcel</th>
                                            <th className="py-4 px-6">Route (From → To)</th>
                                            <th className="py-4 px-6">Receiver</th>
                                            <th className="py-4 px-6">Weight</th>
                                            <th className="py-4 px-6">Total Bill</th>
                                            <th className="py-4 px-6">Status</th>
                                            <th className="py-4 px-6 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                                        {filteredCouriers.map((courier) => (
                                            <tr key={courier.id} className="hover:bg-slate-50/70 transition-colors">
                                                
                                                {/* Courier ID */}
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0">
                                                            <FaBox />
                                                        </div>
                                                        <div>
                                                            <span className="font-extrabold text-slate-900">
                                                                #{courier.id}
                                                            </span>
                                                            <p className="text-[10px] text-slate-400">Standard Delivery</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Route */}
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col gap-1 max-w-[220px]">
                                                        <span className="flex items-center gap-1.5 text-slate-800 font-semibold truncate">
                                                            <FaMapMarkerAlt className="text-blue-500 text-[11px] shrink-0" />
                                                            {courier.sending_from}
                                                        </span>
                                                        <div className="pl-3 text-[10px] text-slate-400 leading-none">↓</div>
                                                        <span className="flex items-center gap-1.5 text-slate-800 font-semibold truncate">
                                                            <FaMapMarkerAlt className="text-emerald-500 text-[11px] shrink-0" />
                                                            {courier.destination}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Receiver */}
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                                                        <FaUser className="text-slate-400 text-xs shrink-0" />
                                                        <span className="truncate max-w-[140px]">{courier.receiver_name}</span>
                                                    </div>
                                                </td>

                                                {/* Weight */}
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                                        <FaWeightHanging className="text-slate-400 text-xs" />
                                                        <span>{courier.weight} KG</span>
                                                    </div>
                                                </td>

                                                {/* Bill */}
                                                <td className="py-4 px-6">
                                                    <span className="text-base font-extrabold text-slate-900">
                                                        ৳{courier.bill}
                                                    </span>
                                                </td>

                                                {/* Status */}
                                                <td className="py-4 px-6">
                                                    {getStatusBadge(courier.status)}
                                                </td>

                                                {/* Actions */}
                                                <td className="py-4 px-6 text-right">
                                                    {courier.status?.toLowerCase() === "pending" ? (
                                                        <button
                                                            onClick={() => handleCancelCourier(courier.id)}
                                                            disabled={cancellingId === courier.id}
                                                            className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors disabled:opacity-50"
                                                        >
                                                            {cancellingId === courier.id ? "Cancelling..." : "Cancel"}
                                                        </button>
                                                    ) : (
                                                        <span className="text-slate-400 text-[11px] italic">
                                                            No actions
                                                        </span>
                                                    )}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Cards View (Visible on small & tablet screens) */}
                        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredCouriers.map((courier) => (
                                <div
                                    key={courier.id}
                                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                                                <FaBox />
                                            </div>
                                            <span className="font-extrabold text-slate-900 text-sm">
                                                Courier #{courier.id}
                                            </span>
                                        </div>
                                        {getStatusBadge(courier.status)}
                                    </div>

                                    {/* Route visualizer */}
                                    <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                                            <FaMapMarkerAlt className="text-blue-500 shrink-0" />
                                            <span className="truncate">{courier.sending_from}</span>
                                        </div>
                                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                                            <FaMapMarkerAlt className="text-emerald-500 shrink-0" />
                                            <span className="truncate">{courier.destination}</span>
                                        </div>
                                    </div>

                                    {/* Details row */}
                                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-slate-100">
                                        <div>
                                            <span className="text-[10px] text-slate-400 block">Receiver</span>
                                            <span className="font-bold text-slate-800 truncate block">
                                                {courier.receiver_name}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-400 block">Weight</span>
                                            <span className="font-bold text-slate-800 block">
                                                {courier.weight} KG
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-400 block">Fare</span>
                                            <span className="font-extrabold text-blue-600 block">
                                                ৳{courier.bill}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mobile action */}
                                    {courier.status?.toLowerCase() === "pending" && (
                                        <div className="pt-2">
                                            <button
                                                onClick={() => handleCancelCourier(courier.id)}
                                                disabled={cancellingId === courier.id}
                                                className="w-full py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs border border-rose-200 transition-colors"
                                            >
                                                {cancellingId === courier.id ? "Cancelling..." : "Cancel Courier"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ViewAllCouriers;