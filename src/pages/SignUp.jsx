import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { baseurl } from "../services/BaseUrl";
import { 
    FaTruck, 
    FaUser, 
    FaEnvelope, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaCloudUploadAlt, 
    FaCheckCircle, 
    FaBicycle, 
    FaShieldAlt,
    FaArrowRight
} from "react-icons/fa";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");
    const [showPassword, setShowPassword] = useState(false);

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    // Handle local image file selection
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    // Upload to ImgBB
    const handleUpload = async () => {
        if (!file) {
            toast.error("Please choose an image file first.");
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error("Image upload failed.");
            }

            const uploadedImageUrl = data.data.display_url;
            setImageUrl(uploadedImageUrl);
            toast.success("Profile photo uploaded!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    // Signup form submit
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            toast.error("Please upload your profile photo first.");
            return;
        }

        const userData = {
            email: email.trim(),
            username: username.trim(),
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            password,
            role,
            img_url: imageUrl,
        };

        try {
            setSubmitting(true);
            const res = await fetch(`${baseurl}/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data?.detail || "Signup failed. Please try again.");
                return;
            }

            toast.success("Account created successfully! Welcome to SendBD.");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.error(error);
            toast.error("Server connection error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl">
                
                {/* Brand Header */}
                <div className="text-center mb-8 space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2.5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                            <FaTruck className="text-xl" />
                        </div>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Create Your SendBD Account
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                        Join SendBD to ship parcels across Bangladesh with real-time tracking and doorstep pickup.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-8">
                    <form onSubmit={handleSignup} className="space-y-6">
                        
                        {/* Role Selection Cards */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                I am registering as a:
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: "customer", label: "Customer", icon: FaUser, desc: "Send & track parcels" },
                                    { id: "rider", label: "Rider", icon: FaBicycle, desc: "Pickup & deliver" },
                                    { id: "admin", label: "Admin", icon: FaShieldAlt, desc: "Manage operations" },
                                ].map((item) => {
                                    const Icon = item.icon;
                                    const selected = role === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setRole(item.id)}
                                            className={`p-3.5 rounded-2xl border text-center transition-all ${
                                                selected
                                                    ? "border-blue-600 bg-blue-50/70 text-blue-700 shadow-sm"
                                                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600"
                                            }`}
                                        >
                                            <Icon className={`mx-auto text-base mb-1.5 ${selected ? "text-blue-600" : "text-slate-400"}`} />
                                            <div className="font-bold text-xs">{item.label}</div>
                                            <div className="text-[10px] text-slate-400 hidden sm:block mt-0.5">{item.desc}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Name Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    placeholder="e.g. Arfin"
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    placeholder="e.g. Al Eusuf"
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Username & Email */}
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
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="arfin123"
                                        autoComplete="username"
                                        required
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
                                        placeholder="name@example.com"
                                        autoComplete="email"
                                        required
                                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <FaLock className="text-xs" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a strong password"
                                    autoComplete="new-password"
                                    required
                                    className="w-full pl-9 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
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

                        {/* Profile Image Section */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                            <label className="block text-xs font-bold text-slate-700">
                                Profile Photo <span className="text-rose-500">*</span>
                            </label>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-70" />
                                    ) : (
                                        <FaUser className="text-xl text-slate-400" />
                                    )}
                                </div>

                                <div className="flex-1 w-full space-y-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                    />
                                    
                                    {file && !imageUrl && (
                                        <button
                                            type="button"
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
                                        >
                                            {uploading ? (
                                                <>
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                    <span>Uploading to Cloud...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaCloudUploadAlt />
                                                    <span>Click to Confirm Photo Upload</span>
                                                </>
                                            )}
                                        </button>
                                    )}

                                    {imageUrl && (
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                                            <FaCheckCircle />
                                            <span>Photo uploaded successfully!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={submitting || uploading}
                                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Complete Registration</span>
                                        <FaArrowRight className="text-xs" />
                                    </>
                                )}
                            </button>
                        </div>

                    </form>

                    {/* Footer inside card */}
                    <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Sign In here
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SignUp;
