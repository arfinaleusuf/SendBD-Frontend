import { useContext, useEffect, useState } from "react";
import {
    FaBox,
    FaFilter,
    FaMapMarkerAlt,
    FaUser,
    FaWeightHanging,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";


const AllCouriers = () => {

    const [couriers, setCouriers] = useState([]);
    const [totalCouriers, setTotalCouriers] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [loading, setLoading] = useState(false);

    const { accessToken } = useContext(AuthContext);
    const itemsPerPage = 10;


    useEffect(() => {
        if (!accessToken) return;

        const getAllCouriers = async () => {
            setLoading(true);
            try {

                const params = new URLSearchParams();
                if (status !== "all") {
                    params.append("status", status);
                }

                params.append("sort_by", sortBy);

                const response = await fetch(
                    `${baseurl}/admin/filter_courier?${params.toString()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.detail || "Failed to fetch couriers"
                    );
                }

                const allCouriers = data.couriers || [];

                setTotalCouriers(allCouriers.length);
                const pages = Math.ceil(
                    allCouriers.length / itemsPerPage
                );
                setTotalPages(pages || 1);
                const startIndex =
                    (page - 1) * itemsPerPage;

                const endIndex =
                    startIndex + itemsPerPage;


                setCouriers(
                    allCouriers.slice(
                        startIndex,
                        endIndex
                    )
                );
            } catch (error) {
                console.log(error);
                setCouriers([]);
                setTotalCouriers(0);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };
        getAllCouriers();

    }, [
        accessToken,
        page,
        sortBy,
        status
    ]);


    const formatDate = (date) => {

        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    const getStatusClass = (status) => {
        if (status === "pending") {
            return "badge-warning";
        }
        if (status === "approved") {
            return "badge-info";
        }
        if (status === "assigned") {
            return "badge-secondary";
        }
        if (status === "completed") {
            return "badge-success";
        }
        return "badge-ghost";
    };


    return (

        <div className="min-h-screen bg-base-200 px-4 py-6 md:px-8">

            <div className="mx-auto max-w-7xl">


                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content shadow-md">

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


                    <div className="rounded-xl bg-base-100 px-6 py-3 shadow-md">

                        <p className="text-xs text-base-content/50">
                            Total Couriers
                        </p>

                        <p className="text-2xl font-bold text-primary">
                            {totalCouriers}
                        </p>

                    </div>

                </div>


                {/* ================= FILTER ================= */}

                <div className="mb-5 rounded-2xl bg-base-100 p-4 shadow-md">

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end">


                        {/* STATUS */}

                        <div className="w-full lg:w-52">

                            <label className="mb-2 block text-sm font-semibold">
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) => {

                                    setStatus(e.target.value);

                                    setPage(1);

                                }}
                                className="select select-bordered w-full"
                            >

                                <option value="all">
                                    All Status
                                </option>

                                <option value="pending">
                                    Pending
                                </option>

                                <option value="approved">
                                    Approved
                                </option>

                                <option value="assigned">
                                    Assigned
                                </option>

                                <option value="completed">
                                    Completed
                                </option>

                            </select>

                        </div>


                        {/* SORT BY */}

                        <div className="w-full lg:w-52">

                            <label className="mb-2 block text-sm font-semibold">

                                <FaFilter className="mr-1 inline" />

                                Sort By

                            </label>


                            <select
                                value={sortBy}
                                onChange={(e) => {

                                    setSortBy(e.target.value);

                                    setPage(1);

                                }}
                                className="select select-bordered w-full"
                            >

                                <option value="newest">
                                    Newest First
                                </option>

                                <option value="oldest">
                                    Oldest First
                                </option>

                                <option value="bill_asc">
                                    Lowest Bill
                                </option>

                                <option value="bill_desc">
                                    Highest Bill
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* ================= TABLE ================= */}

                <div className="overflow-hidden rounded-2xl bg-base-100 shadow-xl">

                    <div className="overflow-x-auto">

                        <table className="table">


                            {/* ================= TABLE HEADER ================= */}

                            <thead>

                                <tr className="bg-base-200">

                                    <th>#</th>

                                    <th>Courier</th>

                                    <th>Sender ID</th>

                                    <th>Route</th>

                                    <th>Receiver</th>

                                    <th>Weight</th>

                                    <th>Bill</th>

                                    <th>Status</th>

                                </tr>

                            </thead>


                            {/* ================= TABLE BODY ================= */}

                            <tbody>


                                {/* LOADING */}

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="py-12 text-center"
                                        >

                                            <span className="loading loading-spinner loading-lg text-primary"></span>

                                            <p className="mt-3 text-sm text-base-content/60">
                                                Loading couriers...
                                            </p>

                                        </td>

                                    </tr>


                                ) : couriers.length === 0 ? (


                                    /* NO DATA */

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="py-12 text-center text-base-content/50"
                                        >

                                            <FaBox className="mx-auto mb-3 text-3xl opacity-30" />

                                            <p>
                                                No couriers found.
                                            </p>

                                        </td>

                                    </tr>


                                ) : (


                                    /* COURIER DATA */

                                    couriers.map((courier, index) => (

                                        <tr
                                            key={courier.id}
                                            className="transition hover:bg-base-200/60"
                                        >


                                            {/* NUMBER */}

                                            <td>

                                                <span className="font-semibold">

                                                    {(page - 1) * 10 + index + 1}

                                                </span>

                                            </td>


                                            {/* COURIER */}

                                            <td>

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">

                                                        <FaBox />

                                                    </div>


                                                    <div>

                                                        <p className="font-semibold whitespace-nowrap">

                                                            Courier #{courier.id}

                                                        </p>


                                                        <p className="text-xs text-base-content/50 whitespace-nowrap">

                                                            {formatDate(
                                                                courier.created_at
                                                            )}

                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* SENDER ID */}

                                            <td>

                                                <span className="badge badge-outline font-semibold">

                                                    #{courier.customer_id}

                                                </span>

                                            </td>


                                            {/* ROUTE */}

                                            <td>

                                                <div className="flex min-w-48 flex-col gap-1">

                                                    <span className="flex items-center gap-2 text-sm">

                                                        <FaMapMarkerAlt className="shrink-0 text-primary" />

                                                        <span>
                                                            {courier.sending_from}
                                                        </span>

                                                    </span>


                                                    <span className="ml-1 text-xs text-base-content/40">
                                                        ↓
                                                    </span>


                                                    <span className="flex items-center gap-2 text-sm">

                                                        <FaMapMarkerAlt className="shrink-0 text-secondary" />

                                                        <span>
                                                            {courier.destination}
                                                        </span>

                                                    </span>

                                                </div>

                                            </td>


                                            {/* RECEIVER */}

                                            <td>

                                                <div className="flex items-center gap-2">

                                                    <FaUser className="shrink-0 text-primary" />

                                                    <span className="whitespace-nowrap">

                                                        {courier.receiver_name}

                                                    </span>

                                                </div>

                                            </td>


                                            {/* WEIGHT */}

                                            <td>

                                                <div className="flex items-center gap-2 whitespace-nowrap">

                                                    <FaWeightHanging className="text-base-content/50" />

                                                    <span>
                                                        {courier.weight} KG
                                                    </span>

                                                </div>

                                            </td>


                                            {/* BILL */}

                                            <td>

                                                <span className="font-bold text-primary whitespace-nowrap">

                                                    ৳{courier.bill}

                                                </span>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`badge capitalize ${getStatusClass(
                                                        courier.status
                                                    )}`}
                                                >

                                                    {courier.status}

                                                </span>

                                            </td>               
                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* ================= PAGINATION ================= */}

                    <div className="flex flex-col gap-4 border-t border-base-200 px-5 py-4 md:flex-row md:items-center md:justify-between">


                        {/* SHOWING */}

                        <p className="text-sm text-base-content/60">

                            Showing

                            <span className="mx-1 font-semibold text-base-content">

                                {couriers.length > 0
                                    ? (page - 1) * 10 + 1
                                    : 0
                                }

                                -

                                {couriers.length > 0
                                    ? (page - 1) * 10 + couriers.length
                                    : 0
                                }

                            </span>

                            of

                            <span className="mx-1 font-semibold text-base-content">

                                {totalCouriers}

                            </span>

                            couriers

                        </p>


                        {/* PAGINATION */}

                        <div className="join">


                            {/* PREVIOUS */}

                            <button
                                className="btn btn-sm join-item"
                                disabled={page === 1}
                                onClick={() =>
                                    setPage(
                                        (prev) => prev - 1
                                    )
                                }
                            >

                                <FaChevronLeft />

                            </button>


                            {Array.from(
                                {
                                    length: totalPages,
                                },
                                (_, index) =>
                                    index + 1
                            ).map((pageNumber) => (

                                <button
                                    key={pageNumber}
                                    className={`btn btn-sm join-item ${
                                        page === pageNumber
                                            ? "btn-primary"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setPage(pageNumber)
                                    }
                                >

                                    {pageNumber}

                                </button>

                            ))}


                            {/* NEXT */}

                            <button
                                className="btn btn-sm join-item"
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage(
                                        (prev) => prev + 1
                                    )
                                }
                            >

                                <FaChevronRight />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AllCouriers;