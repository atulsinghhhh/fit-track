import React, { useState } from 'react'
import FoodForm from "../components/FoodForm"
import Foodlist from "../components/Foodlist"

function Foodlog() {

    const [refresh,setRefresh]=useState(false);
    const today=new Date().toISOString().split('T')[0]


    return (
        <div className='max-w-4xl mx-auto mt-8 space-y-6'>
            <FoodForm onFoodAdded={()=>setRefresh(!refresh)}/>
            <Foodlist key={refresh} date={today}/>
        
        </div>
    )
}

export default Foodlog
