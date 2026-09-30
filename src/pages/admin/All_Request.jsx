import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseurl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";


const All_Request = () => {
    const { accessToken } = useContext(AuthContext)
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [approvingId, setApprovingId] = useState(null);

    useEffect(() => {
        if (!accessToken) return;

        fetch(`${baseurl}/admin/all_request`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch requests");
                }
                return res.json();
            })
            .then((data) => {
                setRequests(data);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to load courier requests");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [accessToken]);


    const handleApprove = async (id) => {
        setApprovingId(id);
        
        try {
            const response = await fetch(
                `${baseurl}/admin/approve/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${accessToken} `,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to approve request");
            }
            toast.success(data.message || "Courier approved successfully");

            setRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== id)
            );

        } catch (error) {
            console.log(error);
            toast.error(error.message || "Failed to approve request");
        } finally {
            setApprovingId(null);
        }
    };



    return (
        <div className="min-h-screen bg-base-200 px-4 py-6 md:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold md:text-3xl">
                        Courier Requests
                    </h1>

                    <p className="mt-1 text-sm text-base-content/60">
                        Review and manage all pending courier requests.
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-6">
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/60">
                                        Pending Requests
                                    </p>

                                    <h2 className="mt-1 text-3xl font-bold">
                                        {requests.length}
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/15 text-warning">
                                    <span className="text-xl">📦</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex min-h-60 items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

                {/* Empty */}
                {!loading && requests.length === 0 && (
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body flex items-center justify-center py-16 text-center">
                            <div className="text-5xl">📭</div>

                            <h2 className="mt-4 text-xl font-semibold">
                                No Pending Requests
                            </h2>

                            <p className="text-sm text-base-content/60">
                                There are currently no courier requests waiting
                                for approval.
                            </p>
                        </div>
                    </div>
                )}

                {!loading && requests.length > 0 && (
                    <div className="hidden overflow-x-auto rounded-xl bg-base-100 shadow-sm md:block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer ID</th>
                                    <th>Receiver</th>
                                    <th>From</th>
                                    <th>Destination</th>
                                    <th>Weight</th>
                                    <th>Bill</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request.id} className="hover">
                                        <td>
                                            <span className="font-semibold">
                                                #{request.id}
                                            </span>
                                        </td>

                                        <td>
                                            {request.customer_id}
                                        </td>

                                        <td>
                                            <span className="font-medium">
                                                {request.receiver_name}
                                            </span>
                                        </td>

                                        <td>
                                            {request.sending_from}
                                        </td>

                                        <td>
                                            {request.destination}
                                        </td>

                                        <td>
                                            {request.weight} kg
                                        </td>

                                        <td>
                                            <span className="font-semibold">
                                                ৳{request.bill}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="badge badge-warning badge-sm">
                                                Pending
                                            </span>
                                        </td>
                                        <td>
                                            <button onClick={() => handleApprove(request.id)}
                                                disabled={approvingId === request.id}
                                                className="btn btn-success mt-3 w-full" >
                                                {approvingId === request.id ? (<> <span className="loading loading-spinner loading-sm"></span> Approving... </>) : ("Approve Request")} </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Mobile Cards */}
                {!loading && requests.length > 0 && (
                    <div className="space-y-4 md:hidden">
                        {requests.map((request) => (
                            <div
                                key={request.id}
                                className="card bg-base-100 shadow-sm"
                            >
                                <div className="card-body p-5">

                                    {/* Card Header */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                Request ID
                                            </p>

                                            <h2 className="text-lg font-bold">
                                                #{request.id}
                                            </h2>
                                        </div>

                                        <span className="badge badge-warning">
                                            Pending
                                        </span>
                                    </div>

                                    <div className="divider my-1"></div>

                                    {/* Receiver */}
                                    <div>
                                        <p className="text-xs text-base-content/50">
                                            Receiver
                                        </p>

                                        <p className="font-semibold">
                                            {request.receiver_name}
                                        </p>
                                    </div>

                                    {/* Location */}
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                Sending From
                                            </p>

                                            <p className="font-medium">
                                                {request.sending_from}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                Destination
                                            </p>

                                            <p className="font-medium">
                                                {request.destination}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Details */}
                                    <div className="grid grid-cols-3 gap-3 rounded-lg bg-base-200 p-3">

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                Customer
                                            </p>

                                            <p className="font-semibold">
                                                #{request.customer_id}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                Weight
                                            </p>

                                            <p className="font-semibold">
                                                {request.weight} kg
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                Bill
                                            </p>

                                            <p className="font-semibold">
                                                ৳{request.bill}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default All_Request;