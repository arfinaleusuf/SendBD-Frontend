import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/BaseUrl";
import toast from "react-hot-toast";
import { 
    FaUser, 
    FaEnvelope, 
    FaLock, 
    FaCheckCircle, 
    FaBox,
    FaSave
} from "react-icons/fa";
import { Link } from "react-router";

const UserProfile = () => {
    const { authUser, accessToken, setAuthUser } = useContext(AuthContext);

    const [firstName, setFirstName] = useState(authUser?.firstname || "");
    const [lastName, setLastName] = useState(authUser?.lastname || "");
    const [userName, setUserName] = useState(authUser?.username || "");
    const [email, setEmail] = useState(authUser?.email || "");
    const [img, setImg] = useState(authUser?.img_url || "");
    const [saving, setSaving] = useState(false);
    const [prevUserId, setPrevUserId] = useState(authUser?.id);

    if (authUser && authUser.id !== prevUserId) {
        setPrevUserId(authUser.id);
        setFirstName(authUser.firstname || "");
        setLastName(authUser.lastname || "");
        setUserName(authUser.username || "");
        setEmail(authUser.email || "");
        setImg(authUser.img_url || "");
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setSaving(true);

        const formdata = {
            firstname: firstName.trim(),
            lastname: lastName.trim(),
            username: userName.trim(),
            email: email.trim(),
        };

        try {
            const res = await fetch(`${baseurl}/edituser`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || data.detail || "Failed to update profile");
                return;
            }

            toast.success(data.message || "Profile updated successfully!");
            // Update authUser context state
            if (setAuthUser && authUser) {
                setAuthUser({
                    ...authUser,
                    ...formdata,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error while updating profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Account Settings & Profile
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500">
                        Manage your personal details, credentials, and review account status.
                    </p>
                </div>

                {/* Profile Overview Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative">
                        <img
                            src={
                                img ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    userName || "User"
                                )}&background=2563eb&color=fff&size=128`
                            }
                            alt={userName}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-blue-500/10 shadow-md"
                        />
                        <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>

                    <div className="text-center sm:text-left flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                                {firstName || lastName ? `${firstName} ${lastName}` : userName}
                            </h2>
                            <span className="inline-block px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200 self-center sm:self-auto">
                                {authUser?.role || "Customer"}
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                            {email} • <span className="text-slate-400">@{userName}</span>
                        </p>

                        <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                            <Link
                                to="/change-password"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                            >
                                <FaLock className="text-slate-500 text-[10px]" />
                                Change Password
                            </Link>

                            <Link
                                to="/view-all-couriers"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                            >
                                <FaBox className="text-slate-500 text-[10px]" />
                                My Couriers
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Form */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-8">
                    <form onSubmit={handleUpdateUser} className="space-y-6">
                        
                        <div>
                            <h3 className="text-base font-extrabold text-slate-900 mb-1">
                                Personal Information
                            </h3>
                            <p className="text-xs text-slate-400">
                                Update the personal details associated with your SendBD account.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <FaUser className="text-xs" />
                                    </div>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Username"
                                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <FaEnvelope className="text-xs" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Read-Only Account Metadata */}
                        <div className="pt-4 border-t border-slate-100">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Account Metadata & Status
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <span className="text-[11px] font-medium text-slate-400 block">User ID</span>
                                    <span className="text-xs font-bold text-slate-800 font-mono">
                                        #{authUser?.id || "N/A"}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <span className="text-[11px] font-medium text-slate-400 block">Role</span>
                                    <span className="text-xs font-bold text-slate-800 capitalize">
                                        {authUser?.role || "Customer"}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <span className="text-[11px] font-medium text-slate-400 block">Account Status</span>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                                        <FaCheckCircle className="text-[10px]" />
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Save Changes Button */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-blue-400 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        <span>Saving Changes...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSave />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;