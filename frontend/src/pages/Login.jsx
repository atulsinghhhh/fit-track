import React, { useContext, useState,useEffect } from 'react'
import { authDataProvider } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isPending,setIsPending]=useState(false);

    const navigate=useNavigate();

    const {baseUrl,setUser,setIsLoggedIn}=useContext(authDataProvider);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const response = await axios.post(`${baseUrl}/auth/login`,{ email, password },
                { withCredentials: true }
            );

            console.log(response.data)
            setIsLoggedIn(true);
            setUser(response.data.user);
            navigate("/");
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            console.log("Login error:", message);
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className='h-screen flex flex-cols items-center justify-center p-4'>
            <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
            {/* login  */}
            <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
            <div className='mb-4 flex items-center justify-start gap-2'>
                <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                    Fitness
                </span>
            </div>
            {/* form data */}
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <h2 className='text-xl font-semibold'>Login to their Account</h2>
                </div>
                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text mb-2'>Email</span>
                    </label>

                    <input
                        type='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className='input input-bordered w-full'
                        placeholder='enter your email'
                    />
                </div>

                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text mb-2'>Password</span>
                    </label>

                    <input
                        type='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className='input input-bordered w-full'
                        placeholder='enter your password'
                    />
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" required />
                    <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                    </span>
                    </label>
                </div>

                <button className='btn btn-primary w-full' type='submit'>
                    {isPending ? "Login...": "Sign in"}
                </button>

                <div className='text-center mt-4'>
                    <p className='text-sm'>
                        Don't have an account? {" "}
                        <Link to="/signup" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
            </div>

            <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/5 items-center justify-center'>
                <div className='max-w-md p-8'>
                    <div className='relative aspect-square max-w-sm mx-auto'>
                        <img src='/fitness.png' alt='Language connection illustration' className='w-full h-full'/>
                    </div>
                </div>
            </div>
            </div>
        
        </div>
    )
}

export default Login
