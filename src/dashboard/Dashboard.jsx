import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const handleActiveNavLink2 = ({ isActive }) => {
        return {
            color: isActive ? "#F2613F" : "",
            backgroundColor: isActive ? "#00000000" : "",
            borderRadius: '8px',
            border: isActive ? "2px solid #F2613F" : "",
            fontWeight: isActive ? "600" : "",
        };
    };
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 drawer-button lg:hidden absolute top-5 left-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <div className="mt-10 lg:mt-0">
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#0C0C0C] text-white gap-2">
                    {/* Sidebar content here */}
                    <li><NavLink to="/" style={handleActiveNavLink2}>Home</NavLink></li>
                    <li><NavLink to="/dashboard/profile" style={handleActiveNavLink2}>Profile</NavLink></li>
                    <li><NavLink to="/dashboard/my-bookings" style={handleActiveNavLink2}>My Bookings</NavLink></li>
                    <li><NavLink to="/dashboard/my-wishlist" style={handleActiveNavLink2}>My Wishlist</NavLink></li>
                    <li><NavLink to="/dashboard/be-guide" style={handleActiveNavLink2}>Be a Guide</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;