import React from 'react'

function SummaryCard({title,value}) {
    return (
        <div className='p-5 rounded-2xl bg-base-200/50 backdrop-blur-sm border border-base-content/5 hover:border-primary/20 transition-all duration-300'>
            <h3 className='text-xs font-medium uppercase tracking-wider text-base-content/60 mb-1'>{title}</h3>
            <p className='text-2xl font-bold text-primary'>{value}</p>
        </div>
    )
}

export default SummaryCard
