import axios from 'axios';
import React, { useState,useEffect, useContext } from 'react'
import { authDataProvider } from '../Context/AuthContext';
import { Line } from 'react-chartjs-2';


function WeeklySummary({startDate}) {
    const [weeklyData,setWeeklyData]=useState([]);

    const {baseUrl}=useContext(authDataProvider);

    useEffect(()=>{
        axios.get(`${baseUrl}/nutrition/weekly?start=${startDate}`,{
            withCredentials: true
        })
        .then(res=> setWeeklyData(res.data))
        .catch(console.error)
    },[startDate]);

    const chartData= {
        labels: weeklyData.map(day => day._id), //x-axis
        datasets: [
            {
                label: 'Calories',
                data: weeklyData.map(day => day.calories),
                borderColor: 'rgb(255, 99, 132)',
                fill: false,
            },
            {
                label: 'Protein',
                data: weeklyData.map(day => day.protein),
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
            },
            {
                label: 'Carbs',
                data: weeklyData.map(day => day.carbs),
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
            }, 
            {
                label: 'Fats',
                data: weeklyData.map(day => day.fats),
                borderColor: 'rgb(54, 162, 235)',
                fill: false,
            }
        ]
    }

    
    return (
        <div className='p-4 shadow-xl rounded-lg mt-6'>
            <h2 className='text-xl font-bold mb-2'>Weekly Nutrition Trends </h2>
            <Line data={chartData}/>
        </div>
    )
}

export default WeeklySummary
