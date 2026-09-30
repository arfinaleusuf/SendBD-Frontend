import { Link, Outlet } from "react-router";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { RiEBike2Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { MdFindInPage } from "react-icons/md";


const AdminLayout = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost drawer-button">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    {/* Page content here */}
                    <div className="p-4"><Outlet /></div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li>
                                <Link to={'/admin/all-courier'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="See All Courier">
                                    <FaClipboardList />
                                    <span className="is-drawer-close:hidden">See All Courier</span>
                                </Link>
                            </li>

                            <li>
                                <Link to={'/admin/all-request'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Pending Requerst">
                                    <MdOutlineManageHistory />
                                    <span className="is-drawer-close:hidden">All Pending Requerst</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/admin/find-coustomer'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Find Coustomer">
                                    <MdFindInPage />
                                    <span className="is-drawer-close:hidden">Find Coustomer</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link to={'/admin/search-rider'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Search Rider">                                    
                                    <FaSearch />
                                    <span className="is-drawer-close:hidden">Search Rider</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/admin/all-rider'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="See All Rider">
                                    <RiEBike2Line />
                                    <span className="is-drawer-close:hidden">See All Rider</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/admin/assign-rider'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign Rider">
                                    <MdAssignmentAdd />
                                    <span className="is-drawer-close:hidden">Assign Rider</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home">
                                    <FaHome />
                                    <span className="is-drawer-close:hidden">Public Home</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;