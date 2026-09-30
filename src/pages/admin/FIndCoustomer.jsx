import { useContext, useState } from "react";
import { FaSearch, FaUser, FaEnvelope, FaIdCard } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";

const FIndCoustomer = () => {
    const { accessToken } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter a customer name");
            return;
        }
        setLoading(true);
        setSearched(true);
        try {
            const response = await fetch(
                `${baseurl}/admin/search_customer/${encodeURIComponent(
                    name.trim()
                )}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to search customer");
            }

            setCustomers(data);

            if (data.length === 0) {
                toast.error("No customer found");
            }
        } catch (error) {
            toast.error(error.message);
            setCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FaUser className="text-xl" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                Find Customer
                            </h1>

                            <p className="text-sm text-base-content/60">
                                Search customers by their first or last name
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search Box */}
                <div className="card mb-6 border border-base-300 bg-base-100 shadow-sm">
                    <div className="card-body p-4 sm:p-6">

                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <label className="input input-bordered flex w-full items-center gap-3">
                                <FaSearch className="text-base-content/40" />

                                <input
                                    type="text"
                                    placeholder="Enter customer name..."
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    className="grow"
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full sm:w-auto sm:px-8"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <FaSearch />
                                        Search
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Result Header */}
                {searched && (
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-lg font-bold">
                            Search Results
                        </h2>

                        <span className="badge badge-primary badge-lg">
                            {customers.length} Customer
                            {customers.length !== 1 && "s"}
                        </span>
                    </div>
                )}

                {/* Empty State */}
                {searched && customers.length === 0 && !loading && (
                    <div className="card border border-base-300 bg-base-100 shadow-sm">
                        <div className="card-body items-center py-12 text-center">
                            <FaUser className="mb-3 text-4xl text-base-content/20" />

                            <h3 className="text-lg font-semibold">
                                No Customer Found
                            </h3>

                            <p className="text-sm text-base-content/50">
                                Try searching with another first or last name.
                            </p>
                        </div>
                    </div>
                )}

                {/* Mobile Cards */}
                {customers.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {customers.map((customer) => (
                            <div
                                key={customer.id}
                                className="card border border-base-300 bg-base-100 shadow-sm"
                            >
                                <div className="card-body p-5">

                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <FaUser />
                                        </div>

                                        <div>
                                            <h3 className="font-bold">
                                                {customer.firstname}{" "}
                                                {customer.lastname}
                                            </h3>

                                            <p className="text-sm text-base-content/50">
                                                @{customer.username}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 text-sm">

                                        <div className="flex items-center gap-3">
                                            <FaIdCard className="text-base-content/40" />
                                            <span>
                                                <b>ID:</b> {customer.id}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 break-all">
                                            <FaEnvelope className="text-base-content/40" />
                                            <span>
                                                {customer.email}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-base-300 pt-3">
                                            <span className="badge badge-success badge-sm">
                                                {customer.role}
                                            </span>

                                            <span
                                                className={`badge badge-sm ${
                                                    customer.is_active
                                                        ? "badge-success"
                                                        : "badge-error"
                                                }`}
                                            >
                                                {customer.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Desktop Table */}
                {customers.length > 0 && (
                    <div className="hidden overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow-sm md:block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>

                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td className="font-semibold">
                                            {customer.id}
                                        </td>

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <FaUser />
                                                </div>

                                                <div>
                                                    <div className="font-semibold">
                                                        {customer.firstname}{" "}
                                                        {customer.lastname}
                                                    </div>

                                                    <div className="text-xs text-base-content/50">
                                                        Customer
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            @{customer.username}
                                        </td>

                                        <td>
                                            {customer.email}
                                        </td>

                                        <td>
                                            <span className="badge badge-primary badge-sm">
                                                {customer.role}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`badge badge-sm ${
                                                    customer.is_active
                                                        ? "badge-success"
                                                        : "badge-error"
                                                }`}
                                            >
                                                {customer.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>

                                        <td>
                                            {new Date(
                                                customer.created_at
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

export default FIndCoustomer;