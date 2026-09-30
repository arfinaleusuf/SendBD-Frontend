import { useContext, useState } from "react";
import {FaMapMarkerAlt,FaUser,FaWeightHanging,FaTruck,} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/BaseUrl";


const SendCourier = () => {

    const { accessToken } = useContext(AuthContext);

    const [sendingFrom, setSendingFrom] = useState("");
    const [destination, setDestination] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [weight, setWeight] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const courierData = {
            sending_from: sendingFrom,
            destination: destination,
            receiver_name: receiverName,
            weight: Number(weight),
        };

        try {
            setLoading(true);

            const response = await fetch(
                `${baseurl}/create_courier`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(courierData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Failed to create courier"
                );
            }            

            toast.success("Courier sent successfully!");

            setSendingFrom("");
            setDestination("");
            setReceiverName("");
            setWeight("");

        } catch (error) {

            console.error("Courier Error:", error);

            toast.error(
                error.message || "Something went wrong!"
            );

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-base-200 px-4 py-10 md:px-8">

            <div className="mx-auto max-w-4xl">

                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-content shadow-lg">
                        <FaTruck className="text-2xl" />
                    </div>

                    <h1 className="text-3xl font-bold md:text-4xl">
                        Send Courier
                    </h1>

                    <p className="mt-2 text-base-content/60">
                        Enter your courier information below
                    </p>

                </div>

                <div className="rounded-2xl bg-base-100 p-6 shadow-xl md:p-10">

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

    
                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Sending From
                                </label>

                                <div className="flex h-12 items-center rounded-lg border border-base-300 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">

                                    <FaMapMarkerAlt className="mr-3 text-primary" />

                                    <input
                                        type="text"
                                        placeholder="Enter pickup location"
                                        value={sendingFrom}
                                        onChange={(e) =>
                                            setSendingFrom(e.target.value)
                                        }
                                        className="w-full bg-transparent outline-none"
                                        required
                                    />

                                </div>
                            </div>


                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Destination
                                </label>

                                <div className="flex h-12 items-center rounded-lg border border-base-300 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">

                                    <FaMapMarkerAlt className="mr-3 text-primary" />

                                    <input
                                        type="text"
                                        placeholder="Enter destination"
                                        value={destination}
                                        onChange={(e) =>
                                            setDestination(e.target.value)
                                        }
                                        className="w-full bg-transparent outline-none"
                                        required
                                    />

                                </div>
                            </div>


                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Receiver Name
                                </label>

                                <div className="flex h-12 items-center rounded-lg border border-base-300 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">

                                    <FaUser className="mr-3 text-primary" />

                                    <input
                                        type="text"
                                        placeholder="Enter receiver name"
                                        value={receiverName}
                                        onChange={(e) =>
                                            setReceiverName(e.target.value)
                                        }
                                        className="w-full bg-transparent outline-none"
                                        required
                                    />

                                </div>
                            </div>


                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Package Weight
                                </label>

                                <div className="flex h-12 items-center rounded-lg border border-base-300 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">

                                    <FaWeightHanging className="mr-3 text-primary" />

                                    <input
                                        type="number"
                                        placeholder="Enter package weight"
                                        value={weight}
                                        onChange={(e) =>
                                            setWeight(e.target.value)
                                        }
                                        min="0.1"
                                        step="0.1"
                                        className="w-full bg-transparent outline-none"
                                        required
                                    />

                                    <span className="ml-2 text-sm font-medium text-base-content/50">
                                        KG
                                    </span>

                                </div>
                            </div>

                        </div>


                        <div className="mt-7 rounded-lg bg-primary/10 p-4">
                            <p className="text-sm text-base-content/70">
                                <span className="font-semibold">
                                    Note:
                                </span>{" "}
                                Delivery charge will be calculated
                                automatically based on package weight.
                            </p>
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary mt-7 h-12 w-full text-base font-semibold shadow-md"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FaTruck />
                                    Send Courier
                                </>
                            )}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default SendCourier;