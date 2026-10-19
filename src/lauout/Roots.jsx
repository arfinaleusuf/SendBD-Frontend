import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Roots = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800">
            <Navbar />
            <main className="flex-grow w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Roots;