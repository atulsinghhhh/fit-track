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
                borderWidth: 0,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#a6adbb', // base-content color
                    font: {
                        family: 'Outfit'
                    }
                }
            },
        },
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-64 h-64"> 
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}

export default MacroPieChart
