import React from 'react';

function MealCard({ meal }) {
    return (
        <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all">
            <div className="card-body p-4">
                <h4 className="text-md font-semibold text-primary capitalize">{meal.foodName}</h4>

                <p className="text-sm text-gray-500">
                    Calories: <span className="font-medium">{meal.calories} kcal</span>
                </p>

                <p className="text-sm text-gray-500">
                    Protein: <span className="font-medium">{meal.protein}g</span>
                </p>

                {meal.carbs && (
                <p className="text-sm text-gray-500">
                    Carbs: <span className="font-medium">{meal.carbs}g</span>
                </p>
                )}

                {meal.fats && (
                <p className="text-sm text-gray-500">
                    Fats: <span className="font-medium">{meal.fats}g</span>
                </p>
                )}
            </div>
        </div>
    );
}

export default MealCard;
