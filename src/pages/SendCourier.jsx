import { useContext, useState } from "react";
import { 
    FaMapMarkerAlt, 
    FaUser, 
    FaWeightHanging, 
    FaTruck, 
    FaShieldAlt, 
    FaClock, 
    FaReceipt, 
    FaInfoCircle
} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/BaseUrl";
import { Link } from "react-router";

const SendCourier = () => {
    const { accessToken } = useContext(AuthContext);

    const [sendingFrom, setSendingFrom] = useState("");
    const [destination, setDestination] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [weight, setWeight] = useState("");
    const [loading, setLoading] = useState(false);

    // Common city shortcuts for quick filling
    const popularCities = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal"];

    // Dynamic cost estimator
    const parsedWeight = parseFloat(weight) || 0;
    const baseFare = 60;
    const extraWeightFare = parsedWeight > 1 ? Math.round((parsedWeight - 1) * 30) : 0;
    const estimatedTotal = parsedWeight > 0 ? baseFare + extraWeightFare : baseFare;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sendingFrom.trim() || !destination.trim() || !receiverName.trim() || !weight) {
            toast.error("Please fill in all courier details");
            return;
        }

        const courierData = {
            sending_from: sendingFrom.trim(),
            destination: destination.trim(),
            receiver_name: receiverName.trim(),
            weight: Number(weight),
        };

        try {
            setLoading(true);

            const response = await fetch(`${baseurl}/create_courier`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(courierData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to create courier");
            }

            toast.success("Courier shipment booked successfully!");
            setSendingFrom("");
            setDestination("");
            setReceiverName("");
            setWeight("");
        } catch (error) {
            console.error("Courier Error:", error);
            toast.error(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Banner */}
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                        <FaTruck className="text-blue-600" />
                        Doorstep Delivery Service
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Book a New Courier Shipment
                    </h1>
                    <p className="text-sm sm:text-base text-slate-500">
                        Fill in your parcel information below for fast doorstep pickup and nationwide delivery.
                    </p>
                </div>

                {/* 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Booking Form */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Section 1: Route Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-blue-500" />
                                    1. Route & Addresses
                                </h3>

                                {/* Pickup Location */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Pickup Address / Sending From
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-500">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <input
                                            type="text"
                                            value={sendingFrom}
                                            onChange={(e) => setSendingFrom(e.target.value)}
                                            placeholder="e.g. Dhanmondi 27, Dhaka"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    {/* City quick buttons */}
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        <span className="text-[11px] text-slate-400 py-0.5">Quick fill:</span>
                                        {popularCities.map((city) => (
                                            <button
                                                key={`from-${city}`}
                                                type="button"
                                                onClick={() => setSendingFrom(city)}
                                                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-medium transition-colors"
                                            >
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Destination */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Destination Address / Receiver City
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-500">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <input
                                            type="text"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            placeholder="e.g. GEC Circle, Chattogram"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    {/* City quick buttons */}
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        <span className="text-[11px] text-slate-400 py-0.5">Quick fill:</span>
                                        {popularCities.map((city) => (
                                            <button
                                                key={`dest-${city}`}
                                                type="button"
                                                onClick={() => setDestination(city)}
                                                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 font-medium transition-colors"
                                            >
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 2: Parcel & Receiver Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                    <FaUser className="text-blue-500" />
                                    2. Receiver & Package Info
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Receiver Name */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                            Receiver Full Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <FaUser />
                                            </div>
                                            <input
                                                type="text"
                                                value={receiverName}
                                                onChange={(e) => setReceiverName(e.target.value)}
                                                placeholder="e.g. Tanvir Ahmed"
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Weight in KG */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                            Package Weight (KG)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <FaWeightHanging />
                                            </div>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0.1"
                                                max="100"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                placeholder="e.g. 1.5"
                                                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                required
                                            />
                                            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-slate-400 pointer-events-none">
                                                KG
                                            </span>
                                        </div>
                                        {/* Weight shortcuts */}
                                        <div className="mt-2 flex items-center gap-1.5">
                                            {[0.5, 1, 2, 5].map((w) => (
                                                <button
                                                    key={`w-${w}`}
                                                    type="button"
                                                    onClick={() => setWeight(w.toString())}
                                                    className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                                                        weight === w.toString()
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                                                    }`}
                                                >
                                                    {w} KG
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notice banner */}
                            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
                                <FaInfoCircle className="text-blue-500 mt-0.5 shrink-0 text-sm" />
                                <div>
                                    <span className="font-bold">Next Steps:</span> Once submitted, your parcel is registered in <strong>Pending</strong> status. A nearby rider will be assigned to pick up the parcel from your address.
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-400 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>Confirming Shipment...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaTruck />
                                        <span>Confirm & Book Courier</span>
                                    </>
                                )}
                            </button>

                        </form>
                    </div>

                    {/* Right Column: Live Fare Calculator & Benefits Card */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Instant Fare Summary Card */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                                    <FaReceipt className="text-blue-600" />
                                    Estimated Fare Summary
                                </h3>
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                                    Live Calculator
                                </span>
                            </div>

                            {/* Dynamic Route Display */}
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0 font-bold">
                                        A
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-medium text-slate-400 uppercase">From</p>
                                        <p className="text-xs font-bold text-slate-800 truncate">
                                            {sendingFrom || "Pickup point not set"}
                                        </p>
                                    </div>
                                </div>

                                <div className="pl-3.5 border-l-2 border-dashed border-slate-300 ml-3.5 h-4"></div>

                                <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">
                                        B
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-medium text-slate-400 uppercase">To</p>
                                        <p className="text-xs font-bold text-slate-800 truncate">
                                            {destination || "Destination not set"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="space-y-2.5 text-xs text-slate-600">
                                <div className="flex justify-between items-center">
                                    <span>Base Courier Rate (First 1 KG)</span>
                                    <span className="font-semibold text-slate-800">৳{baseFare}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>
                                        Extra Weight Charge ({parsedWeight > 1 ? (parsedWeight - 1).toFixed(1) : 0} KG)
                                    </span>
                                    <span className="font-semibold text-slate-800">৳{extraWeightFare}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Doorstep Rider Collection</span>
                                    <span className="font-semibold text-emerald-600">FREE</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Transit Insurance & Tracking</span>
                                    <span className="font-semibold text-emerald-600">FREE</span>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-900">Estimated Total Bill</span>
                                    <span className="text-2xl font-black text-blue-600">৳{estimatedTotal}</span>
                                </div>
                            </div>

                            {/* Service Guarantee Badges */}
                            <div className="space-y-2.5 pt-2 border-t border-slate-100">
                                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                                    <FaClock className="text-blue-500 shrink-0" />
                                    <span>Estimated delivery: <strong>24 to 48 hours</strong></span>
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                                    <FaShieldAlt className="text-emerald-500 shrink-0" />
                                    <span>Guaranteed safety with tamper-proof handling</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Link Card */}
                        <div className="p-5 rounded-3xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white flex items-center justify-between">
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold">Already sent a courier?</h4>
                                <p className="text-xs text-slate-400">Track and view all your previous bookings</p>
                            </div>
                            <Link
                                to="/view-all-couriers"
                                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 transition-colors"
                            >
                                View Couriers
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default SendCourier;