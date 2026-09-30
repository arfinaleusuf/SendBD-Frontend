import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";

const SearchRider = () => {
    const { accessToken } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [riders, setRiders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter a rider name");
            return;
        }

        setLoading(true);
        setSearched(true);

        try {
            const res = await fetch(
                `${baseurl}/admin/search_rider/${encodeURIComponent(name.trim())}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Failed to search rider");
            }

            setRiders(data);

            if (data.length === 0) {
                toast.error("No rider found");
            }
        } catch (error) {
            console.error(error);
            setRiders([]);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 px-4 py-6 md:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold md:text-3xl">
                        Search Rider
                    </h1>

                    <p className="mt-1 text-sm text-base-content/60">
                        Search riders by first name or last name
                    </p>
                </div>

                {/* Search Box */}
                <form
                    onSubmit={handleSearch}
                    className="mb-6 flex flex-col gap-3 rounded-2xl bg-base-100 p-4 shadow-sm sm:flex-row"
                >
                    <input
                        type="text"
                        placeholder="Enter rider name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary sm:w-32"
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            "Search"
                        )}
                    </button>
                </form>

                {/* Results */}
                {searched && (
                    <div className="rounded-2xl bg-base-100 shadow-sm">

                        {/* Result Header */}
                        <div className="flex items-center justify-between border-b border-base-200 px-4 py-4">
                            <h2 className="text-lg font-semibold">
                                Search Results
                            </h2>

                            <span className="badge badge-primary">
                                {riders.length} found
                            </span>
                        </div>

                        {riders.length === 0 ? (
                            <div className="flex min-h-52 items-center justify-center px-4">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold">
                                        No Rider Found
                                    </h3>

                                    <p className="mt-1 text-sm text-base-content/60">
                                        Try searching with another name.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Rider</th>
                                            <th>Email</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Joined</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {riders.map((rider, index) => (
                                            <tr
                                                key={rider.id}
                                                className="hover"
                                            >
                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    <div className="font-semibold">
                                                        {rider.username}
                                                    </div>

                                                    <div className="text-xs text-base-content/50">
                                                        ID: {rider.id}
                                                    </div>
                                                </td>

                                                <td>
                                                    <span className="whitespace-nowrap">
                                                        {rider.email}
                                                    </span>
                                                </td>

                                                <td>
                                                    {rider.firstname}{" "}
                                                    {rider.lastname}
                                                </td>

                                                <td>
                                                    <span className="badge badge-info badge-sm">
                                                        {rider.role}
                                                    </span>
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
                )}
            </div>
        </div>
    );
};

export default SearchRider;