import React from 'react';

function WorkoutCard({ workout }) {
    return (
        <div className="card bg-base-100/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all border border-base-content/5 hover:border-primary/20">
            <div className="card-body p-4">
            <h3 className="card-title text-lg font-semibold text-primary capitalize">{workout.name}</h3>
            <p className="text-sm text-base-content/60">
                Duration: <span className="font-medium text-base-content/80">{workout.duration} mins</span>
            </p>
                {workout.type && (
                <p className="text-sm text-base-content/60">
                    Type: <span className="font-medium capitalize text-base-content/80">{workout.type}</span>
                </p>
            )}
                {workout.CaloriesBurned && (
                <p className="text-sm text-base-content/60">
                    Calories Burned: <span className="font-medium text-base-content/80">{workout.CaloriesBurned} kcal</span>
                </p>
                )}
        </div>
        </div>
    );
}

export default WorkoutCard;

