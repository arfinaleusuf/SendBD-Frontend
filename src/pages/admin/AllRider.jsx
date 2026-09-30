import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";

const AllRider = () => {
    const { accessToken } = useContext(AuthContext);

    const [riders, setRiders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!accessToken) return;

        setLoading(true);

        fetch(`${baseurl}/admin/all_rider`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(async (res) => {
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.detail || "Failed to fetch riders");
                }

                return data;
            })
            .then((data) => {
                setRiders(data);
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message || "Failed to load riders");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [accessToken]);

    return (
        <div className="min-h-screen bg-base-200 px-4 py-6 md:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold md:text-3xl">
                            All Riders
                        </h1>

                        <p className="text-sm text-base-content/60">
                            Manage and view all registered riders
                        </p>
                    </div>

                    <div className="badge badge-primary badge-lg">
                        {riders.length} Riders
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex min-h-60 items-center justify-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : riders.length === 0 ? (
                    /* Empty State */
                    <div className="flex min-h-60 items-center justify-center rounded-2xl bg-base-100 shadow-sm">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold">
                                No Riders Found
                            </h2>
                            <p className="mt-1 text-sm text-base-content/60">
                                There are no registered riders yet.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Table */
                    <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-sm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Rider Id</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Joined</th>
                                </tr>
                            </thead>

                            <tbody>
                                {riders.map((rider, index) => (
                                    <tr key={rider.id} className="hover">
                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            <div className="text-xs text-base-content/50">
                                                {rider.id}
                                            </div>
                                        </td>

                                        <td>
                                            <span className="whitespace-nowrap">
                                                {rider.email}
                                            </span>
                                        </td>

                                        <td>
                                            {rider.firstname} {rider.lastname}
                                        </td>

                                        <td>
                                            {rider.is_active ? (
                                                <span className="badge badge-success badge-sm">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="badge badge-error badge-sm">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        <td>
                                            {new Date(
                                                rider.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllRider;