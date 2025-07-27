import React, { useContext, useEffect, useState } from 'react'
import { authDataProvider } from "../Context/AuthContext"
import axios from 'axios';
import PageLoader from "./Pageloader"

function DailySummary({selectedDate}) {

    const [summary,setSummary]=useState(null);

    const {baseUrl}=useContext(authDataProvider);

    useEffect(()=>{

        // for debug purpose
        
        // if (!selectedDate) {
        //     console.warn("selectedDate is undefined");
        //     return;
        // }

        axios.get(`${baseUrl}/nutrition/daily?date=${selectedDate}`,
            {withCredentials:true}
        )
        .then(res=> setSummary(res.data))
        .catch(console.error)
    },[selectedDate,baseUrl])

    

    if(!summary) return <PageLoader/>

    const {totals,goal,diff}=summary

    return (
        <div className='p-4 shadow-xl rounded'>
            <h2 className='text-xl font-bold mb-2 text-center'>Daily Summary -{selectedDate}</h2>
            <div className='grid grid-cols-4 gap-4 text-center'>
                {['calories','protein','carbs','fats'].map(macro=>(
                    <div key={macro} className='p-2 rounded'>
                        <h3 className='font-semibold capitalize'>{macro}</h3>
                        <p>Consumed: {totals[macro]}</p>
                        <p>Goal: {goal[macro]}</p>

                        <p className={`${diff[macro]>0 ? 'text-red-500' : 'text-green-500'}`}> 
                            {diff[macro] > 0 ? `+${diff[macro]}` : diff[macro]}
                        </p>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default DailySummary
