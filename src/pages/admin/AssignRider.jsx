import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaBox, FaUser, FaMotorcycle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";

const AssignRider = () => {
    const { accessToken } = useContext(AuthContext);

    const [orderId, setOrderId] = useState("");
    const [riderId, setRiderId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAssignRider = async (e) => {
        e.preventDefault();

        if (!orderId || !riderId) {
            toast.error("Please enter Order ID and Rider ID");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(
                `${baseurl}/admin/assign_rider/${orderId}/${riderId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || "Failed to assign rider");
            }
            toast.success(data.message || "Rider assigned successfully");

            setOrderId("");
            setRiderId("");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-6 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FaMotorcycle className="text-2xl" />
                    </div>

                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Assign Rider
                    </h1>

                    <p className="mt-2 text-sm text-base-content/60">
                        Assign a rider to an approved courier order
                    </p>
                </div>

                {/* Card */}
                <div className="card border border-base-300 bg-base-100 shadow-lg">
                    <div className="card-body p-5 sm:p-8">

                        <form onSubmit={handleAssignRider}>

                            {/* Order ID */}
                            <div className="form-control mb-5">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Order ID
                                    </span>
                                </label>

                                <label className="input input-bordered flex w-full items-center gap-3">
                                    <FaBox className="text-base-content/50" />

                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Enter order ID"
                                        value={orderId}
                                        onChange={(e) =>
                                            setOrderId(e.target.value)
                                        }
                                        className="grow"
                                    />
                                </label>

                                <label className="label">
                                    <span className="label-text-alt text-base-content/50">
                                        Enter the courier order ID
                                    </span>
                                </label>
                            </div>

                            {/* Rider ID */}
                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Rider ID
                                    </span>
                                </label>

                                <label className="input input-bordered flex w-full items-center gap-3">
                                    <FaUser className="text-base-content/50" />

                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Enter rider ID"
                                        value={riderId}
                                        onChange={(e) =>
                                            setRiderId(e.target.value)
                                        }
                                        className="grow"
                                    />
                                </label>

                                <label className="label">
                                    <span className="label-text-alt text-base-content/50">
                                        Enter the rider's user ID
                                    </span>
                                </label>
                            </div>

                            {/* Info */}
                            <div className="alert mb-6 bg-base-200">
                                <FaMotorcycle className="text-primary" />

                                <span className="text-sm">
                                    Only approved courier orders can be
                                    assigned to a rider.
                                </span>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Assigning...
                                    </>
                                ) : (
                                    <>
                                        <FaMotorcycle />
                                        Assign Rider
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom note */}
                <p className="mt-4 text-center text-xs text-base-content/50">
                    Make sure the Order ID is approved and the Rider ID
                    belongs to a registered rider.
                </p>
            </div>
        </div>
    );
};

export default AssignRider;