import React, { useContext, useState } from 'react'
import { authDataProvider } from '../Context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router';

function Onboard() {
    const {user,baseUrl}=useContext(authDataProvider);

    const [formState,setFormState]=useState({
        fullName: user?.fullName || "",
        weight: user?.weight || "",
        age: user?.age || "",
        goal: user?.goal || "",
        height: user?.height || "",
        dailyCalorieTarget: user?.dailyCalorieTarget || ""
    });

    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.post(`${baseUrl}/auth/onboard`,formState,{
                withCredentials: true
            });
            navigate("/login");
            return response.data;

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
                <div className="card-body p-6 sm:p-8">
                    <h2 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete your profile</h2>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='flex flex-col items-center justify-center space-y-4'>
                            {/* TODO: IMAGE PREVIEW */}
                            <div className="size-32 rounded-full bg-base-300 overflow-hidden">

                            </div>
                            
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text mb-2">Full Name</span>
                            </label>
                            <input
                                type="text"
                                value={formState.fullName}
                                onChange={(e)=>setFormState({...formState,fullName: e.target.value})}
                                className="input input-bordered w-full"
                                placeholder="enter full name"
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {/* weight */}
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text mb-2'>Weight</span>
                                </label>
                                <input
                                    type='text'
                                    value={formState.weight}
                                    onChange={(e)=>setFormState({...formState,weight: e.target.value})}
                                    className='input input-bordered w-full'
                                    placeholder='enter your current weight'
                                />
                            </div>
                            {/* height */}
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text mb-2'>Height</span>
                                </label>
                                <input
                                    type='text'
                                    value={formState.height}
                                    onChange={(e)=>setFormState({...formState,height: e.target.value})}
                                    className='input input-bordered w-full'
                                    placeholder='enter your current height'
                                />
                            </div>
                            {/* age */}
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text mb-2'>Age</span>
                                </label>
                                <input
                                    type='text'
                                    value={formState.age}
                                    onChange={(e)=>setFormState({...formState,age: e.target.value})}
                                    className='input input-bordered w-full'
                                    placeholder='enter your current height'
                                />
                            </div>
                        </div>

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text mb-2'>Goal</span>
                            </label>
                            <select
                                name='goal'
                                value={formState.goal}
                                onChange={(e)=>setFormState({...formState,goal:e.target.value})}
                                className='select select-bordered w-full'
                            >
                                <option value="">Select</option>
                                <option value="maintain">Maintain</option>
                                <option value="loss">Loss</option>
                                <option value="gain">Gain</option>
                            </select>
                        </div>

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text mb-2'>TargetCalories</span>
                            </label>
                            <input
                                type='text'
                                value={formState.dailyCalorieTarget}
                                onChange={(e)=>setFormState({...formState,dailyCalorieTarget:e.target.value})}
                                className='input input-bordered w-full'
                                placeholder='enter your daily calories'
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full" >
                            Onboard
                        </button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Onboard
