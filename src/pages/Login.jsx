import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { baseurl } from "../services/BaseUrl";
import { 
    FaTruck, 
    FaUser, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaArrowRight, 
    FaShieldAlt 
} from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formdata = new URLSearchParams();
            formdata.append("username", username);
            formdata.append("password", password);

            const res = await fetch(`${baseurl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formdata,
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.detail || "Invalid username or password");
                return;
            }

            const accessToken = data?.access_token;
            if (!accessToken) {
                toast.error("Login failed. Access token not received.");
                return;
            }

            localStorage.setItem("access_token", accessToken);

            const userRes = await fetch(`${baseurl}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const userData = await userRes.json();
            if (!userRes.ok || !userData.id) {
                localStorage.removeItem("access_token");
                toast.error("Failed to load user profile");
                return;
            }

            setAuthUser(userData);
            toast.success(`Welcome back, ${userData.firstname || userData.username}!`);
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                
                {/* Brand Header */}
                <div className="text-center mb-8 space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2.5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                            <FaTruck className="text-xl" />
                        </div>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
                        Enter your account credentials to access your SendBD courier dashboard.
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        
                        {/* Username Field */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <FaUser className="text-sm" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                    disabled={loading}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold text-slate-700">
                                    Password
                                </label>
                                <Link
                                    to="/forget-password"
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <FaLock className="text-sm" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    disabled={loading}
                                    required
                                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-400 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In to SendBD</span>
                                        <FaArrowRight className="text-xs" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer inside Card */}
                    <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                        Don't have an account yet?{" "}
                        <Link
                            to="/signup"
                            className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Create an Account
                        </Link>
                    </div>
                </div>

                {/* Security Trust Strip */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <FaShieldAlt className="text-emerald-500" />
                    <span>256-bit encrypted secure authentication</span>
                </div>

            </div>
        </div>
    );
};

export default Login;