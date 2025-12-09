import React from 'react';

function MealCard({ meal }) {
    return (
        <div className="card bg-base-100/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all border border-base-content/5 hover:border-secondary/20">
            <div className="card-body p-4">
                <h4 className="text-md font-semibold text-primary capitalize">{meal.foodName}</h4>

                <p className="text-sm text-base-content/60">
                    Calories: <span className="font-medium text-base-content/80">{meal.calories} kcal</span>
                </p>

                <p className="text-sm text-base-content/60">
                    Protein: <span className="font-medium text-base-content/80">{meal.protein}g</span>
                </p>

                {meal.carbs && (
                <p className="text-sm text-base-content/60">
                    Carbs: <span className="font-medium text-base-content/80">{meal.carbs}g</span>
                </p>
                )}

                {meal.fats && (
                <p className="text-sm text-base-content/60">
                    Fats: <span className="font-medium text-base-content/80">{meal.fats}g</span>
                </p>
                )}
            </div>
        </div>
    );
}

export default MealCard;
