import { useContext, useEffect, useState } from "react";
import { FaBox, FaMapMarkerAlt, FaUser, FaWeightHanging } from "react-icons/fa";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";

const ViewAllCouriers = () => {
    const [couriers, setCouries] = useState([])
    const { accessToken } = useContext(AuthContext);

    useEffect(() => {
        if (!accessToken) return;
        fetch(`${baseurl}/my/couriers`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                if (res.status === 404) {
                    return [];
                }

                return res.json();
            })
            .then(data => { setCouries(data) })
            .catch(err => {
                console.log(err);
                setCouries([]);
            });

    }, [accessToken])

    const handleCancelCourier = async (courierId) => {
        try {
            const response = await fetch(
                `${baseurl}/courier/cancel/${courierId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to cancel courier");
            }

            setCouries((prevCouriers) =>
                prevCouriers.filter((courier) => courier.id !== courierId)
            );

            console.log(data);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="min-h-screen bg-base-200 px-4 py-8 md:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content shadow">
                            <FaBox className="text-xl" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold md:text-3xl">
                                All Couriers
                            </h1>

                            <p className="text-sm text-base-content/60">
                                Manage and track all courier deliveries
                            </p>
                        </div>

                    </div>


                    <div className="rounded-xl bg-base-100 px-6 py-3 shadow">

                        <p className="text-xs text-base-content/50">
                            Total Couriers
                        </p>

                        <p className="text-2xl font-bold text-primary">
                            {couriers.length}
                        </p>

                    </div>

                </div>


                <div className="overflow-hidden rounded-2xl bg-base-100 shadow-xl">

                    <div className="overflow-x-auto">

                        <table className="table">

                            <thead>
                                <tr className="bg-base-200">
                                    <th>#</th>
                                    <th>Courier Id</th>
                                    <th>Route</th>
                                    <th>Receiver</th>
                                    <th>Weight</th>
                                    <th>Bill</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>


                            <tbody>

                                {couriers.map((courier, index) => (

                                    <tr
                                        key={courier.id}
                                        className="hover:bg-base-200/60"
                                    >

                                        <td>
                                            <span className="font-semibold">
                                                {index + 1}
                                            </span>
                                        </td>


                                        {/* Courier */}
                                        <td>
                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <FaBox />
                                                </div>

                                                <div>
                                                    <p className="font-semibold">
                                                        Courier #{courier.id}
                                                    </p>

                                                    <p className="text-xs text-base-content/50">
                                                        Delivery Package
                                                    </p>
                                                </div>

                                            </div>
                                        </td>


                                        {/* Route */}
                                        <td>
                                            <div className="flex flex-col gap-1">

                                                <span className="flex items-center gap-2 text-sm">
                                                    <FaMapMarkerAlt className="text-primary" />
                                                    {courier.sending_from}
                                                </span>

                                                <span className="ml-1 text-xs text-base-content/40">
                                                    ↓
                                                </span>

                                                <span className="flex items-center gap-2 text-sm">
                                                    <FaMapMarkerAlt className="text-secondary" />
                                                    {courier.destination}
                                                </span>

                                            </div>
                                        </td>


                                        {/* Receiver */}
                                        <td>
                                            <div className="flex items-center gap-2">

                                                <FaUser className="text-primary" />

                                                {courier.receiver_name}

                                            </div>
                                        </td>


                                        {/* Weight */}
                                        <td>
                                            <div className="flex items-center gap-2">

                                                <FaWeightHanging className="text-base-content/50" />

                                                {courier.weight} KG

                                            </div>
                                        </td>


                                        {/* Bill */}
                                        <td>
                                            <span className="font-bold">
                                                ৳{courier.bill}
                                            </span>
                                        </td>


                                        {/* Status */}
                                        <td>

                                            <span
                                                className={`badge ${courier.status === "completed"
                                                    ? "badge-success"
                                                    : courier.status === "Approved"
                                                        ? "badge-info"
                                                        : "badge-warning"
                                                    }`}
                                            >
                                                {courier.status}
                                            </span>

                                        </td>

                                        <td>
                                            {
                                                courier.status === "pending" && (
                                                    <button onClick={() => handleCancelCourier(courier.id)} className="btn btn-sm btn-error btn-outline">Cancel Courier</button>)
                                            }
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                </div>

            </div>

        </div>
    );
};

export default ViewAllCouriers;