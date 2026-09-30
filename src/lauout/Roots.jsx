import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Roots = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Roots;