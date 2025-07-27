import React, { useContext, useEffect, useState } from 'react'
import { authDataProvider } from '../Context/AuthContext';
import axios from 'axios';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);




function Workouts() {
    const [logs,setLogs]=useState([]);
    const [edit,setEdit]=useState(false);

    const {user,baseUrl}=useContext(authDataProvider);

    useEffect(()=>{
        const fetchLogs=async()=>{
            try {
                const response=await axios.get(`${baseUrl}/workout/`,{
                    withCredentials: true
                });
                setLogs(response.data.workouts);
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLogs();
    },[])

    const handleDelete=async(id)=>{
        const confirm = window.confirm('Are you sure you want to delete this workout Log?');
        if (!confirm) return;
        try {
            const response=await axios.delete(`${baseUrl}/workout/${id}`,{
                withCredentials: true
            })
            setLogs(logs.filter(log => log._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    // TODO: ADD THE UPDATE FEATURE HERE
    const handleUpdate=async(e)=>{
        try {
            await axios.put(`${baseUrl}/workout/${edit._id}`, edit, {
                withCredentials: true
            });
            setLogs(logs.map(log => log._id === edit._id ? edit : log));
            setEdit(null);
        } catch (error) {
            console.error("Update error:", error);
        }
    }

    const chartData = {
    labels: logs.map(log => new Date(log.createdAt).toLocaleDateString()), 
    datasets: [
        {
            label: 'Calories Burned',
            data: logs.map(log => log.CaloriesBurned), 
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.2
        }
    ]
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Calories Burned Over Time' }
    }
};

    return (
    <div className='p-6'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Your Workout Logs</h2>


        { logs.length === 0 ? (
            <p>No logs available.</p>
        ) : (
        <div className='overflow-x-auto'>
            <table className='table w-full'>
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Duration (min)</th>
                    <th>Calories Burned</th>
                    <th>Note</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {logs.map(log => (
                <tr key={log._id}>
                    <td>{log.name}</td>
                    <td>{log.duration}</td>
                    <td>{log.CaloriesBurned}</td>
                    <td>{log.note}</td>
                    <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                    <td className='space-x-2'>
                        <button onClick={() => setEdit(log)} className='btn btn-sm btn-warning'>Edit</button>
                        <button onClick={() => handleDelete(log._id)} className='btn btn-sm btn-error'>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}

        {edit && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className=' p-6 rounded-xl shadow-lg w-[90%] max-w-lg'>
            <h2 className='text-xl font-bold mb-4'>Edit Workout</h2>

            <input
                className='input input-bordered w-full mb-3'
                type='text'
                value={edit.name}
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                placeholder='Exercise Name'
            />
            <input
                className='input input-bordered w-full mb-3'
                type='number'
                value={edit.duration}
                onChange={(e) => setEdit({ ...edit, duration: e.target.value })}
                placeholder='Duration (in mins)'
            />
            <input
                className='input input-bordered w-full mb-3'
                type='number'
                value={edit.CaloriesBurned}
                onChange={(e) => setEdit({ ...edit, CaloriesBurned: e.target.value })}
                placeholder='Calories Burned'
            />
            <textarea
                className='textarea textarea-bordered w-full mb-3'
                value={edit.note}
                onChange={(e) => setEdit({ ...edit, note: e.target.value })}
                placeholder='Note'
            />

            <div className='flex justify-end space-x-3'>
                <button onClick={() => setEdit(null)} className='btn'>Cancel</button>
                <button onClick={handleUpdate} className='btn btn-primary'>Save</button>
            </div>
            </div>
        </div>
        )}
        <div className='my-8'>
            <Line data={chartData} options={chartOptions} />
        </div>
        
    </div>
    );

}

export default Workouts
