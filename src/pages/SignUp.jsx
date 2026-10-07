import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { baseurl } from "../services/BaseUrl";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");


    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;


    // Select image
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);
    };


    // Upload image to ImgBB
    const handleUpload = async () => {

        if (!file) {
            toast.error("Please select an image first.");
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!data.success) {
                throw new Error("Image upload failed.");
            }

            const uploadedImageUrl = data.data.display_url;

            setImageUrl(uploadedImageUrl);

            toast.success("Image uploaded successfully!");

        } catch (error) {

            console.error(error);
            toast.error("Failed to upload image.");

        } finally {

            setUploading(false);
        }
    };


    // Signup
    const handleSignup = async (e) => {

        e.preventDefault();

        // Image must be uploaded first
        if (!imageUrl) {
            toast.error("Please upload your profile image first.");
            return;
        }

        const userData = {
            email,
            username,
            firstname,
            lastname,
            password,
            role,
            img_url: imageUrl
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
        <div className="hero bg-base-200 min-h-screen py-10">

            <div className="hero-content flex-col w-full">

                {/* Heading */}
                <div className="text-center">

                    <h1 className="text-5xl font-bold">
                        Sign Up Now!
                    </h1>

                    <p className="py-6">
                        Please Fill The Input Correctly
                    </p>

                </div>


                {/* Signup Card */}
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">

                    <div className="card-body">

                        <form onSubmit={handleSignup}>

                            <fieldset className="fieldset">

                                {/* Email */}
                                <label className="label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />


                                {/* Username */}
                                <label className="label">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />


                                {/* First Name */}
                                <label className="label">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="First Name"
                                    value={firstname}
                                    onChange={(e) =>
                                        setFirstname(e.target.value)
                                    }
                                    required
                                />


                                {/* Last Name */}
                                <label className="label">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Last Name"
                                    value={lastname}
                                    onChange={(e) =>
                                        setLastname(e.target.value)
                                    }
                                    required
                                />


                                {/* Password */}
                                <label className="label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="input input-bordered w-full"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />


                                {/* Role */}
                                <label className="label">
                                    Role
                                </label>

                                <select
                                    className="select select-bordered w-full"
                                    value={role}
                                    onChange={(e) =>
                                        setRole(e.target.value)
                                    }
                                    required
                                >

                                    <option value="" disabled>
                                        Select Role
                                    </option>

                                    <option value="customer">
                                        Customer
                                    </option>

                                    <option value="rider">
                                        Rider
                                    </option>

                                    <option value="admin">
                                        Admin
                                    </option>

                                </select>


                                {/* Profile Image */}
                                <label className="label mt-2">
                                    Profile Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                    onChange={handleImageChange}
                                    required
                                />


                                {/* Upload Button */}
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={!file || uploading}
                                    className="btn btn-outline mt-2"
                                >

                                    {uploading
                                        ? "Uploading..."
                                        : imageUrl
                                            ? "Image Uploaded"
                                            : "Upload Image"}

                                </button>


                                {/* Image Preview */}
                                {imageUrl && (

                                    <div className="flex justify-center mt-4">

                                        <img
                                            src={imageUrl}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border"
                                        />

                                    </div>

                                )}


                                {/* Login Link */}
                                <div className="mt-4">

                                    <Link
                                        to="/login"
                                        className="link link-hover"
                                    >
                                        Already Have an account?
                                    </Link>

                                </div>


                                {/* Signup Button */}
                                <button
                                    type="submit"
                                    className="btn btn-neutral mt-4"
                                    disabled={uploading}
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
