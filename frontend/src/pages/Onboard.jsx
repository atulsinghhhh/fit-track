import React, { useContext, useState } from 'react';
import { authDataProvider } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Onboard() {
    const { user, baseUrl } = useContext(authDataProvider);

    const [formState, setFormState] = useState({
        fullName: user?.fullName || "",
        weight: user?.weight || "",
        age: user?.age || "",
        goal: user?.goal || "",
        height: user?.height || "",
        profilePic: user?.profilePic || null,
        gender: user?.gender || ""
    });

    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormState({ ...formState, profilePic: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("fullName", formState.fullName);
            formData.append("weight", formState.weight);
            formData.append("age", formState.age);
            formData.append("goal", formState.goal);
            formData.append("height", formState.height);
            formData.append("gender", formState.gender);

            if (formState.profilePic) {
                formData.append("profilePic", formState.profilePic);
            }

            const response = await axios.post(`${baseUrl}/auth/onboard`, formData, {
                withCredentials: true,
            });

            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.log("Upload Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
                <div className="card-body p-6 sm:p-8">
                    <h2 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete your profile</h2>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='flex flex-col items-center justify-center space-y-4'>
                            <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-sm text-gray-500">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text mb-2">Full Name</span>
                            </label>
                            <input
                                type="text"
                                value={formState.fullName}
                                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                className="input input-bordered w-full"
                                placeholder="Enter full name"
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text mb-2'>Weight (kg)</span>
                                </label>
                                <input
                                    type='text'
                                    value={formState.weight}
                                    onChange={(e) => setFormState({ ...formState, weight: e.target.value })}
                                    className='input input-bordered w-full'
                                    placeholder='Enter weight'
                                />
                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text mb-2'>Height (cm)</span>
                                </label>
                                <input
                                    type='text'
                                    value={formState.height}
                                    onChange={(e) => setFormState({ ...formState, height: e.target.value })}
                                    className='input input-bordered w-full'
                                    placeholder='Enter height'
                                />
                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text mb-2'>Age</span>
                                </label>
                                <input
                                    type='text'
                                    value={formState.age}
                                    onChange={(e) => setFormState({ ...formState, age: e.target.value })}
                                    className='input input-bordered w-full'
                                    placeholder='Enter age'
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
                                onChange={(e) => setFormState({ ...formState, goal: e.target.value })}
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
                                <span className='label-text mb-2'>Gender</span>
                            </label>
                            <select
                                name='gender'
                                value={formState.gender}
                                onChange={(e) => setFormState({ ...formState, gender: e.target.value })}
                                className='select select-bordered w-full'
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            Onboard
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Onboard;
