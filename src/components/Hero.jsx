
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/BaseUrl";

import {
    FaBox,
    FaShieldAlt,
    FaUsers,
    FaStar,
    FaMotorcycle,
    FaRoute,
    FaChevronLeft,
    FaChevronRight,
    FaMapMarkedAlt,
    FaArrowRight
} from "react-icons/fa";

// ================= STATS LOADER =================
const StatsLoader = () => {
    return (
        <div className="h-9 w-20 rounded-md bg-slate-200 animate-pulse"></div>
    );
};

const Hero = () => {
    const navigate = useNavigate();
    const { authUser } = useContext(AuthContext);

    const [happyCoustomer, setHappyCoustomer] = useState(0);
    const [delivered, setDelivered] = useState(0);
    const [statsLoading, setStatsLoading] = useState(true);

    const [currentSlide, setCurrentSlide] = useState(0);

    // ================= SLIDER DATA =================
    const slides = [
        {
            id: "slide1",
            image: "https://img.magnific.com/free-psd/3d-rendering-delivery-sales-blank-banner_23-2151558571.jpg?semt=ais_hybrid&w=740&q=80",
            title: "Send Anything.",
            highlight: "Anywhere, Anytime.",
            description:
                "Send your parcels quickly and securely with our reliable courier service. Track your delivery, manage shipments, and enjoy hassle-free delivery from pickup to destination.",
        },
        {
            id: "slide2",
            image: "./image/hero-2.jpg",
            title: "Fast Delivery Around",
            highlight: "Bangladesh",
            description:
                "Reach customers across borders with simple, safe, and secured shipping workflows throughout all 64 districts.",
        },
        {
            id: "slide3",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeTOCmt9Ur_BA7djuX_6LesRax6Hpns4LnmjRl0CRx2a4JX7k8VgsDSBr9&s=10",
            title: "Track Every Step",
            highlight: "In Real Time",
            description:
                "Live real-time updates directly on your dashboard. Stay informed every step from dispatch to doorstep delivery.",
        },
        {
            id: "slide4",
            image: "./image/hero-4.jpg",
            title: "Safe & Secure",
            highlight: "Handling",
            description:
                "Guaranteed protection for fragile and critical parcel items with verified riders and tamper-proof security.",
        },
    ];

    // ================= AUTO SLIDER =================
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + slides.length) % slides.length
        );
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // ================= FETCH HOME STATS =================
    useEffect(() => {
        const controller = new AbortController();

        const fetchStats = async () => {
            setStatsLoading(true);

            try {
                const response = await fetch(`${baseurl}/home-info`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch home statistics");
                }

                const data = await response.json();

                setDelivered(data.delivered ?? 0);
                setHappyCoustomer(data.happyCoustomer ?? 0);

            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Stats fetch error:", error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setStatsLoading(false);
                }
            }
        };

        fetchStats();

        return () => {
            controller.abort();
        };
    }, []);

    const activeSlideData = slides[currentSlide];

    return (
        <div className="w-full overflow-hidden bg-slate-50">

            {/* ================= HERO SLIDER SECTION ================= */}
            <div className="relative w-full min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white select-none">

                {/* Background Slider Images */}
                {slides.map((slide, idx) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            idx === currentSlide
                                ? "opacity-100 z-0 scale-100"
                                : "opacity-0 pointer-events-none scale-105"
                        } transition-transform duration-1000`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                ))}

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/65 to-black/60 z-10"></div>

                {/* Slider Content */}
                <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight sm:leading-tight tracking-tight text-white drop-shadow-md">
                        {activeSlideData.title}{" "}
                        <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                            {activeSlideData.highlight}
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal drop-shadow">
                        {activeSlideData.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">

                        <button
                            onClick={() =>
                                navigate(authUser ? "/create-courier" : "/login")
                            }
                            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <FaBox />
                            <span>
                                {authUser ? "Send Courier" : "Get Started"}
                            </span>
                        </button>

                        <button
                            onClick={() =>
                                navigate(authUser ? "/view-all-couriers" : "/login")
                            }
                            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                        >
                            <FaRoute className="text-blue-400" />
                            <span>Track Parcel</span>
                        </button>

                    </div>
                </div>

                {/* Slider Navigation */}
                <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-blue-600 text-white border border-white/20 hover:border-blue-500 backdrop-blur-md flex items-center justify-center transition-all shadow-lg active:scale-90"
                >
                    <FaChevronLeft className="text-base" />
                </button>

                <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-blue-600 text-white border border-white/20 hover:border-blue-500 backdrop-blur-md flex items-center justify-center transition-all shadow-lg active:scale-90"
                >
                    <FaChevronRight className="text-base" />
                </button>

                {/* Slider Dots */}
                <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-2.5">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                idx === currentSlide
                                    ? "w-8 bg-blue-500 shadow-md shadow-blue-500/50"
                                    : "w-2.5 bg-white/40 hover:bg-white/70"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* ================= STATS SECTION ================= */}
            <section className="relative -mt-8 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                    {/* Parcels Delivered */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
                            <FaBox />
                        </div>
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                {statsLoading ? (
                                    <StatsLoader />
                                ) : (
                                    Number(delivered).toLocaleString()
                                )}
                            </h3>
                            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                                Parcels Delivered
                            </p>
                        </div>
                    </div>

                    {/* Happy Customers */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                            <FaUsers />
                        </div>
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                {statsLoading ? (
                                    <StatsLoader />
                                ) : (
                                    Number(happyCoustomer).toLocaleString()
                                )}
                            </h3>
                            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                                Happy Customers
                            </p>
                        </div>
                    </div>

                    {/* Districts Covered */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl shrink-0">
                            <FaMapMarkedAlt />
                        </div>
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                64
                            </h3>
                            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                                Districts Covered
                            </p>
                        </div>
                    </div>

                    {/* Successful Delivery */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
                            <FaStar />
                        </div>
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                99.4%
                            </h3>
                            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                                Successful Delivery
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ================= FEATURES SECTION ================= */}
            <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                        Why Choose Us
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Fast, Secure and Reliable Courier Service for Everyone
                    </h2>

                    <p className="text-base text-slate-600 leading-relaxed">
                        Send your parcels safely and effortlessly with guaranteed care and end-to-end milestone tracking.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Feature 1 */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group text-center">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <FaMotorcycle />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                            Fast Delivery
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Send your parcels quickly and get them delivered safely to their destination across Bangladesh.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group text-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <FaShieldAlt />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                            Secure Service
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Your packages are handled carefully and securely throughout the entire delivery process.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all duration-300 group text-center">
                        <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                            <FaRoute />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                            Easy Tracking
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Track your parcel and check live delivery status from your phone or desktop whenever you want.
                        </p>
                    </div>

                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section className="py-20 bg-slate-100/70 border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                        <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider">
                            Simple Process
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            How It Works
                        </h2>

                        <p className="text-base text-slate-600">
                            Send your parcel in just a few simple steps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

                        {[
                            {
                                number: 1,
                                title: "Create Account",
                                description: "Register and create your account to begin sending parcels.",
                                color: "bg-blue-600",
                            },
                            {
                                number: 2,
                                title: "Book Courier",
                                description: "Provide parcel and destination details in under a minute.",
                                color: "bg-cyan-600",
                            },
                            {
                                number: 3,
                                title: "Rider Pickup",
                                description: "Our verified rider collects your parcel directly from your doorstep.",
                                color: "bg-indigo-600",
                            },
                            {
                                number: 4,
                                title: "Delivered",
                                description: "Your parcel safely reaches its final destination on time.",
                                color: "bg-emerald-600",
                            },
                        ].map((step) => (
                            <div
                                key={step.number}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 group hover:shadow-md transition-all"
                            >
                                <div className={`w-14 h-14 rounded-full ${step.color} text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
                                    {step.number}
                                </div>

                                <h3 className="font-bold text-lg text-slate-900 mb-2">
                                    {step.title}
                                </h3>

                                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-blue-600 text-white rounded-3xl p-10 sm:p-14 text-center shadow-xl space-y-4">

                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Ready to Send Your Parcel?
                    </h2>

                    <p className="max-w-xl mx-auto text-blue-100 text-sm sm:text-base leading-relaxed">
                        Book your courier today and enjoy fast, reliable, and secure delivery across Bangladesh.
                    </p>

                    <div className="pt-4">
                        <button
                            onClick={() =>
                                navigate(authUser ? "/create-courier" : "/login")
                            }
                            className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-blue-700 font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
                        >
                            <FaBox className="text-blue-600" />
                            <span>Send Courier</span>
                            <FaArrowRight className="text-xs" />
                        </button>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Hero;
