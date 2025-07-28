import React, { useContext } from 'react'
import { authDataProvider } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

function Navbar() {
    const {user,baseUrl,setIsLoggedIn,setUser}=useContext(authDataProvider);

    const navigate=useNavigate();

    const handleLogout=async()=>{
        try {
            const response=await axios.post(`${baseUrl}/auth/logout`,{},{
                withCredentials:true
            });
            setIsLoggedIn(false);
            setUser(null);
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="bg-base-100 shadow-md sticky top-0 z-50 px-6 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left - Logo */}
                <div className="flex items-center flex-shrink-0">
                    <Link
                        to="/"
                        className="btn btn-ghost normal-case text-2xl font-bold text-primary"
                    >
                        FitTrack
                    </Link>
                </div>

                {/* Center - Nav Links */}
                <div className="flex-grow">
                    <ul className="flex justify-center space-x-6">
                        <li><Link to="/workout" className="text-base font-medium">Workout</Link></li>
                        <li><Link to="/food" className="text-base font-medium">Food</Link></li>
                        <li><Link to="/progress" className="text-base font-medium">Progress Track</Link></li>
                        <li><Link to="/nutrition" className="text-base font-medium">Nutrition</Link></li>
                    </ul>
                </div>

                {/* Right - Profile or Login */}
                <div className="flex items-center space-x-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        src={user.profilePic || "/default-avatar.png"}
                                        alt="profile"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <Link
                                        to="/profile"
                                        className="flex items-center justify-between px-4 py-2 rounded-md hover:bg-base-200 text-sm font-medium"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 rounded-md hover:bg-base-200 text-sm font-medium"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>

                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="btn btn-primary btn-sm text-white font-semibold"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
