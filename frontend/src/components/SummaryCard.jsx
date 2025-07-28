import React from 'react'

function SummaryCard({title,value}) {
    return (
        <div className='p-4 rounded shadow text-center'>
            <h3 className='text-sm text-gray-500'>{title}</h3>
            <p className='text-lg font-semibold'>{value}</p>
        </div>
    )
}

export default SummaryCard
