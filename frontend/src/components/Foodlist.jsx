import React, { useContext, useEffect, useState } from 'react'
import { authDataProvider } from '../Context/AuthContext'
import axios from 'axios'

function Foodlist({ date }) {
    const [foods, setFoods] = useState([])
    const [editId, setEditId] = useState(null)
    const [editForm, setEditForm] = useState({})

    const { baseUrl } = useContext(authDataProvider)

  // Reusable fetch
    // const fetchFoods = async () => {
    //     try {
    //         const response = await axios.get(`${baseUrl}/food/by-date?date=${date}`, {
    //             withCredentials: true
    //         })
    //         setFoods(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const fetchFoods = async () => {
        try {
            const response = await axios.get(`${baseUrl}/food/by-date?date=${date}`, {
                withCredentials: true,
            });

            const data = response.data;

            if (Array.isArray(data.foods)) {
                setFoods(data.foods);
            } else {
                console.warn("Unexpected food response format:", data);
                setFoods([]); // fallback to empty
            }
        } catch (error) {
            console.error("Fetch food error:", error);
            setFoods([]);
        }
    };

    useEffect(() => {
        fetchFoods()
    }, [date])

    const handleDelete = async (id) => {
        // console.log("Trying to delete:", id);
        try {
            const response=await axios.delete(`${baseUrl}/food/${id}`, {
                withCredentials: true
            })
            fetchFoods()
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (food) => {
        setEditId(food._id)
        setEditForm({ ...food }) // clone food data
    }

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleEditSubmit = async () => {
        try {
            await axios.put(`${baseUrl}/food/${editId}`, editForm, {
                withCredentials: true
            })
            setEditId(null)
            fetchFoods()
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Today's Food Log</h2>
        <div className="overflow-x-auto">
        <table className="table w-full">
            <thead>
            <tr>
                <th>Food</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fats</th>
                <th>Meal Type</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {foods.map((food) => (
                <tr key={food._id}>
                {editId === food._id ? (
                    <>
                    <td>
                        <input
                            name="foodName"
                            value={editForm.foodName}
                            onChange={handleEditChange}
                            className="input input-sm"
                        />
                    </td>
                    <td>
                        <input
                            name="calories"
                            value={editForm.calories}
                            onChange={handleEditChange}
                            className="input input-sm"
                        />
                    </td>
                    <td>
                        <input
                            name="protein"
                            value={editForm.protein}
                            onChange={handleEditChange}
                            className="input input-sm"
                        />
                    </td>
                    <td>
                        <input
                            name="carbs"
                            value={editForm.carbs}
                            onChange={handleEditChange}
                            className="input input-sm"
                        />
                    </td>
                    <td>
                        <input
                            name="fats"
                            value={editForm.fats}
                            onChange={handleEditChange}
                            className="input input-sm"
                        />
                    </td>
                    <td>
                        <select
                            name="mealType"
                            value={editForm.mealType}
                            onChange={handleEditChange}
                            className="select select-sm"
                        >
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="snacks">Snack</option>
                        </select>
                    </td>
                    <td>
                        <button className="btn btn-success btn-sm mr-2" onClick={handleEditSubmit}>
                            Save
                        </button>
                        <button className="btn btn-outline btn-sm" onClick={() => setEditId(null)}>
                            Cancel
                        </button>
                    </td>
                </>
                ) : (
                    <>
                        <td>{food.foodName}</td>
                        <td>{food.calories}</td>
                        <td>{food.protein}</td>
                        <td>{food.carbs}</td>
                        <td>{food.fats}</td>
                        <td>{food.mealType}</td>
                        <td>
                        <button
                            className="btn btn-sm btn-warning mr-2"
                            onClick={() => handleEdit(food)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-sm btn-error"
                            onClick={() => handleDelete(food._id)}
                        >
                            Delete
                        </button>
                    </td>
                    </>
                )}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    )
}

export default Foodlist
