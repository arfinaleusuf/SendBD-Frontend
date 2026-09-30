import { useContext, useEffect, useState } from "react";
import {FaBox,FaCheckCircle,FaMapMarkerAlt,FaMoneyBillWave,FaUser,FaWeightHanging,FaClock,} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";

const CompleteOrder = () => {
    const { accessToken } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completingId, setCompletingId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

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

    const handleComplete = async () => {
        if (!selectedOrder) return;

        setCompletingId(selectedOrder.id);

        try {
            const res = await fetch(
                `${baseurl}/rider/complete/${selectedOrder.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Failed to complete order");
            }

            toast.success(data.message);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === selectedOrder.id
                        ? {
                              ...order,
                              is_completed: true,
                              status: "completed",
                          }
                        : order
                )
            );

            setSelectedOrder(null);
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Failed to complete order");
        } finally {
            setCompletingId(null);
        }
    };

    const getStatusBadge = (status) => {
        if (status?.toLowerCase() === "completed") {
            return (
                <span className="badge badge-success gap-1">
                    <FaCheckCircle />
                    Completed
                </span>
            );
        }

        return (
            <span className="badge badge-warning gap-1">
                <FaClock />
                {status || "Pending"}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 px-4 py-10">
                <div className="flex min-h-[350px] items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </div>
        );
    }

    const pendingOrders = orders.filter((order) => !order.is_completed);
    const completedOrders = orders.filter((order) => order.is_completed);

    return (
        <div className="min-h-screen bg-base-200 px-3 py-5 sm:px-5 sm:py-6 md:px-8">
            <div className="mx-auto w-full max-w-7xl">

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-content">
                                <FaCheckCircle />
                            </span>

                            Complete Orders
                        </h1>

                        <p className="mt-1 text-sm text-base-content/60">
                            Complete your assigned courier orders
                        </p>
                    </div>

                    <div className="flex w-fit gap-2">
                        <span className="badge badge-warning px-3 py-3">
                            {pendingOrders.length} Pending
                        </span>

                        <span className="badge badge-success px-3 py-3">
                            {completedOrders.length} Completed
                        </span>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl bg-base-100 p-8 text-center shadow-sm">
                        <FaBox className="mb-4 text-5xl text-base-content/20" />

                        <h2 className="text-xl font-semibold">
                            No Orders Found
                        </h2>

                        <p className="mt-1 max-w-sm text-sm text-base-content/60">
                            You don't have any assigned courier orders yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="rounded-2xl bg-base-100 p-4 shadow-sm transition hover:shadow-md sm:p-5"
                            >

                                <div className="flex flex-col gap-3 border-b border-base-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="text-lg font-bold sm:text-xl">
                                                Order #{order.id}
                                            </h2>

                                            {getStatusBadge(order.status)}
                                        </div>

                                        <p className="mt-1 text-xs text-base-content/50">
                                            Customer ID: #{order.customer_id}
                                        </p>
                                    </div>

                                    {order.is_completed ? (
                                        <div className="flex items-center gap-2 text-sm font-semibold text-success">
                                            <FaCheckCircle />
                                            Order Completed
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                            className="btn btn-primary btn-sm w-full sm:w-auto"
                                        >
                                            <FaCheckCircle />
                                            Complete Order
                                        </button>
                                    )}
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                                    <div className="rounded-xl bg-base-200/60 p-4">
                                        <div className="flex items-center gap-2 text-xs text-base-content/50">
                                            <FaUser />
                                            Receiver
                                        </div>

                                        <p className="mt-1 break-words font-semibold">
                                            {order.receiver_name}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-base-200/60 p-4 lg:col-span-1">
                                        <div className="flex items-start gap-3">
                                            <FaMapMarkerAlt className="mt-1 shrink-0 text-error" />

                                            <div className="min-w-0">
                                                <p className="text-xs text-base-content/50">
                                                    From
                                                </p>

                                                <p className="break-words font-medium">
                                                    {order.sending_from}
                                                </p>

                                                <div className="my-2 ml-1 h-5 border-l border-dashed border-base-content/30"></div>

                                                <p className="text-xs text-base-content/50">
                                                    To
                                                </p>

                                                <p className="break-words font-medium">
                                                    {order.destination}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-xl bg-base-200/60 p-4">
                                            <div className="flex items-center gap-2 text-xs text-base-content/50">
                                                <FaWeightHanging />
                                                Weight
                                            </div>

                                            <p className="mt-1 font-semibold">
                                                {order.weight} kg
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-base-200/60 p-4">
                                            <div className="flex items-center gap-2 text-xs text-base-content/50">
                                                <FaMoneyBillWave />
                                                Bill
                                            </div>

                                            <p className="mt-1 font-semibold text-success">
                                                ৳{order.bill}
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="mt-4 flex flex-col gap-2 border-t border-base-200 pt-3 text-xs text-base-content/50 sm:flex-row sm:items-center sm:justify-between">
                                    <span>
                                        Rider ID: {order.assigned_rider}
                                    </span>

                                    <span>
                                        {order.is_completed
                                            ? "Delivery completed"
                                            : "Waiting for delivery completion"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedOrder && (
                <dialog open className="modal">
                    <div className="modal-box w-11/12 max-w-md">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-success/10 text-success">
                                <FaCheckCircle />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold">
                                    Complete Order
                                </h3>

                                <p className="text-sm text-base-content/60">
                                    Order #{selectedOrder.id}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl bg-base-200 p-4">
                            <p className="text-sm">
                                Are you sure you want to mark this courier
                                order as completed?
                            </p>

                            <div className="mt-3 space-y-1 text-sm">
                                <p>
                                    <span className="font-semibold">
                                        Receiver:
                                    </span>{" "}
                                    {selectedOrder.receiver_name}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Destination:
                                    </span>{" "}
                                    {selectedOrder.destination}
                                </p>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="btn btn-ghost"
                                disabled={completingId === selectedOrder.id}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleComplete}
                                className="btn btn-success"
                                disabled={completingId === selectedOrder.id}
                            >
                                {completingId === selectedOrder.id ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Completing...
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle />
                                        Confirm Complete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div
                        className="modal-backdrop"
                        onClick={() => {
                            if (completingId !== selectedOrder.id) {
                                setSelectedOrder(null);
                            }
                        }}
                    ></div>
                </dialog>
            )}
        </div>
    );
};

export default CompleteOrder;