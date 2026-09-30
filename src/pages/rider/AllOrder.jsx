import { useContext, useEffect, useState } from "react";
import {
    FaBox,
    FaMapMarkerAlt,
    FaWeightHanging,
    FaMoneyBillWave,
    FaCheckCircle,
    FaClock,
    FaUser,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";

const AllOrder = () => {
    const { accessToken } = useContext(AuthContext)
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!accessToken) return;

        fetch(`${baseurl}/rider/all_orders`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }

                return res.json();
            })
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to load orders");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [accessToken]);

    const getStatusBadge = (status) => {
        const currentStatus = status?.toLowerCase();

        if (
            currentStatus === "delivered" ||
            currentStatus === "completed"
        ) {
            return (
                <span className="badge badge-success gap-1">
                    <FaCheckCircle />
                    {status}
                </span>
            );
        }

        if (currentStatus === "pending") {
            return (
                <span className="badge badge-warning gap-1">
                    <FaClock />
                    {status}
                </span>
            );
        }

        return (
            <span className="badge badge-info">
                {status || "Processing"}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 px-4 py-10 sm:px-6 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex min-h-[300px] items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 px-3 py-5 sm:px-5 sm:py-6 md:px-8">
            <div className="mx-auto w-full max-w-7xl">

                {/* ================= HEADER ================= */}

                <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">

                    <div className="min-w-0">

                        <h1 className="flex items-center gap-2 text-xl font-bold sm:gap-3 sm:text-2xl md:text-3xl">

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-content sm:h-11 sm:w-11 sm:rounded-xl">
                                <FaBox />
                            </span>

                            <span>My Orders</span>

                        </h1>

                        <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
                            View all courier orders assigned to you
                        </p>

                    </div>

                    <div className="badge badge-primary badge-md w-fit px-3 py-3 sm:badge-lg sm:px-4 sm:py-4">
                        {orders.length} Orders
                    </div>

                </div>


                {/* ================= EMPTY ================= */}

                {orders.length === 0 ? (

                    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl bg-base-100 p-6 text-center shadow-sm sm:min-h-[350px] sm:rounded-2xl sm:p-8">

                        <FaBox className="mb-4 text-4xl text-base-content/20 sm:text-5xl" />

                        <h2 className="text-lg font-semibold sm:text-xl">
                            No Orders Found
                        </h2>

                        <p className="mt-1 max-w-sm text-xs text-base-content/60 sm:text-sm">
                            You don't have any assigned orders yet.
                        </p>

                    </div>

                ) : (

                    <>
                        {/* ================================================= */}
                        {/* DESKTOP TABLE - XL */}
                        {/* ================================================= */}

                        <div className="hidden overflow-hidden rounded-2xl bg-base-100 shadow-sm xl:block">

                            <div className="w-full overflow-x-auto">

                                <table className="w-full table">

                                    <thead>
                                        <tr className="bg-base-200/70">

                                            <th className="whitespace-nowrap">
                                                Order
                                            </th>

                                            <th className="whitespace-nowrap">
                                                Customer
                                            </th>

                                            <th className="whitespace-nowrap">
                                                Receiver
                                            </th>

                                            <th className="whitespace-nowrap">
                                                Route
                                            </th>

                                            <th className="whitespace-nowrap">
                                                Weight
                                            </th>

                                            <th className="whitespace-nowrap">
                                                Bill
                                            </th>

                                            <th className="whitespace-nowrap">
                                                Status
                                            </th>

                                            <th className="whitespace-nowrap">
                                                Delivery
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {orders.map((order) => (

                                            <tr
                                                key={order.id}
                                                className="hover:bg-base-200/40"
                                            >

                                                {/* Order */}

                                                <td className="whitespace-nowrap">

                                                    <div className="font-semibold">
                                                        #{order.id}
                                                    </div>

                                                    <div className="text-xs text-base-content/50">
                                                        Rider ID: {order.assigned_rider}
                                                    </div>

                                                </td>


                                                {/* Customer */}

                                                <td className="whitespace-nowrap">
                                                    #{order.customer_id}
                                                </td>


                                                {/* Receiver */}

                                                <td>

                                                    <div className="flex min-w-[130px] items-center gap-2">

                                                        <FaUser className="shrink-0 text-primary" />

                                                        <span className="break-words font-medium">
                                                            {order.receiver_name}
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* Route */}

                                                <td>

                                                    <div className="flex min-w-[220px] items-start gap-2">

                                                        <FaMapMarkerAlt className="mt-1 shrink-0 text-error" />

                                                        <div>

                                                            <p className="font-medium">
                                                                {order.sending_from}
                                                            </p>

                                                            <div className="my-1 ml-1.5 h-4 border-l border-dashed border-base-content/30"></div>

                                                            <p className="font-medium">
                                                                {order.destination}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Weight */}

                                                <td className="whitespace-nowrap">

                                                    <div className="flex items-center gap-2">

                                                        <FaWeightHanging className="text-primary" />

                                                        {order.weight} kg

                                                    </div>

                                                </td>


                                                {/* Bill */}

                                                <td className="whitespace-nowrap">

                                                    <div className="flex items-center gap-2 font-semibold">

                                                        <FaMoneyBillWave className="text-success" />

                                                        ৳{order.bill}

                                                    </div>

                                                </td>


                                                {/* Status */}

                                                <td className="whitespace-nowrap">
                                                    {getStatusBadge(order.status)}
                                                </td>


                                                {/* Delivery */}

                                                <td className="whitespace-nowrap">

                                                    {order.is_completed ? (

                                                        <span className="badge badge-success badge-outline gap-1">
                                                            <FaCheckCircle />
                                                            Completed
                                                        </span>

                                                    ) : (

                                                        <span className="badge badge-warning badge-outline gap-1">
                                                            <FaClock />
                                                            Pending
                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* TABLET + MOBILE */}
                        {/* ================================================= */}

                        <div className="grid grid-cols-1 gap-4 xl:hidden">

                            {orders.map((order) => (

                                <div
                                    key={order.id}
                                    className="w-full rounded-xl bg-base-100 p-4 shadow-sm sm:rounded-2xl sm:p-5"
                                >

                                    {/* ================= HEADER ================= */}

                                    <div className="flex flex-col gap-3 border-b border-base-200 pb-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="min-w-0">

                                            <h2 className="text-lg font-bold sm:text-xl">
                                                Order #{order.id}
                                            </h2>

                                            <p className="mt-1 text-xs text-base-content/50">
                                                Customer ID: #{order.customer_id}
                                            </p>

                                        </div>

                                        <div className="w-fit">
                                            {getStatusBadge(order.status)}
                                        </div>

                                    </div>


                                    {/* ================= RECEIVER ================= */}

                                    <div className="my-4 flex min-w-0 items-center gap-3 rounded-xl bg-base-200/60 p-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10">
                                            <FaUser />
                                        </div>

                                        <div className="min-w-0">

                                            <p className="text-xs text-base-content/50">
                                                Receiver
                                            </p>

                                            <p className="break-words font-semibold">
                                                {order.receiver_name}
                                            </p>

                                        </div>

                                    </div>


                                    {/* ================= ROUTE ================= */}

                                    <div className="rounded-xl bg-base-200/60 p-3 sm:p-4">

                                        <div className="flex gap-3">

                                            <FaMapMarkerAlt className="mt-1 shrink-0 text-error" />

                                            <div className="min-w-0 flex-1">

                                                {/* From */}

                                                <p className="text-xs text-base-content/50">
                                                    From
                                                </p>

                                                <p className="break-words text-sm font-medium sm:text-base">
                                                    {order.sending_from}
                                                </p>


                                                {/* Line */}

                                                <div className="my-2 ml-1 h-5 border-l border-dashed border-base-content/30"></div>


                                                {/* Destination */}

                                                <p className="text-xs text-base-content/50">
                                                    To
                                                </p>

                                                <p className="break-words text-sm font-medium sm:text-base">
                                                    {order.destination}
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ================= DETAILS ================= */}

                                    <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">

                                        {/* Weight */}

                                        <div className="rounded-xl bg-base-200/50 p-3">

                                            <div className="flex items-center gap-2 text-xs text-base-content/50">
                                                <FaWeightHanging />
                                                Weight
                                            </div>

                                            <p className="mt-1 font-semibold">
                                                {order.weight} kg
                                            </p>

                                        </div>


                                        {/* Bill */}

                                        <div className="rounded-xl bg-base-200/50 p-3">

                                            <div className="flex items-center gap-2 text-xs text-base-content/50">
                                                <FaMoneyBillWave />
                                                Bill
                                            </div>

                                            <p className="mt-1 font-semibold text-success">
                                                ৳{order.bill}
                                            </p>

                                        </div>

                                    </div>


                                    {/* ================= FOOTER ================= */}

                                    <div className="mt-4 flex flex-col gap-2 border-t border-base-200 pt-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">

                                        <p className="text-xs text-base-content/50">
                                            Rider ID: {order.assigned_rider}
                                        </p>


                                        {order.is_completed ? (

                                            <span className="badge badge-success badge-outline w-fit gap-1">

                                                <FaCheckCircle />

                                                Completed

                                            </span>

                                        ) : (

                                            <span className="badge badge-warning badge-outline w-fit gap-1">

                                                <FaClock />

                                                Pending

                                            </span>

                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    </>

                )}

            </div>
        </div>
    );
};

export default AllOrder;
