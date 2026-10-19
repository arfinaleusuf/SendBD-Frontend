import { useContext, useState } from "react";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { FaLock, FaShieldAlt, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [loading, setLoading] = useState(false);

    const { accessToken } = useContext(AuthContext);

    const handlePasswordChange = async (e) => {
        if (e) e.preventDefault();
        if (!currentPassword || !newPassword) {
            toast.error("Please fill in both fields");
            return;
        }

        const formdata = {
            current_password: currentPassword,
            new_password: newPassword,
        };

        try {
            setLoading(true);
            const res = await fetch(`${baseurl}/passwordChange`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formdata),
            });
            const data = await res.json();

            if (!res.ok) {
                toast.error(data?.detail || data?.message || "Failed to change password");
                return;
            }

            toast.success(data?.message || "Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-lg space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mx-auto shadow-sm">
                        <FaShieldAlt />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Change Password
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                        Protect your account by regularly updating to a strong, unique password.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6">
                    
                    {/* Security Tip Box */}
                    <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
                        <FaLock className="text-blue-500 mt-0.5 shrink-0" />
                        <div>
                            <span className="font-bold">Password Security:</span> Use at least 8 characters with a mix of letters, numbers, and symbols.
                        </div>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        
                        {/* Current Password */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Current Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <FaLock className="text-xs" />
                                </div>
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password"
                                    required
                                    className="w-full pl-9 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    {showCurrent ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <FaKey className="text-xs" />
                                </div>
                                <input
                                    type={showNew ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new strong password"
                                    required
                                    className="w-full pl-9 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    {showNew ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={!currentPassword || !newPassword || loading}
                                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-400 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>Updating Password...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaLock />
                                        <span>Update Password</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </form>

                    <div className="pt-2 text-center">
                        <Link
                            to="/user/profile"
                            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                        >
                            ← Back to Profile
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ChangePassword;