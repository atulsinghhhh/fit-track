import { Food } from "../models/foodlog.model.js";
import { workout } from "../models/workout.model.js"


export const getDailySummary=async(req,res)=>{
    try {
        const {date}=req.query;
        const userId=req.user._id;

        const start= new Date(`${date}T00:00:00.000Z`);
        const end= new Date(`${date}T23:59:59.999Z`);

        const foods=await Food.find({
            userId,
            createdAt: {
                $gte: start,
                $lte: end
            }
        })

        const workouts=await workout.find({
            userId,
            createdAt: {
                $gte: start,
                $lte: end
            }
        })

        // console.log(foods);
        // console.log(workouts);

        const totalCalories=foods.reduce((sum,item)=>sum+item.calories, 0);
        const workoutCalories= workouts.reduce((sum,w)=> sum+=w.CaloriesBurned,0);

        // console.log("Total calories",totalCalories);
        // console.log("burned Calories",workoutCalories);

        res.status(200).json({
            message: "successfully fetch summary",
            totalCalories,
            workoutCalories,
            foodCount: foods.length,
            workoutCount: workouts.length
        })
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch the summary"
        })
    }
}