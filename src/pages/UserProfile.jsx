import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/BaseUrl";
import toast from "react-hot-toast";

const UserProfile = () => {

    const { authUser, accessToken} = useContext(AuthContext);


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {

        if (authUser) {
            setFirstName(authUser.firstname || "");
            setLastName(authUser.lastname || "");
            setUserName(authUser.username || "");
            setEmail(authUser.email || "");
        }
    }, [authUser]);

    const handleUpdateUser = async (e) => {
        e.preventDefault()

        const formdata = {
            firstname: firstName,
            lastname: lastName,
            username: userName,
            email
        }
        const res = await fetch(`${baseurl}/edituser`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })

        const data = await res.json()

        toast(data.message)
    }


    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
            <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
                <div className="card-body">

                    {/* Profile Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold">
                            My Profile
                        </h2>

                        <p className="text-base-content/60">
                            View and update your personal information
                        </p>
                    </div>

                    {/* Profile Form */}
                    <form className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Email
                                </span>
                            </label>

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                defaultValue={authUser?.email || ""}
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Username
                                </span>
                            </label>

                            <input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                defaultValue={authUser?.username || ""}
                                className="input input-bordered w-full"
                                placeholder="Enter your username"
                            />
                        </div>

                        {/* Firstname & Lastname */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        First Name
                                    </span>
                                </label>

                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    defaultValue={authUser?.firstname || ""}
                                    className="input input-bordered w-full"
                                    placeholder="Enter first name"
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Last Name
                                    </span>
                                </label>

                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    defaultValue={authUser?.lastname || ""}
                                    className="input input-bordered w-full"
                                    placeholder="Enter last name"
                                />
                            </div>

                        </div>

                        {/* Read Only Information */}
                        <div className="divider">Account Information</div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        User ID
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    value={authUser?.id || ""}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Role
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    value={authUser?.role || ""}
                                    className="input input-bordered w-full capitalize"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Status
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    value={authUser?.is_active ? "Active" : "Inactive"}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>

                        </div>

                        {/* Update Button */}
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleUpdateUser}
                                className="btn btn-primary px-8"
                            >
                                Update Profile
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;