import { FaRegCompass } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const handleActiveNavLink = ({ isActive }) => {
        return {
            color: isActive ? "#F2613F" : "",
            backgroundColor: isActive ? "#00000000" : "",
            borderRadius: '0px',
            borderBottom: isActive ? "2px solid #F2613F" : "",
            fontWeight: isActive ? "600" : "",
        };
    };

    const links = <>
        <li><NavLink to="/" style={handleActiveNavLink}>Home</NavLink></li>
        <li><NavLink to="/packages" style={handleActiveNavLink}>Packages</NavLink></li>
        <li><NavLink to="/blogs" style={handleActiveNavLink}>Blogs</NavLink></li>
        <li><NavLink to="/about-us" style={handleActiveNavLink}>About us</NavLink></li>
        <li><NavLink to="/contact-us" style={handleActiveNavLink}>Contact us</NavLink></li>
    </>

    return (
        <div className="bg-[#0C0C0C]">
            <div className="navbar text-white container mx-auto px-4">
                <div className="navbar-start">
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="lg:hidden mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-[#0C0C0C] gap-3">
                            { links }
                        </ul>
                    </div>
                    <div className="flex items-center gap-2">
                    <FaRegCompass className="text-xl text-[#F2613F] mt-1"/>
                        <h2 className="text-xl font-bold">COM<span className="text-[#F2613F]">PASS</span></h2>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-3">
                        { links }
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex-none gap-2">
                        <div className="dropdown dropdown-hover dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#0C0C0C] rounded-box w-52">
                                <li><a>Dashboard</a></li>
                                <li><a>Log in</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;