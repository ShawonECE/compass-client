import { useContext } from "react";
import { FaRegCompass } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { LuUserCircle } from "react-icons/lu";

const NavBar = () => {
    const {user, logOutUser, loading} = useContext(AuthContext);

    const handleLogOut = () => {
        logOutUser()
        .catch(error => console.error(error));
    };

    const handleActiveNavLink = ({ isActive }) => {
        return {
            color: isActive ? "#F2613F" : "",
            backgroundColor: isActive ? "#00000000" : "",
            borderRadius: '0px',
            borderBottom: isActive ? "2px solid #F2613F" : "",
            fontWeight: isActive ? "600" : "",
        };
    };

    const handleActiveNavLink2 = ({ isActive }) => {
        return {
            color: isActive ? "#F2613F" : "",
            backgroundColor: isActive ? "#00000000" : "",
            borderRadius: '8px',
            border: isActive ? "2px solid #F2613F" : "",
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
                                {
                                    !loading && (user?.photoURL ?
                                        <div className="avatar">
                                            <div className="w-8 rounded-full">
                                                <img src={user.photoURL} />
                                            </div>
                                        </div>
                                        :
                                        <LuUserCircle className="text-[32px]" />)
                                }
                                {
                                    loading &&
                                    <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                                }
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#0C0C0C] rounded-box w-52">
                                {
                                    user &&
                                    <>
                                        <li className="mb-1 text-[#F2613F]">{ user.displayName }</li>
                                        <li className="mb-2 text-[#F2613F]">{ user.email }</li>
                                    </>
                                }
                                <li>
                                    {
                                        !loading && (user ?
                                            <button onClick={handleLogOut} className="btn-block bg-[#F2613F] border-0">Log Out</button>
                                            :
                                            <NavLink to="/login" style={handleActiveNavLink2}>Log in</NavLink>)
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;