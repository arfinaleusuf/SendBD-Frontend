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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.detail || "Failed to send OTP");
            }

            toast.success("OTP sent to your email");
            setStep(2);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${baseurl}/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.detail || "Invalid OTP");
            }
            toast.success("OTP verified successfully");
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    otp,
                    new_password: newPassword
                })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.detail || "Password reset failed");
            }
            toast.success("Password reset successfully");
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
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-base-200">

            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-6">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {step === 1 && <FaEnvelope className="text-2xl" />}
                        {step === 2 && <FaKey className="text-2xl" />}
                        {step === 3 && <FaLock className="text-2xl" />}
                    </div>

                    <h1 className="text-3xl font-bold">
                        {step === 1 && "Forgot Password?"}
                        {step === 2 && "Verify OTP"}
                        {step === 3 && "Reset Password"}
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        {step === 1 && "Enter your email to receive a verification code."}
                        {step === 2 && "Enter the OTP sent to your email address."}
                        {step === 3 && "Create a new password for your account."}
                    </p>

                </div>


                {/* Progress */}
                <div className="flex items-center justify-center gap-2 mb-6">

                    <div
                        className={`h-2 w-20 rounded-full ${
                            step >= 1 ? "bg-primary" : "bg-base-300"
                        }`}
                    />

                    <div
                        className={`h-2 w-20 rounded-full ${
                            step >= 2 ? "bg-primary" : "bg-base-300"
                        }`}
                    />

                    <div
                        className={`h-2 w-20 rounded-full ${
                            step >= 3 ? "bg-primary" : "bg-base-300"
                        }`}
                    />

                </div>


                {/* Card */}
                <div className="card bg-base-100 shadow-xl border border-base-300">

                    <div className="card-body">

                        {/* ================= STEP 1 ================= */}
                        {step === 1 && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendOTP();
                                }}
                            >

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Email Address
                                    </span>
                                </label>

                                <div className="relative">

                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                                    <input
                                        type="email"
                                        placeholder="Enter your registered email"
                                        className="input input-bordered w-full pl-11"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full mt-6"
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Sending OTP...
                                        </>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </button>

                            </form>
                        )}


                        {/* ================= STEP 2 ================= */}
                        {step === 2 && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleVerifyOTP();
                                }}
                            >

                                <div className="text-center mb-5">

                                    <p className="text-sm text-base-content/60">
                                        OTP sent to
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {email}
                                    </p>

                                </div>

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Verification Code
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="6"
                                    placeholder="Enter 6 digit OTP"
                                    className="input input-bordered w-full text-center text-2xl tracking-[8px] font-bold"
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(
                                            e.target.value.replace(
                                                /\D/g,
                                                ""
                                            )
                                        )
                                    }
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full mt-6"
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Verifying...
                                        </>
                                    ) : (
                                        "Verify OTP"
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="btn btn-ghost w-full mt-2"
                                >
                                    Change Email
                                </button>

                            </form>
                        )}


                        {/* ================= STEP 3 ================= */}
                        {step === 3 && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleResetPassword();
                                }}
                            >

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        New Password
                                    </span>
                                </label>

                                <div className="relative">

                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        className="input input-bordered w-full pl-11"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        required
                                    />

                                </div>


                                <label className="label mt-2">
                                    <span className="label-text font-semibold">
                                        Confirm Password
                                    </span>
                                </label>

                                <div className="relative">

                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="input input-bordered w-full pl-11"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        required
                                    />

                                </div>


                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full mt-6"
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Resetting...
                                        </>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>

                            </form>
                        )}

                    </div>
                </div>


                {/* Back to Login */}
                <div className="text-center mt-6">

                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                        <FaArrowLeft />
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ForgetPassword;
