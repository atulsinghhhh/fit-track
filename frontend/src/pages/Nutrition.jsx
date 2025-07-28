import React from 'react'
import NutritionDashboard from '../components/NutritionDashboard';

function Nutrition() {

    const today=new Date().toISOString().split('T')[0];

    const thisMonday=new Date(today);
    thisMonday.setDate(thisMonday.getDate()-thisMonday.getDay()+1);

    const startOfWeek=thisMonday.toISOString().split('T')[0]

    return (
        <div className='p-6'>
            <div className='mt-6'>
                <NutritionDashboard date={today} weekStart={startOfWeek}/>
            </div>
        </div>
    )
}

export default Nutrition
