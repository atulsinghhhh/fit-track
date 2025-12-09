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
        <div className="bg-base-300/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-content/5">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Left - Logo */}
                <div className="flex items-center flex-shrink-0">
                    <Link
                        to="/"
                        className="btn btn-ghost normal-case text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:bg-base-content/5"
                    >
                        FitTrack
                    </Link>
                </div>

                {/* Center - Nav Links (Only if logged in) */}
                {user && (
                    <div className="hidden md:flex flex-grow justify-center">
                        <ul className="menu menu-horizontal px-1 gap-1">
                            <li><Link to="/" className='font-medium hover:text-primary focus:text-primary'>Home</Link></li>
                            <li><Link to="/workout" className="font-medium hover:text-primary focus:text-primary">Workout</Link></li>
                            <li><Link to="/food" className="font-medium hover:text-primary focus:text-primary">Food</Link></li>
                            <li><Link to="/progress" className="font-medium hover:text-primary focus:text-primary">Progress</Link></li>
                            <li><Link to="/nutrition" className="font-medium hover:text-primary focus:text-primary">Nutrition</Link></li>
                        </ul>
                    </div>
                )}

                {/* Right - Profile or Login */}
                <div className="flex items-center space-x-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2">
                                <div className="w-9 rounded-full">
                                    <img
                                        src={user.profilePic || "/default-avatar.png"}
                                        alt="profile"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-200 rounded-box w-52 border border-base-content/5"
                            >
                                <li>
                                    <Link
                                        to="/profile"
                                        className="justify-between"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-error"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>

                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className="btn btn-ghost btn-sm"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="btn btn-primary btn-sm text-primary-content"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
