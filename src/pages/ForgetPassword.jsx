import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaKey, FaArrowLeft } from "react-icons/fa";
import { baseurl } from "../services/BaseUrl";
import { Link } from "react-router";

const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        try {
            setLoading(true);

            const res = await fetch(`${baseurl}/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.detail || "Failed to send OTP");
            }

            toast.success("OTP sent to your email address!");
            setStep(2);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp) {
            toast.error("Please enter the 6-digit OTP");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${baseurl}/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.trim(),
                    otp: otp.trim(),
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.detail || "Invalid or expired OTP");
            }
            toast.success("OTP verified successfully!");
            setStep(3);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            toast.error("Please enter both passwords");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);

            const res = await fetch(`${baseurl}/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.trim(),
                    otp: otp.trim(),
                    new_password: newPassword,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.detail || "Password reset failed");
            }
            toast.success("Password reset successfully! Please log in.");
            setEmail("");
            setOtp("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mx-auto shadow-sm">
                        {step === 1 && <FaEnvelope />}
                        {step === 2 && <FaKey />}
                        {step === 3 && <FaLock />}
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {step === 1 && "Reset Your Password"}
                        {step === 2 && "Enter OTP Verification"}
                        {step === 3 && "Set New Password"}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
                        {step === 1 && "Enter your registered email to receive a secure recovery code."}
                        {step === 2 && "We sent a 6-digit verification code to your email."}
                        {step === 3 && "Choose a new strong password for your SendBD account."}
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                step === s
                                    ? "w-12 bg-blue-600"
                                    : step > s
                                    ? "w-8 bg-emerald-500"
                                    : "w-8 bg-slate-200"
                            }`}
                        />
                    ))}
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6">
                    
                    {/* STEP 1: Enter Email */}
                    {step === 1 && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendOTP();
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Registered Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <FaEnvelope className="text-xs" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-400 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>Sending OTP Code...</span>
                                    </>
                                ) : (
                                    <span>Send Verification Code</span>
                                )}
                            </button>
                        </form>
                    )}

                    {/* STEP 2: Verify OTP */}
                    {step === 2 && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleVerifyOTP();
                            }}
                            className="space-y-5"
                        >
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                                <span className="text-[11px] text-slate-400 block">Code sent to:</span>
                                <span className="text-xs font-bold text-slate-800">{email}</span>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 text-center">
                                    Enter 6-Digit OTP
                                </label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="6"
                                    placeholder="• • • • • •"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                    required
                                    className="w-full py-3 text-center text-2xl tracking-[12px] font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-400 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>Verifying...</span>
                                    </>
                                ) : (
                                    <span>Verify OTP</span>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                Change email address
                            </button>
                        </form>
                    )}

                    {/* STEP 3: Reset Password */}
                    {step === 3 && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleResetPassword();
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <FaLock className="text-xs" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <FaLock className="text-xs" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-400 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>Resetting Password...</span>
                                    </>
                                ) : (
                                    <span>Reset Password & Finish</span>
                                )}
                            </button>
                        </form>
                    )}

                </div>

                {/* Back to Login Link */}
                <div className="text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Return to Sign In</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForgetPassword;
