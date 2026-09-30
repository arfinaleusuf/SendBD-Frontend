import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { baseurl } from "../services/BaseUrl";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

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
                toast.error(
                    data.detail || "Username or password is incorrect"
                );
                return;
            }
            const accessToken = data?.access_token;

            if (!accessToken) {
                toast.error("Login failed. Access token not found");
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
                toast.error("Failed to load user information");
                return;
            }
            setAuthUser(userData);
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again");
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

            <div className="w-full max-w-md">

                {/* Heading */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                        Login now!
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-base-content/70">
                        Please enter your credentials
                    </p>
                </div>

                {/* Login Card */}
                <div className="card bg-base-100 shadow-2xl w-full">
                    <div className="card-body p-5 sm:p-7 md:p-8">

                        <form onSubmit={handleLogin}>

                            {/* Username */}
                            <fieldset className="fieldset">

                                <label className="label">
                                    <span className="label-text">
                                        Username
                                    </span>
                                </label>

                                <input
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                />

                                {/* Password */}
                                <label className="label mt-2">
                                    <span className="label-text">
                                        Password
                                    </span>
                                </label>

                                <input
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />

                                {/* Links */}
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-3 text-sm">

                                    <Link
                                        to="/signup"
                                        className="link link-hover"
                                    >
                                        Don't have an account?
                                    </Link>

                                    <Link
                                        to="/forget-password"
                                        className="link link-hover"
                                    >
                                        Forgot Password?
                                    </Link>

                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="btn btn-neutral w-full mt-5"
                                >
                                    Login
                                </button>

                            </fieldset>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;