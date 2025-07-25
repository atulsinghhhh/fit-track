import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { authDataProvider } from '../Context/AuthContext';
import axios from 'axios';

function Signup() {

    const [signup,setSignup]=useState({
        fullName: "",
        email: "",
        password: ""
    });
    const [isPending,setIsPending]=useState("");

    const {baseUrl}=useContext(authDataProvider);
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.post(`${baseUrl}/auth/signup`,
                signup
            ,{withCredentials: true});
            navigate("/onboard")
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>
            <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
                {/* signup form */}
                <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
                    {/* logo */}
                    <div className='mb-4 flex items-center justify-start gap-2'>
                        <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                            Fitness
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className='w-full space-y-6'>
                        <div>
                            <h2 className='text-xl font-semibold'>Create your Account</h2>
                        </div>
                        
                        <div className='space-y-3'>
                            <div className='form-control w-full'>
                                <label className='label mb-2'>
                                    <span className='label-text'>Full Name</span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='enter your fullname'
                                    className='input input-bordered w-full'
                                    value={signup.fullName}
                                    onChange={(e) => setSignup({ ...signup, fullName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className='form-control w-full'>
                                <label className='label mb-2'>
                                    <span className='label-text'>Email</span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='enter your email'
                                    className='input input-bordered w-full'
                                    value={signup.email}
                                    onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className='form-control w-full'>
                                <label className='label mb-2'>
                                    <span className='label-text'>Password</span>
                                </label>
                                <input
                                    type='password'
                                    placeholder='enter your password'
                                    className='input input-bordered w-full'
                                    value={signup.password}
                                    onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                                    required
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
                                {isPending ? "Signing up...": "Create Account"}
                            </button>

                            <div className='text-center mt-4'>
                                <p className='text-sm'>
                                    Already have an account? {" "}
                                    <Link to="/login" className="text-primary hover:underline">
                                        Sign in
                                    </Link>
                                </p>
                            </div>


                        </div>
                    </form>
                </div>

                <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
                    <div className='max-w-md p-8'>
                        <div className='relative aspect-square max-w-sm mx-auto'>
                            <img src='/fitness.png' alt='Language connection illustration' className='w-full h-full'/>
                        </div>

                        {/* <div className='text-center space-y-3 mt-6'>
                            <h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
                            <p className='opacity-70'>
                                Practice conversations,make friends, and improve your language skills together
                            </p>
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
