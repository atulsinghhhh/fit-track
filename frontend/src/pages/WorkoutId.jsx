import React, { useContext, useEffect, useState } from 'react'
import { authDataProvider } from '../Context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import PageLoader from '../components/Pageloader';
import moment from 'moment';

function WorkoutId() {

    const {id}=useParams();
    const navigate=useNavigate();

    const [Workout,setWorkout]=useState(null);
    const [edit,setEdit]=useState(false);
    const [formState,setFormState]=useState({
        name:'',
        duration:'',
        CaloriesBurned:'',
        note:'',
        type: ''
    });

    const {user,baseUrl}=useContext(authDataProvider);

    useEffect(()=>{
        const fetchWorkout=async()=>{
            try {
                const response=await axios.get(`${baseUrl}/workout/${id}`,{
                    withCredentials: true
                });
                // console.log("Workout response:", response.data);
                setWorkout(response.data.Workout);
            } catch (error) {
                console.log(error);
            }
        }
        if(id) fetchWorkout();
    },[id])

    useEffect(() => {
        if (Workout) {
            setFormState({
                name: Workout.name || '',
                duration: Workout.duration || '',
                CaloriesBurned: Workout.CaloriesBurned || '',
                note: Workout.note || ''
            });
        }
    }, [Workout]);

    const handleDelete=async()=>{

        const confirm = window.confirm('Are you sure you want to delete this workout Log?');
        if (!confirm) return;
        try {
            const response=await axios.delete(`${baseUrl}/workout/${id}`,{
                withCredentials: true
            })
            // console.log(response.data);
            navigate("/workouts");
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate=async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.put(`${baseUrl}/workout/${id}`,formState,{
                withCredentials: true
            })
            console.log(response.data);
            setEdit(false);
            setWorkout(response.data.updatedWorkout || formState);
            navigate(`/workout/${id}`)
        } catch (error) {
            console.log(error);
        }
    }

    if(!Workout) return <PageLoader/>

    return (
        <div className='max-w-3xl mx-auto mt-10 p-6 bg-base-100 border border-primary rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-center mb-6'>Workout Details</h2>

            {!edit ? (
                <>
                <div><strong>Exercise Name:</strong> {Workout.name}</div>
                <div><strong>Duration:</strong> {Workout.duration} mins</div>
                <div><strong>Calories Burned:</strong> {Workout.CaloriesBurned}</div>
                <div><strong>Type:</strong> {Workout.type}</div>
                <div><strong>Note:</strong> {Workout.note}</div>
                <div><strong>Logged At:</strong> {moment(Workout.createdAt).format('MMMM Do YYYY, h:mm A')}</div>

                <div className='flex gap-4 mt-6'>
                    <button className='btn btn-warning' onClick={()=>setEdit(true)}>Edit</button>
                    <button className='btn btn-error' onClick={handleDelete}>Delete</button>
                </div>
                </>
            ) : (
                <>
                    <form onSubmit={handleUpdate} className='space-y-4'>
                        {/* Name */}
                        <div className='form-control'>
                            <label className='label mb-2'>
                                <span className='label-text'>Name</span>
                            </label>

                            <input
                                type='text'
                                value={formState.name}
                                onChange={(e)=>setFormState({...formState,name: e.target.value})}
                                className='input input-bordered w-full'
                            />

                        </div>

                        {/* duration */}
                        <div className='form-control'>
                            <label className='label mb-2'>
                                <span className='label-text'>Duration</span>
                            </label>

                            <input
                                type='text'
                                value={formState.duration}
                                onChange={(e)=>setFormState({...formState,duration: e.target.value})}
                                className='input input-bordered w-full'
                            />

                            {/*  */}

                        </div>

                        {/* CaloriesBurned */}

                        <div className='form-control'>
                            <label className='label mb-2'>
                                <span className='label-text'>CaloriesBurned</span>
                            </label>

                            <input
                                type='text'
                                value={formState.CaloriesBurned}
                                onChange={(e)=>setFormState({...formState,CaloriesBurned: e.target.value})}
                                className='input input-bordered w-full'
                            />

                        </div>

                        {/* Note */}

                        <div className='form-control'>
                            <label className='label-text mb-2'>Note</label>
                            <textarea
                                className='textarea textarea-bordered w-full'
                                value={formState.note}
                                onChange={(e) => setFormState({ ...formState, note: e.target.value })}
                            />
                        </div>

                        <div className='flex gap-4 mt-6'>
                            <button type='submit' className='btn btn-success'>Update</button>
                            <button className='btn btn-neutral' onClick={()=>setEdit(false)}>Cancel</button>

                        </div>
                    </form>
                </>
            )}
            
        </div>
    )
}

export default WorkoutId
