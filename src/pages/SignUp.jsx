import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { baseurl } from "../services/BaseUrl";


const SignUp = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            username,
            firstname,
            lastname,
            password,
            role
        };

        try {
            const res = await fetch(`${baseurl}/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data?.detail || "Signup failed");
                return;
            }

            toast.success("Account created successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            console.error(error);
            toast.error("Server connection failed");
        }
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                    <p className="py-6 w-96">
                        Please Fill The Input Correctly
                    </p>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSignup}>
                            <fieldset className="fieldset">

                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <label className="label">Username</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <label className="label">First Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="First Name"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />

                                <label className="label">Last Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Last Name"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />

                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <label className="label">Role</label>
                                <select className="select select-bordered w-full" value={role} onChange={(e) => setRole(e.target.value)} >
                                    <option value="" disabled> Select Role </option>
                                    <option value="customer">Customer</option>
                                    <option value="rider">Rider</option>
                                    <option value="admin">Admin</option>
                                </select>

                                <div>
                                    <Link to={"/login"} className="link link-hover">
                                        Already Have an account?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-neutral mt-4"
                                >
                                    Sign Up
                                </button>

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;