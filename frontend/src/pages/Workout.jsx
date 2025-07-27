import React, { useContext, useState, useEffect } from 'react';
import { authDataProvider } from '../Context/AuthContext';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Workout() {
  const [workoutLog, setWorkoutLog] = useState({
    name: '',
    duration: '',
    CaloriesBurned: '',
    note: '',
    type: '',
  });
  const [currentDate, setCurrentDate] = useState('');

  const { baseUrl, user } = useContext(authDataProvider);

  const navigate=useNavigate();

  const userId=user._id;

  useEffect(() => {
    setCurrentDate(moment().format('MMMM Do YYYY, h:mm A'));
  }, []);


  const handleSubmit = async (e) => {
  e.preventDefault();

  
  const payload = {
    ...workoutLog,
    duration: Number(workoutLog.duration),
    CaloriesBurned: Number(workoutLog.CaloriesBurned),
    userId
  };

  try {
    const res = await axios.post(`${baseUrl}/workout/`, payload, {
      withCredentials: true,
    });
    console.log(res.data);
    const workoutId=res.data.log._id;
    navigate(`/workout/${workoutId}`);
  } catch (error) {
    console.error("Axios Error:", error.response?.data || error.message);
    alert("Something went wrong");
  }
};

  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center px-4'>
      <div className='w-full max-w-3xl bg-base-100 shadow-xl rounded-xl p-6 md:p-10 border border-primary'>
        {/* Header */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-center'>Log Your Workout</h2>
          <div className='mt-4 flex justify-between text-lg text-gray-500'>
            <span><strong>Name:</strong> {user?.fullName || 'Loading...'}</span>
            <span><strong>Date:</strong> {currentDate}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Exercise Name */}
            <div className='form-control'>
              <label className='label mb-2'>
                <span className='label-text'>Exercise Name</span>
              </label>
              <input
                type='text'
                className='input input-bordered'
                value={workoutLog.name}
                onChange={(e) => setWorkoutLog({ ...workoutLog, name: e.target.value })}
                required
              />
            </div>

            {/* Duration */}
            <div className='form-control'>
              <label className='label mb-2'>
                <span className='label-text'>Duration (in minutes)</span>
              </label>
              <input
                type='number'
                className='input input-bordered'
                value={workoutLog.duration}
                onChange={(e) => setWorkoutLog({ ...workoutLog, duration: e.target.value })}
                required
              />
            </div>

            {/* Calories Burned */}
            <div className='form-control'>
              <label className='label mb-2'>
                <span className='label-text'>Calories Burned</span>
              </label>
              <input
                type='number'
                className='input input-bordered'
                value={workoutLog.CaloriesBurned}
                onChange={(e) => setWorkoutLog({ ...workoutLog, CaloriesBurned: e.target.value })}
                required
              />
            </div>

            {/* Type */}
            <div className='form-control'>
              <label className='label mb-2'>
                <span className='label-text'>Type</span>
              </label>
              <select
                className='select select-bordered'
                value={workoutLog.type}
                onChange={(e) => setWorkoutLog({ ...workoutLog, type: e.target.value })}
              >
                <option value=''>Select</option>
                <option value='cardio'>cardio</option>
                <option value='strength'>strength</option>
              </select>
            </div>
          </div>

          {/* Note */}
          <div className='form-control'>
            <label className='label mb-2'>
              <span className='label-text'>Notes</span>
            </label>
            <textarea
              className='textarea textarea-bordered w-full'
              rows='3'
              value={workoutLog.note}
              onChange={(e) => setWorkoutLog({ ...workoutLog, note: e.target.value })}
              required
              placeholder='Any additional info about this workout...'
            />
          </div>

          {/* Submit */}
          <div>
            <button type='submit' className='btn btn-primary w-full'>
              Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Workout;
