import React, { useContext, useEffect, useState } from 'react';
import { authDataProvider } from '../Context/AuthContext';
import axios from 'axios';

function Foods() {
    const { baseUrl } = useContext(authDataProvider);
    const [logs, setLogs] = useState([]);
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get(`${baseUrl}/food/`, {
                withCredentials: true
                });
                setLogs(response.data.foods);
            } catch (error) {
                console.log('Failed to fetch foods:', error);
            }
        };
        fetchFoods();
    }, [baseUrl]);

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this food log?');
        if (!confirm) return;

        try {
            await axios.delete(`${baseUrl}/food/${id}`, {
                withCredentials: true
            });
            setLogs((prev) => prev.filter((log) => log._id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${baseUrl}/food/${edit._id}`, edit, {
                withCredentials: true
            });
            setLogs((prev) => prev.map((log) => (log._id === edit._id ? edit : log)));
            setEdit(null);
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    return (
        <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Food Logs</h2>

        {logs.length === 0 ? (
            <p className="text-center">No food logs available.</p>
        ) : (
            <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Food Name</th>
                    <th>Meal Type</th>
                    <th>Calories</th>
                    <th>Protein (g)</th>
                    <th>Carbs (g)</th>
                    <th>Fats (g)</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {logs.map((log) => (
                    <tr key={log._id}>
                    <td>{log.foodName}</td>
                    <td className="capitalize">{log.mealType}</td>
                    <td>{log.calories}</td>
                    <td>{log.protein}</td>
                    <td>{log.carbs}</td>
                    <td>{log.fats}</td>
                    <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                    <td>
                        <button
                        onClick={() => setEdit(log)}
                        className="btn btn-sm btn-warning mr-2"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(log._id)}
                        className="btn btn-sm btn-error"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}

        {edit && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg">
                <h2 className="text-xl font-bold mb-4">Edit Food Log</h2>

                <input
                    className="input input-bordered w-full mb-3"
                    type="text"
                    value={edit.foodName}
                    onChange={(e) => setEdit({ ...edit, foodName: e.target.value })}
                    placeholder="Food Name"
                />

                <select
                    className="select select-bordered w-full mb-3"
                    value={edit.mealType}
                    onChange={(e) => setEdit({ ...edit, mealType: e.target.value })}
                >
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
                </select>

                <input
                    className="input input-bordered w-full mb-3"
                    type="number"
                    value={edit.calories}
                    onChange={(e) => setEdit({ ...edit, calories: e.target.value })}
                    placeholder="Calories"
                />

                <input
                    className="input input-bordered w-full mb-3"
                    type="number"
                    value={edit.protein}
                    onChange={(e) => setEdit({ ...edit, protein: e.target.value })}
                    placeholder="Protein (g)"
                />

                <input
                    className="input input-bordered w-full mb-3"
                    type="number"
                    value={edit.carbs}
                    onChange={(e) => setEdit({ ...edit, carbs: e.target.value })}
                    placeholder="Carbs (g)"
                />

                <input
                    className="input input-bordered w-full mb-3"
                    type="number"
                    value={edit.fats}
                    onChange={(e) => setEdit({ ...edit, fats: e.target.value })}
                    placeholder="Fats (g)"
                />

                <div className="flex justify-end gap-3">
                    <button onClick={() => setEdit(null)} className="btn">
                        Cancel
                    </button>
                    <button onClick={handleUpdate} className="btn btn-primary">
                        Save
                    </button>
                </div>
            </div>
        </div>
        )}
        </div>
    );
}

export default Foods;
