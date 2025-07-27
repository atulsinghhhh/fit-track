import { Food } from "../models/foodlog.model.js";
import { User } from "../models/user.model.js";

export const getDailyNutritionSummary=async(req,res)=>{
    try {
        const {date}=req.query;

        // get food log for the day
        const userId=req.user._id

        console.log("Date: ",date)

        const start=new Date(date + "T00:00:00.000Z");
        const end=new Date(date + "T23:59:59.999Z")

        const foods=await Food.find({userId,createdAt: {
            $gte: start,
            $lte: end
        }});

        // calculate total macros
        const totals=foods.reduce((acc,food)=>{
            acc.calories+=food.calories,
            acc.protein+=food.protein,
            acc.carbs+=food.carbs,
            acc.fats+=food.fats

            return acc;
        }, {calories: 0,protein: 0,carbs: 0,fats: 0});

        // get user daily goal

        const user=await User.findById(userId);
        const calorieTarget=parseInt(user.dailyCalorieTarget) || 2000

        const goal = {
            calories: calorieTarget,
            protein: Math.round((calorieTarget * 0.3) / 4), // 30% from protein (4 cal/g)
            carbs: Math.round((calorieTarget * 0.4) / 4),   // 40% from carbs (4 cal/g)
            fats: Math.round((calorieTarget * 0.3) / 9),    // 30% from fats (9 cal/g)
        };

        // Calculate difference from goal
        const diff = {
            calories: totals.calories - goal.calories,
            protein: totals.protein - goal.protein,
            carbs: totals.carbs - goal.carbs,
            fats: totals.fats - goal.fats,
        };

        res.status(200).json({
            foods,
            totals,
            goal,
            diff
        })

    } catch (error) {
        res.status(500).json({
            message: "failed to get daily summary"
        })
    }
}
