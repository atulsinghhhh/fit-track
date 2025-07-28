    import React, { useContext, useState } from 'react'
    import { authDataProvider } from '../Context/AuthContext'
    import axios from 'axios'

    function FoodForm() {
    const [foodState, setFoodState] = useState({
        foodName: '',
        mealType: '',
        protein: '',
        carbs: '',
        fats: '',
        calories: ''
    })

    const { user, baseUrl } = useContext(authDataProvider)
    const userId = user._id

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
        ...foodState,
        protein: Number(foodState.protein),
        fats: Number(foodState.fats),
        carbs: Number(foodState.carbs),
        calories: Number(foodState.calories),
        userId
        }

        try {
        const response = await axios.post(`${baseUrl}/food/`, payload, {
            withCredentials: true
        })
        console.log(response.data);

        // Reset the form after successful submit
        setFoodState({
            foodName: '',
            mealType: '',
            protein: '',
            carbs: '',
            fats: '',
            calories: ''
        })
        } catch (error) {
        console.error('Error adding food:', error)
        }
    }

    return (
        <div className="p-4 rounded shadow-md max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Log Your Food</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
            type="text"
            placeholder="Your food name"
            className="input input-bordered w-full"
            onChange={(e) => setFoodState({ ...foodState, foodName: e.target.value })}
            value={foodState.foodName}
            />

            <select
            name="mealType"
            className="select select-bordered w-full"
            onChange={(e) => setFoodState({ ...foodState, mealType: e.target.value })}
            value={foodState.mealType}
            >
            <option value="">Select your meal</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snacks">Snack</option>
            </select>

            <input
            type="text"
            placeholder="Calories"
            onChange={(e) => setFoodState({ ...foodState, calories: e.target.value })}
            value={foodState.calories}
            className="input input-bordered w-full"
            />

            <input
            type="text"
            placeholder="Protein (g)"
            onChange={(e) => setFoodState({ ...foodState, protein: e.target.value })}
            value={foodState.protein}
            className="input input-bordered w-full"
            />

            <input
            type="text"
            placeholder="Fats (g)"
            onChange={(e) => setFoodState({ ...foodState, fats: e.target.value })}
            value={foodState.fats}
            className="input input-bordered w-full"
            />

            <input
            type="text"
            placeholder="Carbs (g)"
            onChange={(e) => setFoodState({ ...foodState, carbs: e.target.value })}
            value={foodState.carbs}
            className="input input-bordered w-full"
            />

            {/* <input
            type="text"
            placeholder="Quantity (optional)"
            onChange={(e) => setFoodState({ ...foodState, quantity: e.target.value })}
            value={foodState.quantity}
            className="input input-bordered w-full"
            /> */}

            <button type="submit" className="btn btn-primary col-span-2 md:col-span-4">
            Add Food
            </button>
        </form>
        </div>
    )
    }

    export default FoodForm
