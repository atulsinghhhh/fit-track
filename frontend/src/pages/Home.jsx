import React,{useState} from 'react'

import  NutritionDashboard from "../components/NutritionDashboard"

function Home() {
    const [showNutrition,setShowNutrition]=useState(false);

    const today=new Date().toISOString().split('T')[0];

    const thisMonday=new Date(today);
    thisMonday.setDate(thisMonday.getDate()-thisMonday.getDay()+1);

    const startOfWeek=thisMonday.toISOString().split('T')[0]

    return (
        <>
        {/* <div className='p-6'>
            <button onClick={()=>setShowNutrition(true)} className='btn btn-primary '>
                View Nutrition Summary
            </button>

            {showNutrition && (
                <div className='mt-6'>
                    < NutritionDashboard date={today} weekStart={startOfWeek}/>
                </div>
            )}
        </div> */}
        </>
    )
}

export default Home
