// import React from 'react'
// import { Pie } from 'react-chartjs-2'

// function MacroPieChart({totals}) {

//     const data={
//         labels: ['Protein','Carbs','Fats'],
//         datasets: [
//             {
//                 data: [totals.protein * 4, totals.carbs * 4, totals.fats * 9],
//                 backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
//             }
//         ]
//     }
//     return (
//         <div className="p-4 bg-white shadow rounded mt-6">
//             <h2 className="text-xl font-semibold mb-2">Macros Breakdown (Calories)</h2>
//             <Pie data={data} />
//         </div>
//     )
// }

// export default MacroPieChart

import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function MacroPieChart({ totals }) {
    const data = {
        labels: ['Protein', 'Carbs', 'Fats'],
        datasets: [
            {
                data: [totals.protein, totals.carbs, totals.fats],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    }

    return (
        <div className="p-4 shadow rounded mt-4">
            <h2 className="text-xl font-semibold mb-2">Macros Breakdown (Calories)</h2>
            <div className="w-80 h-80 mx-auto"> {/* smaller chart container */}
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}

export default MacroPieChart
