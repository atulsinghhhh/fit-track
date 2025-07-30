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
  const navigate = useNavigate();

  const userId = user?._id;

  useEffect(() => {
    setCurrentDate(moment().format('MMMM Do YYYY, h:mm A'));
  }, []);

  // MET calculator helper
  const getExerciseMET = (name, type) => {
    const exercise = name.toLowerCase();
    if (type === 'cardio') return 6.0;

    if (exercise.includes('deadlift') || exercise.includes('squat') || exercise.includes('push')) return 6.0;
    if (exercise.includes('chest') || exercise.includes('press') || exercise.includes('pull')) return 5.0;
    if (exercise.includes('biceps') || exercise.includes('triceps') || exercise.includes('lateral')) return 4.5;

    return 4.0; // default strength MET
  };

  const calculateCalories = () => {
    const { name, duration, type } = workoutLog;
    if (!name || !duration || !type || !user?.weight) {
      alert("Please fill in Name, Type, Duration, and ensure user weight is set.");
      return;
    }

    const MET = getExerciseMET(name, type);
    const hours = Number(duration) / 60;
    const calories = MET * user.weight * hours;

    setWorkoutLog(prev => ({
      ...prev,
      CaloriesBurned: Math.round(calories)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...workoutLog,
      duration: Number(workoutLog.duration),
      CaloriesBurned: Number(workoutLog.CaloriesBurned),
      userId,
    };

    try {
      const res = await axios.post(`${baseUrl}/workout/`, payload, {
        withCredentials: true,
      });
      const workoutId = res.data.log._id;
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

            {/* Calories Burned (auto-calculated) */}
            <div className='form-control'>
              <label className='label mb-2'>
                <span className='label-text'>Calories Burned</span>
              </label>
              <div className='flex gap-2 items-center'>
                <input
                  type='number'
                  className='input input-bordered flex-1'
                  value={workoutLog.CaloriesBurned}
                  readOnly
                  placeholder='Click Calculate'
                />
                <button type='button' onClick={calculateCalories} className='btn btn-sm btn-secondary'>
                  Calculate
                </button>
              </div>
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
                required
              >
                <option value=''>Select</option>
                <option value='cardio'>Cardio</option>
                <option value='strength'>Strength</option>
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

