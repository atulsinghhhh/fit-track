import React,{useContext, useEffect, useState} from 'react'
import { authDataProvider } from "../Context/AuthContext"
import { useNavigate } from "react-router"
import MacroPieChart from "../components/MacroPieChart"
import SummaryCard from "../components/SummaryCard"
import WorkoutCard from "../components/WorkoutCard"
import MealCard from "../components/MealCard"
import axios from 'axios'
import LandingPage from "./LandingPage"

function Home() {
    const {user,baseUrl}=useContext(authDataProvider);

    const [summary,setSummary]=useState({})
    const [totals,setTotals]=useState({})
    const [meals,setMeals]=useState([])
    const [workout,setWorkout]=useState(null)

    const navigate=useNavigate()

    useEffect(()=>{
        if (!user) return; // Don't fetch if not logged in

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
            console.log("Error fetching nutrition summary", error);
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

        fetchTodaysWokout();
        fetchTodaysMeal();
        fetchNutritionSummary();
        fetchDailySummary();
    },[user]) // Add user as dependency

    // If no user, show Landing Page
    if (!user) {
        return <LandingPage />
    }

    return (
        <>
            <div className='min-h-screen pb-12 transition-all duration-500'>
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-8 md:py-12 max-w-7xl mx-auto w-full animate-fade-in-down">
                    <div className="mb-6 md:mb-0">
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                            Hello, <span className="text-primary">{user?.fullName?.split(" ")[0] || "User"}</span> 👋
                        </h1>
                        <p className="text-base-content/60 font-medium">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                        })}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => navigate("/workouts")} className="btn btn-primary shadow-lg shadow-primary/20">
                            Log Workout
                        </button>
                        <button onClick={() => navigate("/foods")} className="btn btn-secondary shadow-lg shadow-secondary/20">
                            Log Food
                        </button>
                    </div>

                </header>

                <div className="max-w-7xl mx-auto px-6 space-y-8">
                    {/* Summary Cards */}
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up' style={{animationDelay: '0.1s'}}>
                        <SummaryCard title="Calories Consumed" value={`${summary.totalCalories || 0} kcal`} />
                        <SummaryCard title="Calories Burned" value={`${summary.workoutCalories || 0} kcal`}/>
                        <SummaryCard title="Meals Logged" value={`${summary.foodCount || 0} `} /> 
                        <SummaryCard title="Workouts" value={`${summary.workoutCount || 0}`}/>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2 mt-6">
                         {/* Macro Chart */}
                         <div className="card bg-base-200/50 backdrop-blur-sm border border-base-content/5 shadow-sm animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            <div className="card-body">
                                <h2 className="card-title text-lg font-bold mb-4">Nutrition Overview</h2>
                                {totals && <div className="h-64 flex justify-center items-center"><MacroPieChart totals={totals}/></div>}
                                {!totals && <div className="skeleton w-full h-64 rounded-full opacity-20"></div>}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Workout Card */}
                            <div className="card bg-base-200/50 backdrop-blur-sm border border-base-content/5 shadow-sm animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                                <div className="card-body">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="card-title text-lg font-bold">Today's Workout</h2>
                                    <button onClick={() => navigate("/workouts")} className="btn btn-xs btn-ghost text-primary">View All</button>
                                </div>
                                

                                {workout && workout.length > 0 ? (
                                    <div className="space-y-4">
                                    {workout.map((item, index) => (
                                        <WorkoutCard key={item._id || index} workout={item} />
                                    ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 opacity-60">
                                        <p>No workout logged today</p>
                                        <button onClick={() => navigate("/workouts")} className="btn btn-link btn-xs">Log one now</button>
                                    </div>
                                )}
                                </div>
                            </div>

                            {/* Meal Card */}
                            <div className="card bg-base-200/50 backdrop-blur-sm border border-base-content/5 shadow-sm animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                                <div className="card-body">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="card-title text-lg font-bold">Today's Meals</h2>
                                    <button onClick={() => navigate("/foods")} className="btn btn-xs btn-ghost text-primary">View All</button>
                                </div>

                                {meals.length > 0 ? (
                                    <div className="space-y-4">
                                    {meals.map((meal, idx) => (
                                        <MealCard key={idx} meal={meal} />
                                    ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 opacity-60">
                                        <p>No meals logged today</p>
                                        <button onClick={() => navigate("/foods")} className="btn btn-link btn-xs">Log one now</button>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>

            </div>
        
        </>
    )
}

export default Home

