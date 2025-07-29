import React, { useContext, useEffect, useState } from 'react';
import { authDataProvider } from '../Context/AuthContext';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ProgressPage() {
    const { user, baseUrl } = useContext(authDataProvider);

    const [weeklyNutrition, setWeeklyNutrition] = useState([]);
    const [weeklyWorkout, setWeeklyWorkout] = useState([]);
    const [startDate, setStartDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        fetchWeeklyNutrition();
        fetchWeeklyWorkout();
    }, [startDate]);

    const fetchWeeklyNutrition = async () => {
        try {
            const response = await axios.get(`${baseUrl}/nutrition/weekly?start=${startDate}`, {
                withCredentials: true
            });
            setWeeklyNutrition(response.data);
        } catch (error) {
            console.log("Error fetching weekly nutrition: ", error);
        }
    };

    const fetchWeeklyWorkout = async () => {
        try {
            const response = await axios.get(`${baseUrl}/workout/weekly?start=${startDate}`, {
                withCredentials: true
            });
            setWeeklyWorkout(response.data.data);
        } catch (error) {
            console.log("Error fetching weekly workout: ", error);
        }
    };

    const getWeekDates = (startDate) => {
        const start = new Date(startDate);
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            dates.push(d.toISOString().split("T")[0]);
        }
        return dates;
    };

    const handleWeekChange = (days) => {
        const current = new Date(startDate);
        current.setDate(current.getDate() + days);

        const today = new Date();
        const maxDate = new Date(today);
        maxDate.setHours(0, 0, 0, 0);

        // Prevent navigating to future dates
        if (current <= maxDate) {
            setStartDate(current.toISOString().split("T")[0]);
        }
    };

    const weekLabels = getWeekDates(startDate);

    const nutritionMap = Object.fromEntries(
        weeklyNutrition.map(entry => [entry._id, entry])
    );

    const normalizedNutrition = weekLabels.map(date => ({
        calories: nutritionMap[date]?.calories || 0,
        protein: nutritionMap[date]?.protein || 0,
        carbs: nutritionMap[date]?.carbs || 0,
        fats: nutritionMap[date]?.fats || 0
    }));

    const workoutMap = Object.fromEntries(
        weeklyWorkout.map(entry => [entry._id, entry])
    );

    const normalizedWorkout = weekLabels.map(date => ({
        CaloriesBurned: workoutMap[date]?.CaloriesBurned || 0
    }));

    const nutritionData = {
        labels: weekLabels,
        datasets: [
            {
                label: "Calories",
                data: normalizedNutrition.map(entry => entry.calories),
                backgroundColor: "#f87171"
            },
            {
                label: "Protein",
                data: normalizedNutrition.map(entry => entry.protein),
                backgroundColor: '#60a5fa'
            },
            {
                label: 'Carbs',
                data: normalizedNutrition.map(entry => entry.carbs),
                backgroundColor: '#34d399'
            },
            {
                label: 'Fats',
                data: normalizedNutrition.map(entry => entry.fats),
                backgroundColor: '#fbbf24'
            }
        ]
    };

    const workoutData = {
        labels: weekLabels,
        datasets: [
            {
                label: 'Calories Burned',
                data: normalizedWorkout.map(entry => entry.CaloriesBurned),
                backgroundColor: '#a78bfa'
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false }
        }
    };

    return (
        <div className='p-6 space-y-10'>
            <h2 className='text-2xl font-bold text-center'>Your Weekly Progress</h2>

            {/* Week navigation */}
            <div className="flex justify-center gap-4 my-4">
                <button className="btn btn-outline" onClick={() => handleWeekChange(-7)}>
                    ⬅️ Previous Week
                </button>
                <span className="text-lg font-medium">{weekLabels[0]} → {weekLabels[6]}</span>
                <button className="btn btn-outline" onClick={() => handleWeekChange(7)}>
                    Next Week ➡️
                </button>
            </div>

            {/* Nutrition chart */}
            <div>
                <h3 className='text-xl font-semibold mb-2'>Nutrition</h3>
                <Bar data={nutritionData} options={chartOptions} />
            </div>

            {/* Workout chart */}
            <div>
                <h3 className='text-xl font-semibold mb-2'>Workout</h3>
                <Bar data={workoutData} options={chartOptions} />
            </div>
        </div>
    );
}

export default ProgressPage;
