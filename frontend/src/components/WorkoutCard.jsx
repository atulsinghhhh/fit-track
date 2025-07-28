import React from 'react';

function WorkoutCard({ workout }) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all">
            <div className="card-body p-4">
            <h3 className="card-title text-lg font-semibold text-primary capitalize">{workout.name}</h3>
            <p className="text-sm text-gray-500">
                Duration: <span className="font-medium">{workout.duration} mins</span>
            </p>
                {workout.type && (
                <p className="text-sm text-gray-500">
                    Type: <span className="font-medium capitalize">{workout.type}</span>
                </p>
            )}
                {workout.CaloriesBurned && (
                <p className="text-sm text-gray-500">
                    Calories Burned: <span className="font-medium">{workout.CaloriesBurned}</span>
                </p>
                )}
        </div>
        </div>
    );
}

export default WorkoutCard;

