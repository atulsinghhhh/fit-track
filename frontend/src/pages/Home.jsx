import React,{useContext, useEffect, useState} from 'react'
import { authDataProvider } from "../Context/AuthContext"
import { useNavigate } from "react-router"
import MacroPieChart from "../components/MacroPieChart"
import SummaryCard from "../components/SummaryCard"
import WorkoutCard from "../components/WorkoutCard"
import MealCard from "../components/MealCard"
import axios from 'axios'

function Home() {
    const {user,baseUrl}=useContext(authDataProvider);

    const [summary,setSummary]=useState({})
    const [totals,setTotals]=useState({})
    const [meals,setMeals]=useState([])
    const [workout,setWorkout]=useState(null)

    const navigate=useNavigate()

    useEffect(()=>{

        const fetchTodaysWokout=async()=>{
            try {
                const date=new Date().toISOString().split("T")[0];

                const response=await axios.get(`${baseUrl}/workout/today?date=${date}`,{
                    withCredentials: true
                });
                setWorkout(response.data.workouts)
                console.log(response.data);

            } catch (error) {
                console.log("failed to fetch the today workout",error);
            }
        }

        const fetchTodaysMeal=async()=>{
            try {
                const date=new Date().toISOString().split("T")[0];

                const response=await axios.get(`${baseUrl}/food/meals?date=${date}`,{
                    withCredentials: true
                });
                setMeals(response.data.meals);
                console.log(response.data);
            } catch (error) {
                console.log("failed to fetch the today meal");
            }
        }

        const fetchNutritionSummary = async () => {
        try {
            const date = new Date().toISOString().split("T")[0];
            const response = await axios.get(`${baseUrl}/nutrition/daily?date=${date}`, {
                withCredentials: true
            });
            setTotals(response.data.totals); 
        } catch (error) {
            console.error("Error fetching nutrition summary", error);
        }
        };

        const fetchDailySummary=async()=>{
            try {
                const date=new Date().toISOString().split("T")[0];
                const response=await axios.get(`${baseUrl}/summary/daily?date=${date}`,{
                    withCredentials: true
                });

                console.log(response.data);
                setSummary(response.data)
            } catch (error) {
                console.log("Error fetching the daily summary",error);
            }
        }


        fetchNutritionSummary();
        fetchTodaysWokout();
        fetchTodaysMeal();
        fetchDailySummary()
    },[])



    return (
        <>
            <div className='p-4 min-h-screen'>
                <header className='mb-4 flex justify-between items-center'>
                    <div>
                        <h1 className="text-2xl font-bold">{user?.fullName || ""}</h1>
                        <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                    </div>
                    {/* TODO: HERE SHOW THE PROFILE USER */}
                </header>

                {/* Summary Cards */}
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
                    <SummaryCard title="Calories Consumed" value={`${summary.totalCalories || 0} kcal`} />
                    <SummaryCard title="Calories Burned" value={`${summary.workoutCalories || 0} kcal`}/>
                    <SummaryCard title="Meals Logged" value={`${summary.foodCount || 0} `} /> 
                    <SummaryCard title="Workout Done" value={`${summary.workoutCount || 0}`}/>
                </div>

                {/* Macro Chart */}
                {totals && <MacroPieChart totals={totals}/>}

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-6">
                    {/* Workout Card */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                        <h2 className="card-title text-xl font-bold text-neutral">Today's Workout</h2>

                        {workout && workout.length > 0 ? (
                            <div className="space-y-4">
                            {workout.map((item, index) => (
                                <WorkoutCard key={item._id || index} workout={item} />
                            ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-2">No workout logged today</p>
                        )}
                        </div>
                    </div>

                    {/* Meal Card */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                        <h2 className="card-title text-xl font-bold text-neutral">Today's Meals</h2>

                        {meals.length > 0 ? (
                            <div className="space-y-4">
                            {meals.map((meal, idx) => (
                                <MealCard key={idx} meal={meal} />
                            ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-2">No meals logged today</p>
                        )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='mt-6 flex gap-4'>
                    <button onClick={()=>navigate("")} className='btn btn-primary'>Add Workout</button>
                    <button onClick={()=>navigate("")} className='btn btn-primary'>Add Food</button>
                </div>



            </div>
        
        </>
    )
}

export default Home

