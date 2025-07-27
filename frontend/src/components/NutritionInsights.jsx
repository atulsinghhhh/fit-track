import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { authDataProvider } from '../Context/AuthContext';

function NutritionInsights({date}) {
    const [insights,setInsinghts]=useState([]);

    const {baseUrl}=useContext(authDataProvider);
    

    useEffect(()=>{
        axios.get(`${baseUrl}/nutrition/insights?date=${date}`,{
            withCredentials: true
        })
        .then(res=>setInsinghts(res.data.insights))
        .catch(console.error)
    },[date])


    return (
        <div className='p-4  border-l-4 border-yellow-400 rounded-md mt-6'>
            <h3 className='font-bold text-lg'>Nutrition Insights</h3>
            <ul className='list-disc ml-5'>
                {insights.map((tip,i)=>(
                    <li key={i}>{tip}</li>
                ))}
            </ul>
        </div>
    )
}

export default NutritionInsights
