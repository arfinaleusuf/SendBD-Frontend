import { Link } from "react-router";
import { 
    FaTruck, 
    FaMapMarkerAlt, 
    FaPhoneAlt, 
    FaEnvelope, 
    FaShieldAlt, 
    FaFacebookF, 
    FaTwitter, 
    FaLinkedinIn, 
    FaYoutube,
    FaArrowRight,
    FaClock
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
            {/* Main Footer Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* Brand Column (2 cols wide on desktop) */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="inline-flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                <FaTruck className="text-lg" />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight text-white">
                                Send<span className="text-blue-500">BD</span>
                            </span>
                        </Link>

                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            Bangladesh's most dependable tech-driven courier & logistics network. Fast pickup, real-time parcel tracking, and secure nationwide doorstep delivery.
                        </p>

                        {/* Trust highlights */}
                        <div className="pt-2 flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                                <FaShieldAlt className="text-emerald-400" />
                                <span>100% Insured Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                                <FaClock className="text-blue-400" />
                                <span>24/7 Dedicated Support</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-2 flex items-center gap-2.5">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all text-slate-400"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="text-sm" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-all text-slate-400"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="text-sm" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all text-slate-400"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn className="text-sm" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all text-slate-400"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="text-sm" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                                    <FaArrowRight className="text-[10px] text-slate-600" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/create-courier" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                                    <FaArrowRight className="text-[10px] text-slate-600" />
                                    Send a Parcel
                                </Link>
                            </li>
                            <li>
                                <Link to="/view-all-couriers" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                                    <FaArrowRight className="text-[10px] text-slate-600" />
                                    Track My Couriers
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5">
                                    <FaArrowRight className="text-[10px] text-slate-600" />
                                    Become a Rider
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Logistics Services */}
                    <div>
                        <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
                            Services
                        </h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li className="hover:text-slate-200 transition-colors">Doorstep Parcel Pickup</li>
                            <li className="hover:text-slate-200 transition-colors">Next-Day City Express</li>
                            <li className="hover:text-slate-200 transition-colors">Inter-District Logistics</li>
                            <li className="hover:text-slate-200 transition-colors">E-Commerce Merchant COD</li>
                            <li className="hover:text-slate-200 transition-colors">Fragile & Document Delivery</li>
                        </ul>
                    </div>

                    {/* Column 4: Contact & Support */}
                    <div>
                        <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
                            Get in Touch
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-start gap-2.5">
                                <FaMapMarkerAlt className="text-blue-400 mt-1 shrink-0 text-xs" />
                                <span>Gulshan-2, Dhaka 1212, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FaPhoneAlt className="text-blue-400 shrink-0 text-xs" />
                                <span className="hover:text-white transition-colors">+880 1900-SEND-BD</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FaEnvelope className="text-blue-400 shrink-0 text-xs" />
                                <span className="hover:text-white transition-colors">support@sendbd.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>
                        © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">SendBD</span>. Crafted with care by <strong className="text-slate-200">Arfin Al Eusuf</strong>.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
                        <span className="hover:text-slate-300 transition-colors cursor-pointer">Security</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;