import React, { useContext, useEffect, useState } from 'react'
import { authDataProvider } from '../Context/AuthContext';
import axios from 'axios';
import DailySummary from './DailySummary';
import  NutritionInsights from "./NutritionInsights"
import WeeklySummary from "./WeeklySummary"
import MacroPieChart from "./MacroPieChart"

function NutritionDashboard({date,weekStart}) {
    const [totals,setTotals]=useState(null);

    const {baseUrl}=useContext(authDataProvider);

    useEffect(()=>{
        const fetchDaily =async()=>{
            try {
                const response=await axios.get(`${baseUrl}/nutrition/daily?date=${date}`,
                    {withCredentials:true}
                );

                setTotals(response.data.totals);
                
            } catch (error) {
                console.log("failed to fetch the nutrition",error)
            }
        }

        fetchDaily();
    },[date])


    return (
        <div>
            <DailySummary selectedDate={date}/>
            <NutritionInsights date={date}/>
            {totals && <MacroPieChart totals={totals}/>}
            <WeeklySummary startDate={weekStart}/>
        
        </div>
    )
}

export default NutritionDashboard
