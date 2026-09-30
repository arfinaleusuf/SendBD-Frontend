import { useContext, useState } from "react";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { FaLock, FaShieldAlt, FaKey } from "react-icons/fa";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { accessToken } = useContext(AuthContext)

    const handlePasswordChange = async () => {

        const formdata = {
            current_password: currentPassword,
            new_password: newPassword
        }

        const res = await fetch(`${baseurl}/passwordChange`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(formdata)
        })
        const data = await res.json();
        console.log(data)
        toast(data?.message || data?.detail)
    }

    return (
        <div className="min-h-screen bg-base-200 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto flex w-full max-w-xl flex-col items-center">

                {/* Header */}
                <div className="mb-6 w-full text-center">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg sm:h-16 sm:w-16">
                        <FaShieldAlt className="text-xl sm:text-2xl" />
                    </div>

                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Change Password
                    </h1>

                    <p className="mt-2 px-2 text-sm text-base-content/60 sm:text-base">
                        Keep your account secure by updating your password
                    </p>

                </div>


                {/* Card */}
                <div className="w-full rounded-2xl border border-base-300 bg-base-100 shadow-xl">

                    <div className="p-5 sm:p-7 md:p-8">

                        {/* Security Info */}
                        <div className="mb-6 flex w-full items-start gap-3 rounded-xl bg-primary/10 p-4">

                            <FaLock className="mt-1 shrink-0 text-primary" />

                            <div className="min-w-0">

                                <p className="font-semibold">
                                    Password Security
                                </p>

                                <p className="mt-1 text-xs leading-5 text-base-content/60 sm:text-sm">
                                    Choose a strong password that you don't
                                    use anywhere else.
                                </p>

                            </div>

                        </div>


                        {/* Current Password */}
                        <div className="form-control w-full">

                            <label className="mb-2 block">
                                <span className="text-sm font-medium">
                                    Current Password
                                </span>
                            </label>

                            <label className="input input-bordered flex h-12 w-full items-center gap-3 focus-within:input-primary">

                                <FaLock className="shrink-0 text-base-content/40" />

                                <input
                                    type="password"
                                    placeholder="Enter your current password"
                                    className="min-w-0 w-full bg-transparent outline-none"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                />

                            </label>

                        </div>


                        {/* New Password */}
                        <div className="form-control mt-5 w-full">

                            <label className="mb-2 block">
                                <span className="text-sm font-medium">
                                    New Password
                                </span>
                            </label>

                            <label className="input input-bordered flex h-12 w-full items-center gap-3 focus-within:input-primary">

                                <FaKey className="shrink-0 text-base-content/40" />

                                <input
                                    type="password"
                                    placeholder="Enter your new password"
                                    className="min-w-0 w-full bg-transparent outline-none"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />

                            </label>
                        </div>


                        {/* Button */}
                        <button
                            onClick={handlePasswordChange}
                            disabled={
                                !currentPassword || !newPassword
                            }
                            className="btn btn-primary mt-6 h-12 w-full"
                        >
                            <FaLock />
                            Change Password
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ChangePassword;