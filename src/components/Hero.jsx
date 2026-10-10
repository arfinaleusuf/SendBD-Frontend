import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/BaseUrl";

const Hero = () => {
    const navigate = useNavigate();
    const { authUser } = useContext(AuthContext)
    const [happyCoustomer, setHappyCoustomer] = useState(0)
    const [delivered, setDelivered] = useState(0)
    const carouselRef = useRef(null);

    const goToSlide = (slideId) => {
        const slide = document.getElementById(slideId);

        if (slide && carouselRef.current) {
            carouselRef.current.scrollTo({
                left: slide.offsetLeft,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const slides = ["slide1", "slide2", "slide3", "slide4"];
        let currentSlide = 0;

        const interval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(slides[currentSlide]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleGetStarted = () => {
        navigate("/login")
    }

    useEffect(() => {
        fetch(`${baseurl}/home-info`)
            .then(res => res.json())
            .then(data => {
                setDelivered(data.delivered)
                setHappyCoustomer(data.happyCoustomer)
            })
    }, [])

    return (
        <div>
            <div ref={carouselRef} className="carousel w-full">

                {/* Slide 1 */}
                <div id="slide1" className="carousel-item relative w-full min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[85vh]">
                    {/* Background Image */}
                    <img
                        alt="Slide 1"
                        src="https://img.magnific.com/free-psd/3d-rendering-delivery-sales-blank-banner_23-2151558571.jpg?semt=ais_hybrid&w=740&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/55"></div>

                    {/* Hero Content */}
                    <div className="hero-content relative z-10 mx-auto flex h-full w-full items-center justify-center px-4 py-10 text-center text-neutral-content sm:px-6 md:px-8 lg:px-12">
                        <div className="w-full max-w-3xl">

                            <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                                Send Anything.
                                <br />
                                <span className="text-primary">Anywhere, Anytime.</span>
                            </h1>

                            <p className="mx-auto mb-6 max-w-2xl text-sm leading-6 text-gray-200 sm:mb-7 sm:text-base sm:leading-7 md:mb-8 md:text-lg md:leading-8 lg:text-xl">
                                Send your parcels quickly and securely with our reliable courier service. Track your delivery,
                                manage shipments, and enjoy hassle-free delivery from pickup to destination.
                            </p>

                            {!authUser && (
                                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                                    <button
                                        onClick={handleGetStarted}
                                        className="btn btn-primary w-full px-7 sm:w-auto sm:px-8 md:px-10"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Slider Navigation Arrows */}
                    <div className="absolute left-5 right-5 top-1/2 z-20 flex -translate-y-1/2 transform justify-between">
                        <button
                            onClick={() => goToSlide("slide4")}
                            className="btn btn-circle"
                        >
                            ❮
                        </button>

                        <button
                            onClick={() => goToSlide("slide2")}
                            className="btn btn-circle"
                        >
                            ❯
                        </button>
                    </div>
                </div>

                {/* Slide 2 */}
                <div id="slide2" className="carousel-item relative w-full min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[85vh]">
                    <img
                        alt="Slide 2"
                        src="./image/hero-2.jpg"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/55"></div>

                    <div className="hero-content relative z-10 mx-auto flex h-full w-full items-center justify-center px-4 py-10 text-center text-neutral-content">
                        <div className="w-full max-w-3xl">
                            <h1 className="mb-4 text-3xl font-extrabold sm:text-5xl">Fast Delivery Around Bangladesh</h1>
                            <p className="mx-auto mb-6 max-w-2xl text-sm text-gray-200 sm:text-base">
                                Reach customers across borders with simple, safe, and secured shipping workflows.
                            </p>
                        </div>
                    </div>

                    <div className="absolute left-5 right-5 top-1/2 z-20 flex -translate-y-1/2 transform justify-between">
                        <button
                            onClick={() => goToSlide("slide1")}
                            className="btn btn-circle"
                        >
                            ❮
                        </button>

                        <button
                            onClick={() => goToSlide("slide3")}
                            className="btn btn-circle"
                        >
                            ❯
                        </button>
                    </div>
                </div>

                {/* Slide 3 */}
                <div id="slide3" className="carousel-item relative w-full min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[85vh]">
                    <img
                        alt="Slide 3"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeTOCmt9Ur_BA7djuX_6LesRax6Hpns4LnmjRl0CRx2a4JX7k8VgsDSBr9&s=10"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/55"></div>

                    <div className="hero-content relative z-10 mx-auto flex h-full w-full items-center justify-center px-4 py-10 text-center text-neutral-content">
                        <div className="w-full max-w-3xl">
                            <h1 className="mb-4 text-3xl font-extrabold sm:text-5xl">Track Every Step</h1>
                            <p className="mx-auto mb-6 max-w-2xl text-sm text-gray-200 sm:text-base">
                                Live real-time updates directly on your dashboard.
                            </p>
                        </div>
                    </div>

                    <div className="absolute left-5 right-5 top-1/2 z-20 flex -translate-y-1/2 transform justify-between">
                        <button
                            onClick={() => goToSlide("slide2")}
                            className="btn btn-circle"
                        >
                            ❮
                        </button>

                        <button
                            onClick={() => goToSlide("slide4")}
                            className="btn btn-circle"
                        >
                            ❯
                        </button>
                    </div>
                </div>

                {/* Slide 4 */}
                <div id="slide4" className="carousel-item relative w-full min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[85vh]">
                    <img
                        alt="Slide 4"
                        src="./image/hero-4.jpg"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/55"></div>

                    <div className="hero-content relative z-10 mx-auto flex h-full w-full items-center justify-center px-4 py-10 text-center text-neutral-content">
                        <div className="w-full max-w-3xl">
                            <h1 className="mb-4 text-3xl font-extrabold sm:text-5xl">Safe & Secure Handling</h1>
                            <p className="mx-auto mb-6 max-w-2xl text-sm text-gray-200 sm:text-base">
                                Guaranteed protection for fragile and critical parcel items.
                            </p>
                        </div>
                    </div>

                    <div className="absolute left-5 right-5 top-1/2 z-20 flex -translate-y-1/2 transform justify-between">
                        <button
                            onClick={() => goToSlide("slide3")}
                            className="btn btn-circle"
                        >
                            ❮
                        </button>

                        <button
                            onClick={() => goToSlide("slide1")}
                            className="btn btn-circle"
                        >
                            ❯
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-base-100">

                {/* Stats Section */}
                <section className="py-12 bg-base-200">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

                            <div>
                                <h2 className="text-3xl font-bold text-primary">{delivered}</h2>
                                <p className="text-gray-500 mt-2">Parcels Delivered</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-primary">{happyCoustomer}</h2>
                                <p className="text-gray-500 mt-2">Happy Customers</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-primary">50+</h2>
                                <p className="text-gray-500 mt-2">Delivery Areas</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-primary">99%</h2>
                                <p className="text-gray-500 mt-2">Successful Delivery</p>
                            </div>

                        </div>
                    </div>
                </section>


                {/* Features */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-6">

                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Why Choose Us?
                            </h2>

                            <p className="text-gray-500 mt-3">
                                Fast, secure and reliable courier service for everyone.
                            </p>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Feature 1 */}
                            <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                                <div className="card-body text-center">

                                    <div className="text-5xl mb-4">
                                        🚚
                                    </div>

                                    <h2 className="card-title justify-center">
                                        Fast Delivery
                                    </h2>

                                    <p className="text-gray-500">
                                        Send your parcels quickly and get them delivered
                                        safely to their destination.
                                    </p>

                                </div>
                            </div>


                            {/* Feature 2 */}
                            <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                                <div className="card-body text-center">

                                    <div className="text-5xl mb-4">
                                        🔒
                                    </div>

                                    <h2 className="card-title justify-center">
                                        Secure Service
                                    </h2>

                                    <p className="text-gray-500">
                                        Your packages are handled carefully and securely
                                        throughout the delivery process.
                                    </p>

                                </div>
                            </div>


                            {/* Feature 3 */}
                            <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                                <div className="card-body text-center">

                                    <div className="text-5xl mb-4">
                                        📍
                                    </div>

                                    <h2 className="card-title justify-center">
                                        Easy Tracking
                                    </h2>

                                    <p className="text-gray-500">
                                        Track your parcel and check delivery status
                                        whenever you want.
                                    </p>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* How It Works */}
                <section className="py-16 bg-base-200">
                    <div className="max-w-6xl mx-auto px-6">

                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                How It Works
                            </h2>

                            <p className="text-gray-500 mt-3">
                                Send your parcel in just a few simple steps.
                            </p>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                            <div className="text-center">
                                <div className="w-14 h-14 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                                    1
                                </div>

                                <h3 className="font-bold text-lg mt-4">
                                    Create Account
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Register and create your account.
                                </p>
                            </div>


                            <div className="text-center">
                                <div className="w-14 h-14 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                                    2
                                </div>

                                <h3 className="font-bold text-lg mt-4">
                                    Book Courier
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Provide parcel and destination details.
                                </p>
                            </div>


                            <div className="text-center">
                                <div className="w-14 h-14 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                                    3
                                </div>

                                <h3 className="font-bold text-lg mt-4">
                                    Rider Pickup
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Our rider collects your parcel.
                                </p>
                            </div>


                            <div className="text-center">
                                <div className="w-14 h-14 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                                    4
                                </div>

                                <h3 className="font-bold text-lg mt-4">
                                    Delivered
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Your parcel reaches its destination.
                                </p>
                            </div>

                        </div>

                    </div>
                </section>


                {/* CTA */}
                <section className="py-16">
                    <div className="max-w-5xl mx-auto px-6">

                        <div className="bg-primary text-primary-content rounded-2xl p-10 text-center">

                            <h2 className="text-3xl md:text-4xl font-bold">
                                Ready to Send Your Parcel?
                            </h2>

                            <p className="mt-4 opacity-90">
                                Book your courier today and enjoy fast and reliable delivery.
                            </p>


                            <button
                                onClick={() =>
                                    navigate(authUser ? "/create-courier" : "/login")
                                }
                                className="btn btn-secondary w-full px-7 sm:w-auto sm:px-8 md:px-10 mt-5"
                            >
                                Send Courier
                            </button>


                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
};

export default Hero;
